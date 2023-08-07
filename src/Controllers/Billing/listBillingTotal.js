const knex = require("../../Config/database");
const listBillingTotal = async (req, res) => {
  const userId = req.user;

  const chargesTotalPaid = await knex("cobrancas")
    .leftJoin("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
    .select("cobrancas.*", "clientes.nome_cliente")
    .where("cobrancas.status", "Paga")
    .limit(4);

  const chargesTotalPending = await knex("cobrancas")
    .join("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
    .select("cobrancas.*", "clientes.nome_cliente")
    .where("cobrancas.status", "Pendente")
    .limit(4);

  const chargesTotalOverdue = await knex("cobrancas")
    .join("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
    .select("cobrancas.*", "clientes.nome_cliente")
    .where("cobrancas.status", "Vencida")
    .limit(4);

  const amountOverdue = await knex("cobrancas")
    .where("status", "Vencida")
    .count("id_cobranca");

  const amountPending = await knex("cobrancas")
    .where("status", "Pendente")
    .count("id_cobranca");

  const amountPaid = await knex("cobrancas")
    .where("status", "Paga")
    .count("id_cobranca");

  const totalValueOverdue = await knex("cobrancas")
    .where("status", "Vencida")
    .sum("valor");

  const totalValuePending = await knex("cobrancas")
    .where("status", "Pendente")
    .sum("valor");

  const totalValuePaid = await knex("cobrancas")
    .where("status", "Paga")
    .sum("valor");


  const clientInDay = await knex('clientes').select('clientes.id_cliente', 'clientes.nome_cliente as cliente', 'clientes.cpf')
    .where('clientes.status', 'Em dia')
    .orderBy('id_cliente', 'desc')
    .limit(4)

  const amountInday = await knex('clientes').where('status', 'Em dia').count('id_cliente')

  const summaryInDay = {
    clientInDay, total: amountInday[0].count
  }

  const clientDefaulters = await knex('clientes').select('clientes.id_cliente', 'clientes.nome_cliente as cliente', 'clientes.cpf')
    .where('clientes.status', 'Inadimplente')
    .orderBy('id_cliente', 'desc')
    .limit(4)

  const amountDefaulters = await knex('clientes').where('status', 'Inadimplente').count('id_cliente')

  const summaryDefaulters = {
    clientDefaulters, total: amountDefaulters[0].count
  }

  const summaryTotal = {
    nome_usuario: userId.nome_usuario,
    Pagas: chargesTotalPaid,
    Pendentes: chargesTotalPending,
    Vencidas: chargesTotalOverdue,
    qtdRegistroVencidas: amountOverdue,
    qtdRegistroPendentes: amountPending,
    qtdRegistroPagas: amountPaid,
    totalValorVencidas: totalValueOverdue,
    totalValorPendentes: totalValuePending,
    totalValorPagas: totalValuePaid,
    totalEmdias: summaryInDay,
    totalInadimplentes: summaryDefaulters
  };

  return res.status(200).json(summaryTotal);
};

const detailBilling = async (req, res) => {
  const { id } = req.params

  try {
    const charge = await knex('cobrancas').where('id_cobranca', id).first()

    if (!charge) return res.status(400).json({ message: 'Cobrança não existe' })

    const { nome_cliente } = await knex('clientes').where('id_cliente', charge.id_cliente).first()

    return res.status(200).json({ charge, nome_cliente })

  } catch (error) {
    return res.status(502).json(error.message)
  }
}

module.exports = { listBillingTotal, detailBilling }