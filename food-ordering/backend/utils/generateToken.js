const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, // payload
    process.env.JWT_SECRET, // must match in authMiddleware.js
    { expiresIn: "30d" }
  );
};

module.exports = generateToken;
