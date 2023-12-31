const express = require("express");

const validadeBody = require("./Middleware/authorization");
const validadeQuery = require("./Middleware/validateEmail");

const verifyLogin = require("./Middleware/verifyLogin");

const validateCpf = require("./Middleware/validateCpf");

const email = require("./Controllers/Users/email");
const { loginUser } = require("./Controllers/Users/loginUser");
const profile = require("./Controllers/Users/profile");
const { registerUser } = require("./Controllers/Users/registerUser");
const { updateUser } = require("./Controllers/Users/updateUser");

const registerNewClient = require("./Controllers/Client/registerClient");
const detailClient = require("./Controllers/Client/detailsClient");
const listClient = require("./Controllers/Client/listClient");
const updateClient = require("./Controllers/Client/updateClient");
const { listBillingTotal, detailBilling } = require("./Controllers/Billing/listBillingTotal");

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
    summaryInDay,
    summaryDefaulters,
} = require("./Controllers/Billing/listBillingController");

const {
    SchemesRegister,
    SchemesLogin,
    SchemesCharges,
    SchemesClients,
    SchemesValidateEmail,
} = require("./Schemes/index");

const route = express();

route.get("/", (req, res) => {
    return res.status(200).send("ok");
});

route.get("/usuario/painel", verifyLogin, listBillingTotal);
route.get("/email/", validadeQuery(SchemesValidateEmail), email);
route.post("/usuario", validadeBody(SchemesRegister), registerUser);
route.post("/login", validadeBody(SchemesLogin), loginUser);

route.get("/usuario", verifyLogin, profile);
route.put("/usuario/atualizar", verifyLogin, validateCpf, updateUser);

route.post(
    "/cobranca/cadastro/:id",
    validadeBody(SchemesCharges),
    registerCharges
);
route.put("/cobranca/editar/:id", validadeBody(SchemesCharges), updateCharges);
route.get("/cobranca", verifyLogin, listCharges);
route.delete("/cobranca/delete/:id", verifyLogin, deleteCharges);


route.get("/cobranca/total", verifyLogin, filterStatusCharges);
route.get("/cobranca/vencidas", verifyLogin, summaryOverdue);
route.get("/cobranca/pendentes", verifyLogin, summaryPending);
route.get("/cobranca/pagas", verifyLogin, summaryPaid);
route.get("/cobranca/emdia", verifyLogin, summaryInDay);
route.get("/cobranca/inadimplentes", verifyLogin, summaryDefaulters);
route.get("/cobranca/:id", verifyLogin, detailBilling)

route.get("/cliente", verifyLogin, listClient);
route.get("/cliente/:id", detailClient);
route.post("/cliente", verifyLogin, validadeBody(SchemesClients), validateCpf, registerNewClient
);
route.put("/cliente/:id", validadeBody(SchemesClients), validateCpf, updateClient);

module.exports = route;