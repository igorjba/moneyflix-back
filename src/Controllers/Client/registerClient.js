const session = require("express-session");
const knex = require('../../Config/database');


const registerNewClient = async (req, res) => {
    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado, status } = req.body;
    const { id_usuario } = req.session.user;
    let newClientData = {};

    try {
        const checkemail = await knex('clientes').where({ email }).first();

        if (checkemail) {
            return res.status(400).json({ message: "E-email já cadastrado!" });
        }
        const checkCpf = await knex('clientes').where({ cpf }).first();

        if (checkCpf) {
            return res.status(400).json({ message: "CPF já cadastrado!" });
        }

        newClientData = {
            id_usuario,
            nome_cliente: nome,
            email,
            cpf,
            telefone
        }

        if (cep) {
            newClientData = {...newClientData, cep};
        }
        if (logradouro) {
            newClientData = {...newClientData, endereco: logradouro};
        }
        if (complemento) {
            newClientData = {...newClientData, complemento};
        }
        if (bairro) {
            newClientData = {...newClientData, bairro};
        }
        if (cidade) {
            newClientData = {...newClientData, cidade};
        }
        if (estado) {
            newClientData = {...newClientData, estado};
        }
        if (status) {
            newClientData = {...newClientData, status}
        }

        const addClient = await knex('clientes').insert(newClientData).first();

        if(!addClient){
            return res.status(400).json({message: "Não foi possivel adicionar o cliente!"})
        }

        return res.status(201).json({message: "Cliente adicionado com sucesso!"});

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}

module.exports = registerNewClient;