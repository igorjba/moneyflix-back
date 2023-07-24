
const express = require('express');

const { registerUser } = require('./Controllers/Users/registerUser')
const { loginUser } = require('./Controllers/Users/loginUser')
const { UpdateUser } = require('./Controllers/Users/updateUser')

const { registerClient } = require('./Controllers/Client/registerClient')
const { detailClient } = require('./Controllers/Client/detailsClient')
const { listClient } = require('./Controllers/Client/listClient')
const { updateClient } = require('./Controllers/Client/updateClient')

const { registerCharges, updateCharges, listCharges, deleteCharges } = require('./Controllers/Charges/charges')
const { filterStatusCharges, summaryOverdue, summaryPending, summaryPaid } = require('./Controllers/Charges/listCharges')


const validadeBody = require('./Middleware/authorization')
const { SchemesRegister, SchemesLogin, SchemesUpdate, SchemesCharges } = require('./Schemes/index')


const route = express()

route.post('/usuario', validadeBody(SchemesRegister), registerUser)
// route.post('/login', validadeBody(SchemesLogin), loginUser)
// route.put('/usuario',validadeBody(SchemesUpdate), UpdateUser)

route.post('/cobranca/cadastro/:id', validadeBody(SchemesCharges), registerCharges)
route.put('/cobranca/editar/:id', validadeBody(SchemesCharges), updateCharges)
route.get('/cobranca', validadeBody(SchemesCharges), listCharges)
route.delete('/cobranca/delete/:id', validadeBody(SchemesCharges), deleteCharges)

route.get('/cobranca/total', filterStatusCharges)
route.get('/cobranca/vencidas', summaryOverdue)
route.get('/cobranca/pendentes', summaryPending)
route.get('/cobranca/pagas', summaryPaid)

module.exports = route

//teta routes