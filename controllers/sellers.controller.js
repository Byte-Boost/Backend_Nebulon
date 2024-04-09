const { Seller } = require("../models");
class requestHandler {
  // POST
  createSeller = (req, res) => {
    let { body } = req;

    Seller.create({
      name: body.name,
      cpf: body.cpf,
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(201).send();
  };
  // GET
  getSellers = (req, res) => {
    Seller.findAll()
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
    Seller.findByPk(params.id).then((seller) => {
            res.status(200).send(seller);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  };
  // PUT
  updateSeller = (req, res) => {
    let { params, body } = req;

    Seller.update({
      name: body.name,
      cpf: body.cpf}, {
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
  deleteSeller = (req, res) => {
    let { params } = req;
    Seller.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
