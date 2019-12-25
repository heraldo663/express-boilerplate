const jwt = require("jsonwebtoken");
const auth = require("../../config/auth");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, auth.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid" });
  }
};
