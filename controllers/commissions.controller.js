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
