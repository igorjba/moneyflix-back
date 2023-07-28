const knex = require('../../Config/database');
const { parse } = require('date-fns');
const { SchemesCharges } = require('../../Schemes/index')

const currentDate = new Date().setHours(0, 0, 0, 0, 0)

const registerCharges = async (req, res) => {

    const { descricao, valor, vencimento, status } = req.body;
    const { id } = req.params;

    try {
        await SchemesCharges.validate(req.body);

        const clientExists = await knex('clientes').where("id_cliente", id).first()

        if (!clientExists) {
            return res.status(400).json({ message: 'Cliente não encontrado' })
        }

        const charges = await knex('cobrancas').insert({
            id_cliente: id, descricao, valor, vencimento, status
        }).returning('*');

        if (!charges) {
            return res.status(400).json({ message: 'Cobrança não foi cadastrada' });
        }

        if (charges[0].status === 'Pendente' && charges[0].vencimento < currentDate) {
            charges[0] = await knex('cobrancas')
                .where('id_cobranca', charges[0].id_cobranca)
                .update({ status: 'Vencida' })
                .returning('*')
        }

        return res.status(201).json({ message: 'Cobrança cadastrada com sucesso' })

    } catch (error) {
        return res.status(501).json({ message: 'Erro interno do servidor' })
    }
}

const updateCharges = async (req, res) => {

    let { descricao, valor, vencimento, status } = req.body;
    const { id } = req.params;

    try {
        await SchemesCharges.validate(req.body);

        const charges = await knex('cobrancas').where('id_cobranca', id).first();


        if (!charges) {
            return res.status(400).json({ message: 'Cobrança não cadastrada' })
        }

        const overdueParse = parse(vencimento, 'yyyy-MM-dd', new Date()).getTime()

        if (status === 'Pendente' && overdueParse < currentDate) {
            status = 'Vencida'

        } else if (status === 'Vencida' && overdueParse >= currentDate) {
            status = 'Pendente'
        }

        const editedData = await knex('cobrancas')
            .update({ descricao, valor, vencimento, status })
            .where('id_cobranca', id)

        if (!editedData) {
            return res.status(400).json({ message: 'Cobrança não foi alterada' })
        }
        return res.status(200).json({ message: 'Cobrança alterada com sucesso!' })

    } catch (error) {
        return res.status(502).json({ message: 'Erro interno do servidor' })
    }
}

const listCharges = async (req, res) => {
    const { status, data } = req.body;

    try {

        const charges = await knex('cobrancas')

        for (let charge of charges) {

            if (charge.status === 'Pendente' && ++charge.vencimento < currentDate) {
                charge.status = await knex('cobrancas')
                    .where('id_cobranca', charge.id_cobranca)
                    .update({ status: 'Vencida' })

            } else if (charge.status === 'Vencida' && ++charge.vencimento >= currentDate) {
                charge.status = await knex('cobrancas')
                    .where('id_cobranca', charge.id_cobranca)
                    .update({ status: 'Pendente' })
            }
        }

        const updateBilling = await knex('cobrancas')
            .leftJoin('clientes', 'cobrancas.id_cliente', 'clientes.id_cliente')
            .select('cobrancas.*', 'clientes.nome_cliente as cliente')
            .orderBy('id_cliente');

        if (status && data) {

            const listChargesFilter = await knex('cobrancas')
                .where('cobrancas.status', status)
                .andWhere('cobrancas.vencimento', data)
                .leftJoin('clientes', 'cobrancas.id_cliente', 'clientes.id_cliente')
                .select('cobrancas.*', 'clientes.nome_cliente as cliente')
                .orderBy('id_cliente');

            return res.status(200).json(listChargesFilter)

        } else if (status) {
            const listChargesFilter = await knex('cobrancas')
                .where('cobrancas.status', status)
                .leftJoin('clientes', 'cobrancas.id_cliente', 'clientes.id_cliente')
                .select('cobrancas.*', 'clientes.nome_cliente as cliente')
                .orderBy('id_cliente');

            return res.status(200).json(listChargesFilter)

        } else if (data) {
            const listChargesFilter = await knex('cobrancas')
                .where('cobrancas.vencimento', data)
                .leftJoin('clientes', 'cobrancas.id_cliente', 'clientes.id_cliente')
                .select('cobrancas.*', 'clientes.nome_cliente as cliente')
                .orderBy('id_cliente');

            return res.status(200).json(listChargesFilter)
        }

        return res.status(200).json(updateBilling)

    } catch (error) {
        return res.status(503).json({ message: 'Erro interno do servidor' })
    }
}

const deleteCharges = async (req, res) => {
    const { id } = req.params;

    try {

        let charge = await knex('cobrancas').where('id_cobranca', id).first()

        if (!charge) {
            return res.status(400).json({ message: 'Cobrança não existe' })
        }

        let { status, vencimento } = charge

        const currentDate = new Date().getTime()

        if (status === 'Vencida' && ++vencimento < currentDate) {
            return res.status(400).json({ message: 'Cobrança vencida não podera ser excluida' })
        }

        if (status === 'Paga') {
            return res.status(400).json({ message: 'Cobrança paga não pode ser excluída' })
        }

        const deleteCharge = await knex('cobrancas').where('id_cobranca', id).del()

        if (!deleteCharge) {
            return res.status(400).json({ message: 'Esta cobrança não pode ser excluida' })
        }

        return res.status(200).json({ message: 'Cobrança excluída com sucesso!' });


    } catch (error) {
        return res.status(504).json({ message: 'Erro interno do servidor' })
    }

}
/*
const takeCharges = async (req, res) => {
    const { id } = req.params

    try {

        let charge = await knex('cobrancas').where('id_cobranca', id).first()

if(!charge){
    return res.status(404).json({message: 'Cobrança inexistente'})
}

let {id_cliente}


} catch (error) {
        return res.status(516).json({ message: 'Erro interno do servidor' })
    }


}
*/
module.exports = {
    registerCharges,
    updateCharges,
    listCharges,
    deleteCharges
}