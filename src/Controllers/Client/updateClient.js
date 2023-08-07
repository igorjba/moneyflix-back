const knex = require("../../Config/database");

const updateClient = async (req, res) => {
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
  const { id } = req.params;
  let dataForUpdateClient = {};

  try {
    const checkemail = await knex("clientes").where({ email }).first();
    if (checkemail) {
      if (checkemail.id_cliente !== +id) {
        return res.status(400).json({ message: "E-email já cadastrado!" });
      }
    }

    const checkCpf = await knex("clientes").where({ cpf }).first();

    if (checkCpf) {
      if (checkCpf.id_cliente !== +id) {
        return res.status(400).json({ message: "CPF já cadastrado!" });
      }
    }

    dataForUpdateClient = {
      nome_cliente: nome,
      email,
      cpf,
      telefone,
    };

    if (!cep) {
      dataForUpdateClient.cep = null;
    }

    if (cep) {
      dataForUpdateClient = { ...dataForUpdateClient, cep };
    }
    if (!logradouro) {
      dataForUpdateClient.endereco = null;
    }
    if (logradouro) {
      dataForUpdateClient = { ...dataForUpdateClient, endereco: logradouro };
    }
    if (!complemento) {
      dataForUpdateClient.complemento = null;
    }
    if (complemento) {
      dataForUpdateClient = { ...dataForUpdateClient, complemento };
    }
    if (!bairro) {
      dataForUpdateClient.bairro = null;
    }
    if (bairro) {
      dataForUpdateClient = { ...dataForUpdateClient, bairro };
    }
    if (!cidade) {
      dataForUpdateClient.cidade = null;
    }
    if (cidade) {
      dataForUpdateClient = { ...dataForUpdateClient, cidade };
    }
    if (!estado) {
      dataForUpdateClient.estado = null;
    }
    if (estado) {
      dataForUpdateClient = { ...dataForUpdateClient, estado };
    }
    if (status) {
      dataForUpdateClient = { ...dataForUpdateClient, status };
    }

    await knex("clientes")
      .update(dataForUpdateClient)
      .where({ id_cliente: id });

    return res.status(201).json({ message: "Cliente atualizado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = updateClient;