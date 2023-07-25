const knex = require("../../Config/database");

const detailClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await knex('clientes').select('*').where({ id_cliente: id }).returning('*');

        if (client.length === 0) {
            return res.status(404).json({ message: "Cliente não encontrado!" })
        }

        return res.status(200).json(client[0])

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor!" })
    }
}

module.exports = detailClient;