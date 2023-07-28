const knex = require("../../Config/database");

const listClients = async (req, res) => {
    try {
        const clients = await knex('clientes').select('*').orderBy('id_cliente', 'desc').returning('*');

        return res.status(200).json(clients)
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
}

module.exports = listClients;