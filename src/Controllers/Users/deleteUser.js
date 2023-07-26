const session = require("express-session");
const knex = require("../../Config/database");

const deleteUser = async (req, res) => {
  const token = req.session.userToken;
  if (token) {
    userId = req.session.user.id_usuario;
    const user = await knex("usuarios").where("id_usuario", userId).del();
    return res.status(200).json("deletado com sucesso");
  } else {
    return res.json("usuario sem sessao,redirecionar para pagina de login!");
  }
};
module.exports = deleteUser;
