const express = require("express");
const { verifyToken } = require("./Middleware/verifyToken");
const { updateUser, showUser } = require("./Controllers/Users/updateUser");
const deleteUser = require("./Controllers/Users/deleteUser");
const { registerUser } = require("./Controllers/Users/registerUser");
const { loginUser } = require("./Controllers/Users/loginUser");
const logoutUser = require("./Controllers/Users/logoutUser");
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

const validadeBody = require("./Middleware/authorization");
const {
  SchemesRegister,
  SchemesLogin,
  SchemesCharges,
  SchemesNewClients,
  SchemesUpdateClient,
} = require("./Schemes/index");

const route = express();

route.get("/", (req, res) => {
  return res.status(200).send("ok");
});

route.post("/usuario", validadeBody(SchemesRegister), registerUser);

route.post("/login", validadeBody(SchemesLogin), loginUser);

route.get("/usuario/listar", verifyToken, showUser);
route.put("/usuario/atualizar", verifyToken, updateUser);
route.post("/usuario/sair", verifyToken, logoutUser);
route.delete("/usuario/deletar", deleteUser);

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
