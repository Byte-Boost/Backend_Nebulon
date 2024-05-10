const { Client } = require("../models");
class requestHandler {
  // POST
  createClient = (req, res) => {
    let { body } = req;
    Client.create({
      tradingName: body.tradingName,
      companyName: body.companyName,
      cnpj: body.cnpj,
      segment: body.segment,
      contact: body.contact,
      status: 0,
    }).catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(201).send();
  };
  // GET
  getClients = (req, res) => {
    Client.findAll()
      .then((clients) => {
        let { query } = req;
        let queryStatus = query.status 
        let segment = query.segment;
        if (queryStatus) {
          let status = queryStatus == "new" ? 0 : queryStatus == "old" ? 1 : undefined
          clients = clients.filter(client => client.status == status);
        }
        if (segment) {
          clients = clients.filter(client => client.segment == segment);
        }
        res.status(200).send(clients);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getClientById = (req, res) => {
    let { params } = req;
    Client.findAll({ where: { id : params.id} })
      .then((clients) => {
        res.status(200).send(clients);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  getClientByCNPJ = (req, res) => {  
    let { params } = req;
    Client.findByPk(params.cnpj).then((clients) => {
            res.status(200).send(clients);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send();
          });
  }
  // PUT
  updateClient = (req, res) => {
    let { params, body } = req;

    Client.update({
      tradingName: body.tradingName,
      companyName: body.companyName,
      cnpj: body.cnpj,
      segment: body.segment,
      contact: body.contact,
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
  deleteClient = (req, res) => {
    let { params } = req;
    Client.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
