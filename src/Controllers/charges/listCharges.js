const knex = require('../../Config/database');

const filterStatusCharges = async (req, res) => {

    try {

        const chargesTotalPaid = await knex('cobrancas').where('status', 'Pago').sum('Valor')

        const chargesTotalPending = await knex('cobrancas').where('status', 'Pendente').sum('Valor')

        const chargesTotalOverdue = await knex('cobrancas').where('status', 'Vencida').sum('Valor')

        const summaryCharges = {
            paid: chargesTotalPaid[0].sum,
            pending: chargesTotalPending[0].sum,
            overdue: chargesTotalOverdue[0].sum
        }

        return res.status(200).json(summaryCharges)

    } catch (error) {
        return res.status(400).json({ message: 'Erro interno do servidor' })
    }
}

const summaryOverdue = async (req, res) => {

    try {

        const chargeOverdue = await knex('cobrancas')
            .leftJoin('clientes', 'cobrancas.id_cliente', 'cliente.id_cliente')
            .select('cobrancas.id_cobranca', 'cobrancas.valor', 'clientes.nome_cliente as cliente')
            .where('cobrancas.status', 'Vencida')
            .orderBy('id_cobranca')
            .limit('4')

        const amountOverdue = await knex('cobrancas')
            .where('status', 'Vencida')
            .count('id_cobranca')

        const totalOverdue = {
            chargeOverdue,
            total: amountOverdue[0].count
        }

        return res.status(200).json(totalOverdue)

    } catch (error) {

        return res.status(400).json({ message: 'Erro interno do servidor' })
    }
}

const summaryPending = async (req, res) => {

    try {

        const chargePending = await knex('cobrancas')
            .leftJoin('clientes', 'cobrancas.id_cliente', 'cliente.id_cliente')
            .select('cobrancas.id_cobranca', 'cobrancas.valor', 'clientes.nome_cliente as cliente')
            .where('cobrancas.status', 'Pendente')
            .orderBy('id_cobranca')
            .limit('4')

        const amountPending = await knex('cobrancas')
            .where('status', 'Pendente')
            .count('id_cobranca')

        const totalPending = {
            chargePending,
            total: amountPending[0].count
        }

        return res.status(200).json(totalPending)

    } catch (error) {

        return res.status(400).json({ message: 'Erro interno do servidor' })
    }
}

const summaryPaid = async (req, res) => {

    try {

        const chargePaid = await knex('cobrancas')
            .leftJoin('clientes', 'cobrancas.id_cliente', 'cliente.id_cliente')
            .select('cobrancas.id_cobranca', 'cobrancas.valor', 'clientes.nome_cliente as cliente')
            .where('cobrancas.status', 'Pago')
            .orderBy('id_cobranca')
            .limit('4')

        const amountPaid = await knex('cobrancas')
            .where('status', 'Pago')
            .count('id_cobranca')

        const totalPaid = {
            chargePaid,
            total: amountPaid[0].count
        }

        return res.status(200).json(totalPaid)

    } catch (error) {

        return res.status(400).json({ message: 'Erro interno do servidor' })
    }
}


module.exports = {
    filterStatusCharges,
    summaryOverdue,
    summaryPending,
    summaryPaid
}