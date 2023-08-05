const knex = require("../../Config/database");

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await knex("clientes")
      .select("*")
      .where({ id_cliente: id })
      .returning("*");

    const billing = await knex("cobrancas")
      .leftJoin("clientes", "clientes.id_cliente", "cobrancas.id_cliente")
      .where("cobrancas.id_cliente", id)
      .select(
        "clientes.nome_cliente",
        "cobrancas.id_cobranca",
        "cobrancas.valor",
        "cobrancas.vencimento",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .returning("*");

    if (client.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }

    const detailsClient = {
      client,
      billing,
    };

    return res.status(200).json(detailsClient);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = detailClient;