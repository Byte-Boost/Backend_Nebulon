const { User } = require("../models");
const service = require('../services/users.services.js')

class requestHandler {
  // POST
  registerUser = async (req, res) => {
    let { username, password } = req.body;
    var user = {
      username: username,
      password: await service.hashes(password),
    };
    User.create(user).catch((err) => {
      console.log(err);
      res.status(400).send();
    });

    res.status(201).send();
  };
  loginUser = async (req, res) => {
    let { body } = req;
    const user = User.findOne({ where: { username: body.username } })
    if (user){
        const validatePass = await service.compareHash(body.password, user.password)
        if (validatePass) {
            const token = service.getToken(user);
            res.status(200).json({ "token": token });
        } else {
            res.status(401).send({"error": "Incorrect password or user"});
        }
    } else {
        res.status(404).send({"error": "User does not exist"});
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
