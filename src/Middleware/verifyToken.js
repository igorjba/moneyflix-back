const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;
const verifyToken = (req, res, next) => {
  const token = req.session.userToken;
  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const decodedToken = jwt.verify(token, passJWT);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
