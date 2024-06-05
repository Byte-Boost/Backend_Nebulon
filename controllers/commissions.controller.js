const { Commission, Client, Product, Seller } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // POST
  createCommission = (req, res) => {
    let { body } = req;
    // Assert CNPJ and CPF are in the correct format
    body.clientCNPJ = String(body.clientCNPJ).replace(/[\D]+/g, "");
    body.sellerCPF = String(body.sellerCPF).replace(/[\D]+/g, "");
    
    // Check for first purchase
    let firstPurchase = false;
    Client.findOne({ where: { cnpj: body.clientCNPJ } }).then((client) => {
      if (client.status == 0) {
        firstPurchase = true;
      }
    })
    .then(()=>{
        // Create commission object
        let commission = {
          date: body.date,
          value: body.value,
          commissionCut: body.commissionCut,
          paymentMethod: body.paymentMethod,
          clientsFirstPurchase: firstPurchase,
          clientCNPJ: body.clientCNPJ,
          productId: body.productId,
          sellerCPF: body.sellerCPF,
        }
    
        // Create commission
        Commission.create(commission).then(async ()=>{

            // Register client as not new
            await Client.update(
              { status: 1 },
              {
                where: {
                  cnpj: body.clientCNPJ
                }
              }
            )

            // Update seller score
            await Seller.update({
              score: Seller.sequelize.literal(`score + ${body.scorePoints ? body.scorePoints : 0}`),
            }, {
              where: {
                cpf: body.sellerCPF
              }
            })

        })
        .then((response)=>{
          res.status(201).send();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send();
        });
    })
  };

  // GET
  getCommissions = async (req, res) => {
    let { query, user } = req;
    let currentUser = await Seller.findOne({ where: { id: user.id } });

    // filter options
    let product = query.product_id;
    let client = query.client_cnpj;
    let seller = query.seller_cpf;
    let productStatus = query.product_status;
    let firstPurchase = query.firstPurchase;
    let after = query.after;
    let before = query.before;
    let sortMethod = query.sortBy || "DATE";
    let page = query.page ? parseInt(query.page) : 0;
    let limit = query.limit ? parseInt(query.limit) : null;

    // Auxiliary filter functions
    function getBetweenDate (after, before) {
      // returns the logic for a date between after and before
      let start = new Date(after);
      let end = new Date(before);
      end.setUTCHours(23,59,59,999);
      return { [Op.between]: [start, end] };
    }
    async function getProductsWithStatus(status) {
      // Auxiliary function to get all products with a certain status as an array of ids
      status = status == "new" ? 0 : status == "old" ? 1 : undefined;
      if (status == undefined) return undefined
      
      return await Product.findAll({ where: { status : status } })
        .then(async (products) => {
          let ids = products.map(product => product.id);
          return ids;
      })

    }
    async function mergeProductFIlters(){
      // Basically handles the problem of having to filter by product, product status or both.
      if (productStatus && product) {
        return {
          [Op.and]: { 
            [Op.eq]: product,
            [Op.in]: await getProductsWithStatus(productStatus)
          }
        }
      }
      if (productStatus) return {[Op.in]: await getProductsWithStatus(productStatus)}
      if (product) return {[Op.eq]: product}
      return {[Op.ne]: null}
    }
    function sortBy(sortMethod){
      switch (sortMethod.toUpperCase()) {
        case "PRODUCT":
          return [['productId', 'ASC']];
        case "CLIENT":
          return [['clientCNPJ', 'ASC']];
        case "SELLER":
          return [['sellerCPF', 'ASC']];
        case "VALUE":
          return [['value', 'ASC']];
        case "ID":
          return [['id', 'ASC']];
        case "PAYMENT":
          return [['paymentMethod', 'ASC']];
        default:
          return [['date', 'ASC']];
      }
    }

    // Query options
    let findOpt = {
      where: {
        // Selected Filter ? Proper logic : Default Filter
        sellerCPF: !user.admin ? currentUser.cpf : seller ? seller : {[Op.ne]: null},
        productId: await mergeProductFIlters(),
        clientCNPJ: client ? client : {[Op.ne]: null},
        clientsFirstPurchase: (firstPurchase && firstPurchase == "true") ? true : {[Op.ne]: null},
        date: getBetweenDate(after || 0, before || Date.now())
      },
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit
    };

    // Query & response
    Commission.findAll(findOpt)
      .then((commissions) => { 
        res.status(200).send(commissions);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getCommissionById = (req, res) => {
    let { params } = req;
    Commission.findByPk(params.id).then((commission) => {
            res.status(200).send(commission);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  };
  getCommissionStats = (req, res) => {
    Commission.findAll()
      .then(async (commissions) => { 
        let { query, user } = req;
        let product = query.product_id;
        let client = query.client_cnpj;
        let seller = query.seller_cpf;
         // @Vinicius do remember to change these to actually work
        let commValueSince = query.comm_value_after;
        let commValueBefore = query.comm_value_before;
        
        let saleValueSince = query.sale_value_after;
        let saleValueBefore = query.sale_value_before;
        let saleQtySince = query.sale_qty_after;
        let saleQtyBefore = query.sale_qty_before;

        let statistics = {}
        // Filter by user
        if(!user.admin){
          let seller = await Seller.findOne({ where: { id: user.id } });
          commissions = commissions.filter(commission => commission.sellerCPF == seller.cpf);
        }
        if (product) {
          commissions = commissions.filter(commission => commission.productId == product);
        }
        if (client) {
          commissions = commissions.filter(commission => commission.clientCNPJ == client);
        }
        if (seller) {
          commissions = commissions.filter(commission => commission.sellerCPF == seller);
        }

        // desired statistics
          // switch commission.value to commission.product.percentage check.
        if (commValueSince || commValueBefore) {
          let start = new Date(commValueSince || 0);
          let end = new Date(commValueBefore ? commValueBefore: Date.now());
          end.setUTCHours(23,59,59,999);
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          statistics.commValue = filtered.reduce((acc, commission) => acc + commission.commissionCut, 0);
        }
        if (saleValueSince || saleValueBefore) {
          let start = new Date(saleValueSince || 0);
          let end = new Date(saleValueBefore ? saleValueBefore : Date.now());
          end.setUTCHours(23,59,59,999);
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          console.log(filtered.length)
          statistics.saleValue = filtered.reduce((acc, commission) => acc + commission.value, 0);
        }
        if (saleQtySince || saleQtyBefore) {
          let start = new Date(saleQtySince || 0);
          let end = new Date(saleQtyBefore ? saleQtyBefore : Date.now());
          end.setUTCHours(23,59,59,999);
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          statistics.saleQty = filtered.length;
        }
        
        res.status(200).send(statistics);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  
  // PUT
  updateCommission = (req, res) => {
    let { params, body } = req;

    Commission.update({
      date: body.date,
      value: body.value,
      commissionCut: body.commissionCut,
      paymentMethod: body.paymentMethod,
      clientId: body.clientId,
      productId: body.productId,
      sellerId: body.sellerId}, {
        where: {
          id: params.id
        },
      }).catch((err) => {
        console.log(err);
        res.status(400).send();
      });
      
    res.status(200).send();
  };
  
  // DELETE
  deleteCommission = (req, res) => {
    let { params } = req;
    Commission.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
