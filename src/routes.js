const express = require("express");

const validadeBody = require("./Middleware/authorization");

const verifyLogin = require("./Middleware/verifyLogin");

const email = require('./Controllers/Users/email')
const { loginUser } = require('./Controllers/Users/loginUser')
const profile = require('./Controllers/Users/profile')
const { registerUser } = require('./Controllers/Users/registerUser')
const { updateUser } = require('./Controllers/Users/updateUser')

const registerNewClient = require("./Controllers/Client/registerClient");
const detailClient = require("./Controllers/Client/detailsClient");
const listClient = require("./Controllers/Client/listClient");
const updateClient = require("./Controllers/Client/updateClient");

const {
  registerCharges,
  updateCharges,
  listCharges,
  deleteCharges,
} = require("./Controllers/Billing/billingController");
const {
  filterStatusCharges,
  summaryOverdue,
  summaryPending,
  summaryPaid,
} = require("./Controllers/Billing/list");


const {
  SchemesRegister,
  SchemesLogin,
  SchemesCharges,
  SchemesNewClients,
  SchemesUpdateClient
} = require("./Schemes/index");

const route = express();

route.get("/", (req, res) => {
  return res.status(200).send("ok");
});

route.get('/usuario/:email', email)
route.post("/usuario", validadeBody(SchemesRegister), registerUser);
route.post("/login", validadeBody(SchemesLogin), loginUser);

route.get("/usuario", verifyLogin, profile);
route.put("/usuario/atualizar", verifyLogin, updateUser);

route.post(
  "/cobranca/cadastro/:id",
  validadeBody(SchemesCharges),
  registerCharges
);
route.put("/cobranca/editar/:id", validadeBody(SchemesCharges), updateCharges);
route.get("/cobranca", listCharges);
route.delete("/cobranca/delete/:id", deleteCharges);

route.get("/cobranca/total", filterStatusCharges);
route.get("/cobranca/vencidas", summaryOverdue);
route.get("/cobranca/pendentes", summaryPending);
route.get("/cobranca/pagas", summaryPaid);

route.get("/cliente", listClient);
route.get("/cliente/:id", detailClient);
route.post("/cliente", validadeBody(SchemesNewClients), registerNewClient);
route.post("/cliente/:id", validadeBody(SchemesUpdateClient), updateClient);

module.exports = route;