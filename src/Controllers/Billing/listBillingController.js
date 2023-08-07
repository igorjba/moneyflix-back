const knex = require("../../Config/database");

const filterStatusCharges = async (req, res) => {
  try {
    const chargesTotalPaid = await knex("cobrancas")
      .where("status", "Paga")
      .sum("valor");

    const chargesTotalPending = await knex("cobrancas")
      .where("status", "Pendente")
      .sum("valor");

    const chargesTotalOverdue = await knex("cobrancas")
      .where("status", "Vencida")
      .sum("valor");

    const summaryCharges = {
      Pagas: chargesTotalPaid[0].sum,
      Pendentes: chargesTotalPending[0].sum,
      Vencidas: chargesTotalOverdue[0].sum,
    };

    return res.status(200).json(summaryCharges);
  } catch (error) {
    return res.status(505).json({ message: "Erro interno do servidor" });
  }
};

const summaryOverdue = async (req, res) => {
  try {
    const chargeOverdue = await knex("cobrancas")
      .leftJoin("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
      .select(
        "cobrancas.id_cobranca",
        "cobrancas.valor",
        "clientes.nome_cliente as cliente"
      )
      .where("cobrancas.status", "Vencida")
      .orderBy("id_cobranca")
      .limit("4");

    const amountOverdue = await knex("cobrancas")
      .where("status", "Vencida")
      .count("id_cobranca");

    const totalOverdue = {
      chargeOverdue,
      total: amountOverdue[0].count,
    };

    return res.status(200).json(totalOverdue);
  } catch (error) {
    return res.status(506).json({ message: "Erro interno do servidor" });
  }
};

const summaryPending = async (req, res) => {
  try {
    const chargePending = await knex("cobrancas")
      .leftJoin("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
      .select(
        "cobrancas.id_cobranca",
        "cobrancas.valor",
        "clientes.nome_cliente as cliente"
      )
      .where("cobrancas.status", "Pendente")
      .orderBy("id_cobranca")
      .limit("4");

    const amountPending = await knex("cobrancas")
      .where("status", "Pendente")
      .count("id_cobranca");

    const totalPending = {
      chargePending,
      total: amountPending[0].count,
    };

    return res.status(200).json(totalPending);
  } catch (error) {
    return res.status(507).json({ message: "Erro interno do servidor" });
  }
};

const summaryPaid = async (req, res) => {
  try {
    const chargePaid = await knex("cobrancas")
      .leftJoin("clientes", "cobrancas.id_cliente", "clientes.id_cliente")
      .select(
        "cobrancas.id_cobranca",
        "cobrancas.valor",
        "clientes.nome_cliente as cliente"
      )
      .where("cobrancas.status", "Paga")
      .orderBy("id_cobranca")
      .limit("4");

    const amountPaid = await knex("cobrancas")
      .where("status", "Paga")
      .count("id_cobranca");

    const totalPaid = {
      chargePaid,
      total: amountPaid[0].count,
    };

    return res.status(200).json(totalPaid);
  } catch (error) {
    return res.status(508).json({ message: "Erro interno do servidor" });
  }
};

const summaryInDay = async (req, res) => {
  try {

    const clientInDay = await knex('clientes').select('clientes.id_cliente', 'clientes.nome_cliente as cliente', 'clientes.cpf')
      .where('clientes.status', 'Em dia')
      .orderBy('id_cliente', 'desc')
      .limit(4)

    const amountInday = await knex('clientes').where('status', 'Em dia').count('id_cliente')

    const returnInday = {
      clientInDay, total: amountInday[0].count
    }

    return res.status(200).json(returnInday)

  } catch (error) {
    return res.status(515).json({ message: "Erro interno do servidor" });
  }
}

const summaryDefaulters = async (req, res) => {
  try {

    const clientDefaulters = await knex('clientes').select('clientes.id_cliente', 'clientes.nome_cliente as cliente', 'clientes.cpf')
      .where('clientes.status', 'Inadimplente')
      .orderBy('id_cliente', 'desc')
      .limit(4)

    const amountDefaulters = await knex('clientes').where('status', 'Inadimplente').count('id_cliente')

    const returnDefaulters = {
      clientDefaulters, total: amountDefaulters[0].count
    }

    return res.status(200).json(returnDefaulters)

  } catch (error) {
    return res.status(515).json({ message: "Erro interno do servidor" });
  }
}

module.exports = {
  filterStatusCharges,
  summaryOverdue,
  summaryPending,
  summaryPaid,
  summaryInDay,
  summaryDefaulters
};