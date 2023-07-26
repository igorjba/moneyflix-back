const session = require("express-session");
const knex = require("../../Config/database");

const deleteUser = async (req, res) => {
  try {
    const user = await knex("usuarios").where("id_usuario", userId).del();
    const userId = req.session.user.id_usuario;
    return res.status(200).json("deletado com sucesso");
  } catch (error) {
    return res.json("usuario sem sessao,redirecionar para pagina de login!");
  }
};
module.exports = deleteUser;
