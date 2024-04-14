const { Seller } = require("../models");
class requestHandler {
  // GET
  getSellers = (req, res) => {
    Seller.findAll({
      attributes: { exclude: ["password", "username"]}
    })
      .then((sellers) => {
        res.status(200).send(sellers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getSellerById = (req, res) => {
    let { params } = req;
    Seller.findByPk(params.id, {attributes: { exclude: ["password", "username"]}}).then((seller) => {
            res.status(200).send(seller);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  };
  getSellerByCPF = (req, res) => {  
    let { params } = req;
    Seller.findAll({ where: { cpf: params.cpf }, attributes: { exclude: ["password", "username"]} })
      .then((sellers) => {
        res.status(200).send(sellers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  }
}

module.exports = new requestHandler();
