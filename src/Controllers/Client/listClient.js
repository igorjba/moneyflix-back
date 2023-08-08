const knex = require("../../Config/database");

const listClients = async (req, res) => {
    const { search, status } = req.query;

    try {
        if(search){
            const searchClient = await knex('clientes')
            .select('*')
            .whereILike('cpf', `%${search}%`)
            .orWhereILike('nome_cliente', `%${search}%`)
            .orWhereILike('email', `%${search}%`)
            .orderBy('id_cliente', 'desc')
            .returning('*');
            
            if(searchClient.length === 0){
                return res.status(404).json({message: "Nenhum cliente encontrado!"})
            }
            return res.status(200).json(searchClient);
        }

        if(status){
            const searchClientStatus = await knex('clientes')
            .select('*')
            .whereILike('status', `${status}%`)
            .orderBy('id_cliente', 'desc')
            .returning('*');
            
            if(searchClientStatus.length === 0){
                return res.status(404).json({message: "informe um estatos válido!"})
            }
            return res.status(200).json(searchClientStatus);
        }

        const clients = await knex('clientes').select('*').orderBy('id_cliente', 'desc').returning('*');

        return res.status(200).json(clients)
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
}

module.exports = listClients;