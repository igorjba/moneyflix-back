const knex = require("../../Config/database");

const updateChargeStatus = async (chargeId, chargeStatus) => {
  await knex("cobrancas").where("id_cobranca", chargeId).update({
    status: chargeStatus,
  });
};
const updateCharges = async (charges, currentDate) => {
  for (let charge of charges) {
    if (charge.status === "Pendente" && charge.vencimento < currentDate) {
      await updateChargeStatus(charge.id_cobranca, "Vencida");
    } else if (
      charge.status === "Vencida" &&
      charge.vencimento >= currentDate
    ) {
      await updateChargeStatus(charge.id_cobranca, "Pendente");
    }
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await knex("clientes")
      .select("*")
      .where({ id_cliente: id })
      .returning("*");

    const currentDate = new Date().setHours(0, 0, 0, 0, 0);
    const charges = await knex("cobrancas").where("id_cliente", id);
    await updateCharges(charges, currentDate);

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
      );

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
