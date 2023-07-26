const jwt = require("jsonwebtoken");
const passJWT = process.env.passJWT;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
    next();
  } catch (error) {
    return res.status(401).json(error.message);

  }
  jwt.verify(token, passJWT, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' });

    req.userId = decoded.id;
    return next();
  });
};

module.exports = { verifyToken };