const knex = require('../../Config/database');

const registerNewClient = async (req, res) => {
    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado, status } = req.body;
    //const {id_usuario} = re.user;

    try {
        const checkemail = await knex('clientes').where({ email }).first();

        if (checkemail) {
            return res.status(400).json({ message: "E-email já cadastrado!" });
        }
        const checkCpf = await knex('clientes').where({ cpf }).first();

        if (checkCpf) {
            return res.status(400).json({ message: "CPF já cadastrado!" });
        }

        const newClient = await knex('clientes').insert({
            id_usuario,
            nome_cliente: nome,
            email,
            cpf,
            telefone
        }).returning('*');

        if (newClient.length === 0) {
            return res.status(400).json({ message: "Não foi possivel criar o cliente!" })
        }

        if (cep) {
            const addCepToNewClient = await knex('clientes').update({ cep }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addCepToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar o cep ao cliente!" })
            }
        }
        if (logradouro) {
            const addLogradouroToNewClient = await knex('clientes').update({ endereco: logradouro }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addLogradouroToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar o logradouro ao cliente!" })
            }
        }
        if (complemento) {
            const addComplementoToNewClient = await knex('clientes').update({ complemento }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addComplementoToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar o complemento ao cliente!" })
            }
        }
        if (bairro) {
            const addBairroToNewClient = await knex('clientes').update({ bairro }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addBairroToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar o bairro ao cliente!" })
            }
        }
        if (cidade) {
            const addCidadeToNewClient = await knex('clientes').update({ cidade }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addCidadeToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar a cidade ao cliente!" })
            }
        }
        if (estado) {
            const addEstadoToNewClient = await knex('clientes').update({ estado }).where({ id_cliente: newClient[0].id_cliente }).returning('*');
            if (addEstadoToNewClient.length === 0) {
                return res.status(400).json({ message: "Não foi possivel adicionar o estado ao cliente!" })
            }
        }
        if (status) {
            if (status === 'Em dia' || status === 'Inadimplentes') {
                const addStatusToNewClient = await knex('clientes').update({ status }).where({ id_cliente: id }).returning('*');
                if (addStatusToNewClient.length === 0) {
                    return res.status(400).json({ message: "Não foi possivel adicionar o estatus do cliente!" })
                }
            }
            return res.status(400).json({ message: "Informe um estatus Válido!" })
        }

        return res.status(201).json({ message: "Cliente adicionado com sucesso!" })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}

module.exports = registerNewClient;