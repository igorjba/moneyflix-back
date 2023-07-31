<<<<<<< HEAD
const knex = require('../../Config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passJWT = require('../../.env')
const session = require("express-session");

const loginUser = async (req, res) => {
    const { email, senha } = req.body

    try {
        const verifyEmail = await knex('usuarios').where('email', email).first()
        const user = verifyEmail

        if (!verifyEmail) return res.status(404).json({ messageError: "E-mail ou senha inválidos" })

        const verifyPassword = await bcrypt.compare(senha, user.senha)

        if (!verifyPassword) return res.status(404).json({ messageError: "E-mail ou senha inválidos" })

        const token = jwt.sign({ id: user.id_usuario }, passJWT, { expiresIn: '8h' })

        req.session.user = user;

        const { senha: _, ...user2 } = user;

        return res.json({
            token,
            user2
        })

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

module.exports = { loginUser }

=======
const knex = require("../../Config/database");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passJWT = process.env.passJWT;

const loginUser = async (req, res) => {

  const { email, senha } = req.body

  try {

    const user = await knex('usuarios').where({ email }).first()

    if (!user) {
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
>>>>>>> 46e5922b82e589e6d5f7925cc49824d6dcee6e08
