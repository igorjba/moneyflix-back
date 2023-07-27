const knex = require("../../Config/database");
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { nome, email, senha, confirmeSenha, cpf, telefone } = req.body;
  const userId = req.user;


  try {

    //Verificar campos obrigatórios em branco
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são campos obrigatórios.' });
    }

    //Verificar se o email já está cadastrado para outro usuário
    const verifyEmail = await knex('usuarios').where('email', email).whereNot('id_usuario', userId.id_usuario).first();
    if (verifyEmail) {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro usuário.' });
    }

    // Verificar se o CPF é diferente de CPF já cadastrado
    if (cpf) {
      const verifyCpf = await knex('usuarios').where('cpf', cpf).whereNot('id_usuario', userId.id_usuario).first();
      if (verifyCpf) {
        return res.status(409).json({ error: 'CPF já cadastrado para outro usuário.' });
      }
    }

    // Atualização dos dados do usuário
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

    return res.status(200).json({ message: "Dados atualizados com sucesso.", updatedUserData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Ocorreu um erro ao atualizar os dados do usuário." });
  }
};

module.exports = updateUser;

/*
  // Verificar campos obrigatórios
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são campos obrigatórios.' });
  }

  try {


    // Verificar se o e-mail informado já existe para outro usuário
    const userWithEmail = await knex('usuarios').where({ email }).first();
    if (userWithEmail && userWithEmail.id !== userId) {
      return res.status(409).json({ error: 'E-mail já cadastrado para outro usuário.' });
    }

    // Atualizar os dados do usuário
    const updatedUser = {
      nome,
      email,
      cpf,
      telefone,
    };

    // Se a senha foi fornecida, atualizar a senha
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

    await knex('usuarios').where({ id: userId }).update(updatedUser);

    return res.status(200).json({ message: 'Dados atualizados com sucesso!' });

  } catch (error) {

    return res.status(512).json({ message: 'Erro interno do servidor' })
  }
}*/
module.exports = { updateUser };