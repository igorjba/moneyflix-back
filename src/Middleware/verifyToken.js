const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, passJWT);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
