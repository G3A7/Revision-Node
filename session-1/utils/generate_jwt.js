const jwt = require("jsonwebtoken");

async function generateToken(payload) {
  const token = await jwt.sign(payload, process.env.JWTSECRETKEY, {
    expiresIn: "10m",
  });
  return token;
}

module.exports = generateToken;
