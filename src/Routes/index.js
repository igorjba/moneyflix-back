const express = require('express')

const UserRoutes = require('./UserRoutes')
const ClientRoutes = require('./ClientRoutes')
const ChargesRoutes = require('./ChargesRoutes')

const routes = express()

routes.use(UserRoutes)
routes.use(ClientRoutes)
routes.use(ChargesRoutes)

module.exports = routes;