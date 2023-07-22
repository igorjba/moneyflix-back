const express = require('express')

const UserRoutes = express()

UserRoutes.get('/usuario')
UserRoutes.post('/usuario')
UserRoutes.put('/usuario')

module.exports = UserRoutes