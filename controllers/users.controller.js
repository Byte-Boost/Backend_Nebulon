const { User } = require("../models");
const service = require("../services/users.services.js");

class requestHandler {
  // POST
  registerUser = async (req, res) => {
    let { body } = req;

    var user = {
      username: body.username,
      password: await service.getHashed(body.password),
    };

    User.create(user)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
  loginUser = async (req, res) => {
    let { body } = req;

    const user = await User.findOne({ where: { username: body.username } });
    
    try {
      if (!user) throw new Error("User does not exist");
      const token = await service.login(user, body.password);
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(401).send({error:err.message});
    }

  };
  // DELETE
  deleteUser = (req, res) => {
    let { params } = req;

    User.destroy({ where: { id: params.id } })
      .then(res.status(200).send())
      .catch((err) => {
        console.log(err);
        res.status(400).send();
      });
  };
}

module.exports = new requestHandler();
