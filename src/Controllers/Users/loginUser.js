const knex = require("../../Config/database");
const session = require("express-session");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const verifyEmail = await knex("usuarios").where("email", email).first();
    const user = verifyEmail;

    if (!verifyEmail)
      return res
        .status(404)
        .json({ messageError: "E-mail ou senha inválidos" });

    const verifyPassword = await bcrypt.compare(senha, user.senha);

    if (!verifyPassword)
      return res
        .status(404)
        .json({ messageError: "E-mail ou senha inválidos" });

    const token = jwt.sign({ id: user.id }, passJWT, {
      expiresIn: "8h",
    });

    req.session.user = user;

    const { senha: _, ...user2 } = user;
    return res.json({
      token,
      user2,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { loginUser };
