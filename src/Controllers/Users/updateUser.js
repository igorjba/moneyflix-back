const knex = require("../../Config/database");
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { nome, email, senha, confirmeSenha, cpf, telefone } = req.body;
  const userId = req.user;


  try {


    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são campos obrigatórios.' });
    }

    const verifyEmail = await knex('usuarios').where('email', email).whereNot('id_usuario', userId.id_usuario).first();
    if (verifyEmail) {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro usuário.' });
    }


    if (cpf) {
      const verifyCpf = await knex('usuarios').where('cpf', cpf).whereNot('id_usuario', userId.id_usuario).first();
      if (verifyCpf) {
        return res.status(409).json({ error: 'CPF já cadastrado para outro usuário.' });
      }
    }

    const updatedUserData = { nome_usuario: nome, email };
    if (senha && confirmeSenha) {
      if (senha !== confirmeSenha) {
        return res.status(400).json({ error: "As senha não correspondem." });
      }
      const hashPassword = await bcrypt.hash(senha, 10);
      updatedUserData.senha = hashPassword;
    }
    if (cpf) updatedUserData.cpf = cpf;
    if (telefone) updatedUserData.telefone = telefone;

    await knex("usuarios").where("id_usuario", userId.id_usuario).update(updatedUserData);

    return res.status(200).json({ message: "Dados atualizados com sucesso." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Ocorreu um erro ao atualizar os dados do usuário." });
  }
};

module.exports = { updateUser };