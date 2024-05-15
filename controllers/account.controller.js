const { Seller } = require("../models/index.js");
const service = require("../services/account.services.js");

class requestHandler {
  // POST
  registerSeller = async (req, res) => {
    let { body } = req;
    var seller = {
      name: body.name,
      cpf: body.cpf,
      username: body.username,
      password: await service.getHashed(body.password),
      admin: false,
    };

    Seller.create(seller)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };

  loginSeller = async (req, res) => {
    let { body } = req;

    const user = await Seller.findOne({ where: { username: body.username } });
    
    try {
      if (!user) throw new Error("User does not exist");
      const token = await service.login(user, body.password);
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(401).send({error:err.message});
    }

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
