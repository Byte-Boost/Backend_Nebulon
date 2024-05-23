const { Commission, Client, Product, Seller } = require("../models");
class requestHandler {
  // POST
  createCommission = (req, res) => {
    let { body } = req;

    // Assert CNPJ and CPF are in the correct format
    body.clientCNPJ = String(body.clientCNPJ).replace(/[\D]+/g, "");
    body.sellerCPF = String(body.sellerCPF).replace(/[\D]+/g, "");

    // Create commission object
    let commission = {
      date: body.date,
      value: body.value,
      paymentMethod: body.paymentMethod,
      clientCNPJ: body.clientCNPJ,
      productId: body.productId,
      sellerCPF: body.sellerCPF,
    }

    // Create commission
    Commission.create(commission).then(async ()=>{
      // Register client as not new
      await Client.update(
        { status: 1},
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
  };
  // GET
  getCommissions = (req, res) => {
    Commission.findAll()
      .then(async (commissions) => { 
        let { query, user } = req;
        let product = query.product_id;
        let client = query.client_cnpj;
        let seller = query.seller_cpf;
        let productStatus = query.product_status;
        let clientStatus = query.client_status;
        let after = query.after;
        let before = query.before;
        let dateSort = query.date_sort; 
        let priceSort = query.price_sort;

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
        if (clientStatus) {
          let status = clientStatus == "new" ? 0 : 1;
          await Client.findAll({ where: { status : status } })
            .then(async (clients) => {
              let cnpjs = clients.map(client => client.cnpj);
              commissions = commissions.filter(commission => cnpjs.includes(commission.clientCNPJ));
            })
        }
        if (after || before) {
          let start = new Date(after || 0);
          let end = new Date(before || Date.now());
          commissions = commissions.filter(commission => commission.date >= start && commission.date <= end);
        }
        if (dateSort) {
            if (dateSort == "desc") {
              commissions.sort((a, b) => b.date - a.date);
            }
            else {
              commissions.sort((a, b) => a.date - b.date); // Ascending
            }
        }
        if (priceSort) {
          if(priceSort == "desc") {
            commissions.sort((a, b) => b.value - a.value);
          }
          else {
            commissions.sort((a, b) => a.value - b.value); // Ascending
          }
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
          let end = new Date(commValueBefore || Date.now());
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          statistics.commValue = filtered.reduce((acc, commission) => acc + commission.value, 0);
        }
        if (saleValueSince || saleValueBefore) {
          let start = new Date(saleValueSince || 0);
          let end = new Date(saleValueBefore || Date.now());
          let filtered = commissions.filter(commission => commission.date >= start && commission.date <= end);
          console.log(filtered.length)
          statistics.saleValue = filtered.reduce((acc, commission) => acc + commission.value, 0);
        }
        if (saleQtySince || saleQtyBefore) {
          let start = new Date(saleQtySince || 0);
          let end = new Date(saleQtyBefore || Date.now());
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
