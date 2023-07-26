
const knex = require('../../Config/database')
const profile = async (req, res) => {
  const user = req.user
  const userId = user.id_usuario


  try {

    const user = await knex("usuarios").where("id_usuario", userId).first();
    return res.status(200).json(user);
  } catch (error) {

    return res.status(510).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = profile  