const express = require('express')

const { validadeBody } = require('../../Middleware/authorization');

const Schemes = require('../../Schemes/index')

const charges = require('../../Controllers/Charges/charges')
const listCharges = require('../../Controllers/Charges/listCharges')


const chargesRoutes = express()

chargesRoutes.post('/cobranca/cadastro/:id', charges.registerCharges)
chargesRoutes.put('/cobranca/editar/:id', charges.updateCharges)
chargesRoutes.get('/cobranca', charges.listCharges)
chargesRoutes.delete('/cobranca', charges.deleteCharges)

chargesRoutes.get('/cobranca/total', listCharges.filterStatusCharges)
chargesRoutes.get('/cobranca/vencidas', listCharges.summaryOverdue)
chargesRoutes.get('/cobranca/pendente', listCharges.summaryPending)
chargesRoutes.get('/cobranca/pagas', listCharges.summaryPaid)

module.exports = chargesRoutes