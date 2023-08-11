const knex = require("../../Config/database");

const registerNewClient = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
    status,
  } = req.body;
  const userLogged = req.user;
  let newClientData = {};

  if (cpf.includes("." || "-")) {
    return res.status(400).json({ message: "CPF apenas numeros" });
  }
  if (cep) {
    if (cep.includes("-")) {
      return res.status(400).json({ message: "Cep apenas numeros" });
    }
  }
  if (telefone.includes("(" || ")" || "-" || " ")) {
    return res.status(400).json({ message: "telefone apenas numeros" });
  }
  id_usuario = userLogged.id_usuario;

  try {
    const checkemail = await knex("clientes").where({ email }).first();

    if (checkemail) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }
    const checkCpf = await knex("clientes").where({ cpf }).first();

    if (checkCpf) {
      return res.status(400).json({ message: "CPF já cadastrado!" });
    }

    newClientData = {
      id_usuario,
      nome_cliente: nome,
      email,
      cpf,
      telefone,
    };

    if (cep) {
      newClientData = { ...newClientData, cep };
    }
    if (logradouro) {
      newClientData = { ...newClientData, endereco: logradouro };
    }
    if (complemento) {
      newClientData = { ...newClientData, complemento };
    }
    if (bairro) {
      newClientData = { ...newClientData, bairro };
    }
    if (cidade) {
      newClientData = { ...newClientData, cidade };
    }
    if (estado) {
      newClientData = { ...newClientData, estado };
    }
    if (status) {
      newClientData = { ...newClientData, status };
    }

    const addClient = await knex("clientes")
      .insert(newClientData)
      .returning("*");

    if (addClient.length === 0) {
      return res
        .status(400)
        .json({ message: "Não foi possivel adicionar o cliente!" });
    }

    return res.status(201).json({ message: "Cliente adicionado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ message: "verifique os campos" });
  }
};

module.exports = registerNewClient;
