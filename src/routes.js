const express = require('express');

const { updateUser } = require("./Controllers/Users/updateUser");
const { registerUser } = require('./Controllers/Users/registerUser')
const { loginUser } = require('./Controllers/Users/loginUser')

const registerNewClient = require('./Controllers/Client/registerClient')
const detailClient = require('./Controllers/Client/detailsClient')
const listClient = require('./Controllers/Client/listClient')
const updateClient = require('./Controllers/Client/updateClient')

const { registerCharges, updateCharges, listCharges, deleteCharges } = require('./Controllers/Billing/billingController')
const { filterStatusCharges, summaryOverdue, summaryPending, summaryPaid } = require('./Controllers/Billing/list')


const validadeBody = require('./Middleware/authorization')
const { SchemesRegister, SchemesLogin, SchemesUpdate, SchemesCharges, SchemesNewClients, SchemesUpdateClient } = require('./Schemes/index')

const route = express()

route.get('/', (req, res) => {
    return res.status(200).send('ok')
})

route.post('/usuario', validadeBody(SchemesRegister), registerUser)
// route.post('/login', validadeBody(SchemesLogin), loginUser)
// route.put('/usuario',validadeBody(SchemesUpdate), UpdateUser)


route.post('/cobranca/cadastro/:id', validadeBody(SchemesCharges), registerCharges)
route.put('/cobranca/editar/:id', validadeBody(SchemesCharges), updateCharges)
route.get('/cobranca', listCharges)
route.delete('/cobranca/delete/:id', deleteCharges)

route.get('/cobranca/total', filterStatusCharges)
route.get('/cobranca/vencidas', summaryOverdue)
route.get('/cobranca/pendentes', summaryPending)
route.get('/cobranca/pagas', summaryPaid)

route.get('/client', listClient)
route.get('/client/:id', detailClient)
route.post('/client', validadeBody(SchemesNewClients), registerNewClient)
route.post('/client/:id', validadeBody(SchemesUpdateClient), updateClient)



module.exports = route
