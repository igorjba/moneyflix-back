const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;
const verifyToken = (req, res, next) => {
  const { Authorization } = req.params;
  if (!Authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  token = Authorization.split(" ")[1];
  console.log(token);
  try {
    const decodedToken = jwt.verify(token, passJWT);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
