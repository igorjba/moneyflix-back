
const express = require('express');
const UserRoutes = require('./UserRoutes/index');
const ClientRoutes = require('./ClientRoutes/index');
const ChargesRoutes = require('./ChargesRoutes/index');
const { validateBody } = require('../Middleware/authorization');
const { SchemesRegister, SchemesCharges } = require('../Schemes/index');

const routes = express.Router();



routes.use(UserRoutes, validateBody(SchemesRegister));
routes.use(ClientRoutes, validateBody(SchemesRegister));
routes.use(ChargesRoutes, validateBody(SchemesCharges));

module.exports = routes;