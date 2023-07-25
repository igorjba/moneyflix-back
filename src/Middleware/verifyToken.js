const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;
const session = require("express-session");
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "não autorizado" });
  }
  token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, passJWT);

    req.userId = decodedToken.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
