const { Commission, Client, Product, Seller } = require("../models");
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
      console.log(client)
      if (client.status == 0) {
        firstPurchase = true;
      }
    })
    .then(()=>{
      // maybe throw all of the below in here
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
  getCommissions = (req, res) => {
    let { query, user } = req;
    
    // Pagination - page and limit - defaults to page 1 and unlimited.
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    let findOpt = {};
    if (limit){
      let offset = (page - 1) * limit;
      findOpt = { offset: offset, limit: limit}
    }

    Commission.findAll(findOpt)
      .then(async (commissions) => { 

        let product = query.product_id;
        let client = query.client_cnpj;
        let seller = query.seller_cpf;
        let productStatus = query.product_status;
        let firstPurchase = query.firstPurchase;
        let after = query.after;
        let before = query.before;

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
        if (productStatus) {
          let status = productStatus == "new" ? 0 : 1;
          await Product.findAll({ where: { status : status } })
            .then(async (products) => {
              let ids = products.map(product => product.id);
              commissions = commissions.filter(commission => ids.includes(commission.productId));
            })
        }
        if (firstPurchase == "true") {
          commissions = commissions.filter(commission => commission.clientsFirstPurchase == true);
        }
        if (after || before) {
          let start = new Date(after || 0);
          let end = new Date(before || Date.now());
          commissions = commissions.filter(commission => commission.date >= start && commission.date <= end);
        }
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
          let end = new Date(commValueBefore ? commValueBefore+"T23:59:59.9999Z" : Date.now());
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          statistics.commValue = filtered.reduce((acc, commission) => acc + commission.commissionCut, 0);
        }
        if (saleValueSince || saleValueBefore) {
          let start = new Date(saleValueSince || 0);
          let end = new Date(saleValueBefore ? saleValueBefore+"T23:59:59.9999Z" : Date.now());
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          console.log(filtered.length)
          statistics.saleValue = filtered.reduce((acc, commission) => acc + commission.value, 0);
        }
        if (saleQtySince || saleQtyBefore) {
          let start = new Date(saleQtySince || 0);
          let end = new Date(saleQtyBefore ? saleQtyBefore+"T23:59:59.9999Z" : Date.now());
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
