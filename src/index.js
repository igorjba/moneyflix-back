require('dotenv').config()

const express = require('express')

const routes = require('./routes')
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(cors())

app.use(routes)

app.listen(PORT)