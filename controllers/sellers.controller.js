const db = require("../models")
const { Seller } = require("../models");
const { Op } = require("sequelize");

class requestHandler {
  // GET
  getSellers = (req, res) => {
    let { query } = req;
    // Filter options
    let adminOnly = query.adminOnly;
    let startsWith = query.startsWith;
    let sortMethod = query.sortBy || "ID";
    let page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : null;
    
    function sortBy(sortMethod){
      switch (sortMethod.toUpperCase()) {
        case "SCORE":
          return [['score', 'DESC']];
        case "NAME":
          return [['name', 'ASC']];
        default:
          return [['id', 'ASC']];
      }
    }

    // Query options
    let findOpt = {
      where: {
        // Selected Filter ? Proper logic : Default Filter
        name: startsWith ? {[Op.regexp]: `^${startsWith}`} : {[Op.ne]: null},
        admin: (adminOnly && adminOnly.toUpperCase() == "TRUE")? true : {[Op.ne]: null},
      },
      attributes: { exclude: ["password", "username"] },
      order: sortBy(sortMethod),
      offset: (page - 1) * limit,
      limit: limit
    };

    // Query & response
    Seller.findAll(findOpt)
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
  getScoreBoard = (req, res) => {
    // This considers "1st, 2nd, 2nd, 3rd" places, instead of "1st, 2nd, 2nd, 4th".
    let { user } = req
    // gets the best three scores (and amount of sellers that have it)
    Seller.findAll({ attributes: ['score', [db.Sequelize.fn('COUNT', db.Sequelize.col('score')), 'sellersAmount']], order: [['score', 'DESC']], group: 'score', limit: 3 })
      .then(async (scores) => {
        // and yourself, as well as your score and rank
        let seller = await Seller.findOne({ where: { id: user.id }, attributes: ['name', 'score']});
        let rank = await Seller.count({ where: { score: { [Op.gt]: seller.score }}, group: 'score' });

        let return_score = {
          top_three: scores,
          self: {
            name: seller.name,
            score: seller.score,
            rank: rank.length+1, 
          },
        }
        res.status(200).send(return_score);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  }
}

module.exports = new requestHandler();
