require("dotenv").config();
const session = require("express-session");
const express = require("express");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.use(routes);
app.listen(PORT);
