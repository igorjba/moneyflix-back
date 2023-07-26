const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "Não autorizado" });
  }
  try {
    const token = authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, passJWT);
    console.log(decodedToken); // log the decoded token

    next();
  } catch (error) {
    console.log(error); // log any errors that occur
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = { verifyToken };
