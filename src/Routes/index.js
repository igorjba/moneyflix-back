
const express = require('express');
const UserRoutes = require('./UserRoutes/index');
const ClientRoutes = require('./ClientRoutes/index');
const ChargesRoutes = require('./ChargesRoutes/index');
const { validateBody } = require('../Middleware/authorization');

const routes = express.Router();



routes.use(UserRoutes, validateBody());
routes.use(ClientRoutes, validateBody());
routes.use(ChargesRoutes, validateBody());

module.exports = routes;