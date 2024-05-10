const { Product } = require("../models");
class requestHandler {
  // POST
  createProduct = (req, res) => {
    let { body } = req;

    Product.create({
      name: body.name,
      description: body.description,
      percentage: body.percentage,
      status: body.status || 0,
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(201).send();
  };
  // GET
  getProducts = (req, res) => {
    Product.findAll()
      .then((products) => {
        let { query } = req;
        let queryStatus = query.status 
        if (queryStatus) {
          let status = queryStatus == "new" ? 0 : queryStatus == "old" ? 1 : undefined
          products = products.filter(product => product.status == status);
        }
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
