const knex = require('../../Config/database');

const updateClient = async (req, res) => {
    const { nome, email, telefone, cep, logradouro, complemento, bairro, cidade, estado, status } = req.body;
    const { id } = req.params;

    try {       
        if(nome){
            const updateNameClient = await knex('clientes').update({nome_cliente: nome}).where({id_cliente: id}).returning('*');
            if(updateNameClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o nome do cliente!"})
            }
        }
    
        if(email){
            const checkemail = await knex('clientes').where({email}).first();

            if (checkemail) {
                return res.status(400).json({ message: "E-email já cadastrado!" });
            }

            const updateEmailClient = await knex('clientes').update({email}).where({id_cliente: id}).returning('*');
            if(updateEmailClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o email do cliente!"})
            }
        }

        if(telefone){
            const updateTelefoneClient = await knex('clientes').update({telefone}).where({id_cliente: id}).returning('*');
            if(updateTelefoneClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o telefone do cliente!"})
            }
        }

        if(cep){
            const updateCepClient = await knex('clientes').update({cep}).where({id_cliente: id}).returning('*');
            if(updateCepClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o cep do cliente!"})
            }
        }
        if(logradouro){
            const updateLogradouroClient = await knex('clientes').update({endereco: logradouro}).where({id_cliente: id}).returning('*');
            if(updateLogradouroClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o endereço do cliente!"})
            }
        }
        if(complemento){
            const updateComplementoClient = await knex('clientes').update({complemento}).where({id_cliente: id}).returning('*');
            if(updateComplementoClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o complemento do cliente!"})
            }
        }
        if(bairro){
            const updateBairroClient = await knex('clientes').update({bairro}).where({id_cliente: id}).returning('*');
            if(updateBairroClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o bairro do cliente!"})
            }
        }
        if(cidade){
            const updateCidadeClient = await knex('clientes').update({cidade}).where({id_cliente: id}).returning('*');
            if(updateCidadeClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar a cidade do cliente!"})
            }
        }
        if(estado){
            const updateEstadoClient = await knex('clientes').update({estado}).where({id_cliente: id}).returning('*');
            if(updateEstadoClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o estado do cliente!"})
            }
        }

        if(status){
            const updateStatusClient = await knex('clientes').update({status}).where({id_cliente: id}).returning('*');
            if(updateStatusClient.length === 0){
                return res.status(400).json({message: "Não foi possivel atualizar o estatus do cliente!"})
            }
        }

        return res.status(201).json({message: "Cliente atualizado com sucesso!"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error.message});
    }
}

module.exports = updateClient;