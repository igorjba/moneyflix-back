const knex = require('../../Config/database')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const checkemail = await knex('usuarios').where('email', email).first()

        if (checkemail) {
            return res.status(400).json({ message: "E-email já cadastrado" })
        }

<<<<<<< HEAD
=======
        if (senha.length < 6) {
            return res.status(400).json({ message: "A senha deve ter no minimo 6 digitos" })
        }
>>>>>>> 46e5922b82e589e6d5f7925cc49824d6dcee6e08
        const passwordCrypt = await bcrypt.hash(senha, 10);

        await knex('usuarios').insert({
            email,
            senha: passwordCrypt,
            nome_usuario: nome
        })

        return res.status(201).json({ message: 'Cadastro realizado com sucesso' })


    } catch (error) {
<<<<<<< HEAD
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

module.exports = { registerUser }
=======
        return res.status(511).json({ message: 'Erro interno do servidor' })

    }
}
module.exports = { registerUser } 
>>>>>>> 46e5922b82e589e6d5f7925cc49824d6dcee6e08
