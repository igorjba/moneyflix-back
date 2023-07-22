const knex = require('../../Config/database')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const checkemail = await knex('usuarios').where('email', email).first()

        if (checkemail) {
            return res.status(400).json({ mensage: "E-email já cadastrado" })
        }

        const passwordCrypt = await bcrypt.hash(senha, 10);

        await knex('usuarios').insert({
            email,
            senha: passwordCrypt,
            nome_usuario: nome
        })

        return res.status(201).json({ mensage: 'Cadastro realizado com sucesso' })


    } catch (error) {
        return res.status(500).json({ mensage: 'Erro interno do servidor' })

    }
}

module.exports = { register }