const knex = require("../../Config/database");

const email = async (req, res) => {
  const { email } = req.params

  try {
    const result = await knex('usuarios').where({ email }).returning('*')

    if (!result) {
      return res.status(409).json({ message: 'Email já cadastrado' })
    }

    return res.send(result)
  } catch (error) {
    return res.status(509).json({ message: 'Erro interno do servidor' })
  }
}

module.exports = email  