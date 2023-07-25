const session = require("express-session");
const knex = require("../../Config/database");

const updateUser = async (req, res) => {
  if (req.session.user) {
    const { nome, email, senha, repete_senha, cpf, telefone } = req.body;
    const userId = req.session.user.id_usuario;
    if (!nome || !email) {
      return res
        .status(400)
        .json({ message: "Os campos nome e email são obrigatórios!" });
    } else {
      const user_parser = await knex("usuarios")
        .where("id_usuario", userId)
        .first();

      user_parser.nome_usuario = nome;
      if (senha) {
        if (repete_senha !== senha) {
          return res.status(400).json({
            message: "Para alterar a senha, as duas senhas têm que ser iguais",
          });
        } else {
          const hashedPassword = await bcrypt.hash(senha, 10);
          user_parser.senha = hashedPassword;
        }
      }

      if (cpf) {
        if (user_parser.cpf != cpf) {
          const cpfExists = await knex("usuarios").where("cpf", cpf).first();
          if (cpfExists) {
            return res
              .status(400)
              .json({ message: "CPF já cadastrado para outro usuário!" });
          }
          if (cpf.length != 11) {
            return res.json("cpf incorreto");
          } else {
            user_parser.cpf = cpf;
          }
        }
      }

      if (user_parser.email !== email) {
        const emailExists = await knex("usuarios")
          .where("email", email)
          .first();
        if (emailExists) {
          return res
            .status(400)
            .json({ message: "Email já cadastrado para outro usuário!" });
        } else {
          user_parser.email = email;
        }
      }

      if (telefone) {
        user_parser.telefone = telefone;
      }

      await knex("usuarios").where("id_usuario", userId).update({
        email: user_parser.email,
        senha: user_parser.senha,
        nome_usuario: user_parser.nome_usuario,
        telefone: user_parser.telefone,
        cpf: user_parser.cpf,
      });
    }

    const user = await knex("usuarios").where("id_usuario", userId).first();
    req.session.user = user;
    return res.json(user);
  } else {
    return res.json("usuario sem sessao,redirecionar para pagina de login!");
  }
};
const showUser = async (req, res) => {
  if (req.session.user) {
    userId = req.session.user.id_usuario;
    const user = await knex("usuarios").where("id_usuario", userId).first();
    return res.json(user);
  } else {
    return res.json("usuario sem sessao,redirecionar para pagina de login!");
  }
};
module.exports = { updateUser, showUser };
