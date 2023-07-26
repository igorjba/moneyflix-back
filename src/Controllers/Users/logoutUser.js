const session = require("express-session");

const logoutUser = (req, res) => {
  userId = req.session.user.id_usuario;
  req.session.destroy();
  return res.status(200).json("deslogado com sucesso");
};
module.exports = logoutUser;
