const express = require('express')

const ClientRoutes = express()

ClientRoutes.get('/usuario')
ClientRoutes.post('/usuario')
ClientRoutes.put('/usuario')

module.exports = ClientRoutes