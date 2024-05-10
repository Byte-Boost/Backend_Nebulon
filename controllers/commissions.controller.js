const { where } = require("sequelize");
const { Commission, Client } = require("../models");
class requestHandler {
  // POST
  createCommission = (req, res) => {
    let { body } = req;

    Commission.create({
      date: body.date,
      value: body.value,
      paymentMethod: body.paymentMethod,
      clientCNPJ: body.clientCNPJ,
      productId: body.productId,
      sellerCPF: body.sellerCPF,
    }).then(async ()=>{
      await Client.update(
        { status: 1},
        {
          where: {
            id: body.clientId
          }
        }
      )
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(201).send();
  };
  // GET
  getCommissions = (req, res) => {
    Commission.findAll()
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
