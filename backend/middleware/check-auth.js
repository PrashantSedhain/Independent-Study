const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_password_here_this_is_Temporary");
    next();
  } catch {
    res.status(401).json({ message: "Authorization failed" });
  }
};
