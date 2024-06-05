const { Client } = require("../models");
const { Op } = require("sequelize");
class requestHandler {
  // POST
  createClient = (req, res) => {
    let { body } = req;
    
    // Assert CNPJ and contact are in the correct format
    body.cnpj = String(body.cnpj).replace(/[\D]+/g, '');
    body.contact = String(body.contact).replace(/[\D]+/g, '');
    
    // Create client object
    let client = {
      tradingName: body.tradingName,
      companyName: body.companyName,
      cnpj: body.cnpj,
      segment: body.segment,
      contact: body.contact,
      status: body.status && body.status != "0" ? 1 : 0,
    }

    // Create client
    Client.create(client).then((response)=>{
      res.status(201).send();
    }).catch((err) => {
      console.log(err)
      res.status(400).send();
    });
    
  };
  // GET
  getClients = (req, res) => {
    let { query } = req;
    // Filter options
    let queryStatus = query.status;
    let segment = query.segment;
    let startsWith = query.startsWith;
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;

    // Query options
    let findOpt = {
      where: {
        // Selected Filter ? Proper logic : Default Filter
        status: queryStatus == "new" ? 0 : queryStatus == "old" ? 1 : {[Op.ne]: null},
        segment: segment ? {[Op.regexp]: `^${segment}`} : {[Op.ne]: null},
        tradingName: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
      },
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit: limit
    };
    
    // Query & response
    Client.findAll(findOpt)
      .then((clients) => {
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
