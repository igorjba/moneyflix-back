const jwt = require("jsonwebtoken");
const knex = require("../Config/database");
const passJWT = process.env.passJWT;

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ message: "Não autorizado" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, passJWT);

    const userData = await knex("usuarios").where("id_usuario", id).first();

    if (userData.length === 0) {
      return res.status(400).json({ message: "Não autorizado" });
    }

    req.user = userData;

    next();
  } catch (error) {
    return res.status(401).json({ message: "token expirado" });
  }
};

module.exports = verifyLogin;
