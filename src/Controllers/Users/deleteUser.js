const knex = require("../../Config/database");

const deleteUser = async (req, res) => {
  const user = await knex("usuarios").del();
};
module.exports = deleteUser;
