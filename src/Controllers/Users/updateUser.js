const knex = require("../../Config/database");
const bcrypt = require('bcrypt')

const updateUser = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const userId = req.user;

  try {

    if (email) {
      if (userId.email !== email) {
        const emailExists = await knex("usuarios").where("email", email).first();

        if (emailExists && email !== userId.email) {
          return res
            .status(400)
            .json({ message: "Email já cadastrado!" });
        } else if (emailExists && email === userId.email) {
          return res.status(201).json({ message: 'E-mail do Usuario' })
        } else {
          userId.email = email;
        }
      }
    }

    if (cpf) {
      if (userId.cpf !== cpf) {
        const cpfExists = await knex("usuarios").where("cpf", cpf).first();

        if (cpfExists && cpf !== userId.cpf) {
          return res
            .status(400)
            .json({ message: "CPF já cadastrado para outro usuário!" });
        } else if (cpfExists && cpf === userId.cpf) {
          return res.status(201).json({ message: 'E-mail do Usuario' })
        }
        if (String(cpf).length != 11) {
          return res.status(400).json("CPF incorreto");
        } else {
          userId.cpf = cpf;
        }
      }
    }

    if (telefone) {
      userId.telefone = telefone;
    }

    if (toString(telefone).length < 7) {
      return res.status(400).json({ message: 'Telefone inválido' })
    }

    if (senha) {
      const user = await knex('usuarios').where('id_usuario', userId.id_usuario).first()

      const verifyPassword = await bcrypt.compare(senha, user.senha)

      if (verifyPassword) {
        await knex('usuarios').update({ nome_usuario: nome, email, cpf, telefone }).where('id_usuario', userId.id_usuario)
        return res.status(201).json({ message: 'Usuário atualizado com sucesso' })
      }

      const PasswordCrypt = await bcrypt.hash(senha, 10)
      await knex('usuarios').update({ nome_usuario: nome, senha: PasswordCrypt, telefone }).where('id_usuario', userId.id_usuario)
    }

    return res.status(201).json({ message: 'Usuário atualizado com sucesso' })

  } catch (error) {

    return res.status(512).json({ message: 'Erro interno do servidor' })
  }
}
module.exports = { updateUser };