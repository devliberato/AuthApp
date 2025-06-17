const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY_AUTH_SECRET;

const createToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, secret)
    res.status(201).json({message: "Você está autenticado", token: token, id: user._id})

    return token;
}

module.exports = createToken;