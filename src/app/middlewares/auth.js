const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, config.auth.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid" });
  }
};
