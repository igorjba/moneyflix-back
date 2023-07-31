const knex = require("../../Config/database");

const email = async (req, res) => {
  const { email } = req.query;

  try {
    const result = await knex("usuarios").where({ email }).returning("*");

    if (result.length !== 0) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    return res.status(200).json("Email valido");
  } catch (error) {
    return res.status(509).json({ message: "Erro interno do servidor" });
  }
};

module.exports = email;
