const knex = require("../../Config/database");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passJWT = process.env.passJWT;

const loginUser = async (req, res) => {

  const { email, senha } = req.body

  try {

    const user = await knex('usuarios').where({ email }).first()

    if (user.length === 0) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
    }

    const { senha: senhaDoUsuario, ...usuarioLogado } = user;

    const passwordInvalid = await bcrypt.compare(senha, senhaDoUsuario);

    if (!passwordInvalid) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos.' })
    }

    const token = jwt.sign({ id: usuarioLogado.id_usuario }, passJWT, { expiresIn: '8h' });


    return res.json({ user: usuarioLogado, token });

  } catch (error) {

    return res.status(510).json({ message: 'Erro interno do servidor' })
  }
}

module.exports = { loginUser };