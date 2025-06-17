const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY_AUTH_SECRET;
const User = require("../models/User")

const getTokenUser  = async (token) => {

  if(!token) {
    res.status(422).json({message: "Acesso negado!"})
  }


    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    const user = await User.findOne({_id: userId});

    return user;
}

module.exports = getTokenUser;