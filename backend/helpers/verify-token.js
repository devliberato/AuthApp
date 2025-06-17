const jwt = require("jsonwebtoken");
require("dotenv").config();
const getToken = require("./get-token")
const secret = process.env.KEY_AUTH_SECRET;

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(422).json({message: "Acesso negado!"})
    } 

    const token = getToken(req);

    if(!token) {
          res.status(422).json({message: "Acesso negado!"})
    }

    try {
        const verified = jwt.verify(token, secret)
        req.user = verified;
        next();
        
    } catch (error) {
        res.status(400).json({message: error})
        
    }
}

module.exports = verifyToken;