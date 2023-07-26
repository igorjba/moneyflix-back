const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "Não autorizado" });
  }
  try {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, passJWT);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
