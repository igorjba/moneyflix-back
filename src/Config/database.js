const knex = require("knex")({
    cliente: "pg",
    connection: {
        host: process.env.DB_Host,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    }

})
module.exports = knex