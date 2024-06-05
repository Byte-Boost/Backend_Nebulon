const { Product } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // POST
  createProduct = (req, res) => {
    let { body } = req;
    let product = {
      name: body.name,
      description: body.description,
      status: body.status && body.status != "0" ? 1 : 0,
    }
    
    Product.create(product).then((response)=>{
      res.status(201).send();
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });
  };
  // GET
  getProducts = (req, res) => {
    let { query } = req;
    let queryStatus = query.status;
    let startsWith = query.startsWith;
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;

    let findOpt = {
      where: {
        status: queryStatus == "new" ? 0 : queryStatus == "old" ? 1 : {[Op.ne]: null},
        name: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
      },
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit: limit
    };

    Product.findAll(findOpt)
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getProductById = (req, res) => {
    let { params } = req;
    Product.findByPk(params.id).then((product) => {
            res.status(200).send(product);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  };
  // PUT
  updateProduct = (req, res) => {
    let { params, body } = req;

    Product.update({
      name: body.name,
      description: body.description,
      percentage: body.percentage,
      status: body.status,}, {
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
  deleteProduct = (req, res) => {
    let { params } = req;
    Product.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
