const { Seller } = require("../models");
class requestHandler {
  // GET
  getSellers = (req, res) => {
    let { query } = req;
    Seller.findAll({
      attributes: { exclude: ["password", "username"]}
    })
      .then((sellers) => {
        let adminOnly = query.adminOnly;
        let startsWith = query.startsWith;
        if (adminOnly && adminOnly.toUpperCase() == "TRUE") {
          sellers = sellers.filter(seller => seller.admin == true);
        }
        if (startsWith) {
          sellers = sellers.filter(seller => seller.name.toUpperCase().startsWith(startsWith.toUpperCase()));
        }
        res.status(200).send(sellers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getSellerById = (req, res) => {
    let { params } = req;
    Seller.findAll({ where: { id: params.id }, attributes: { exclude: ["password", "username"]} })
      .then((sellers) => {
        res.status(200).send(sellers);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getSellerByCPF = (req, res) => {  
    let { params } = req;
    Seller.findByPk(params.cpf, {attributes: { exclude: ["password", "username"]}}).then((seller) => {
            res.status(200).send(seller);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  }
}

module.exports = new requestHandler();
