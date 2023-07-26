const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(500).json({ message: "Token não encontrado" });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, passJWT);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Não autorizado" });
  }
};

module.exports = { verifyToken };