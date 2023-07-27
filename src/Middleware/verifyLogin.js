const jwt = require("jsonwebtoken");
const knex = require("../Config/database");
const passJWT = process.env.passJWT;

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Não autorizado' });
  }

  try {

    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, passJWT);

    const userDate = await knex('usuarios').where('id_usuario', id).first()

    if (userDate.length === 0) {
      return res.status(409).json({ message: 'Não autorizado' });
    }

    const { senha, ...user } = userDate;

    req.user = user;

    next();

  } catch (error) {

    return res.status(514).json({ message: 'Não autorizado' });
  }
}

module.exports = verifyLogin;