const jwt = require("jsonwebtoken");

const createToken = (id, storeId) => {
  return jwt.sign({ id , storeId}, process.env.JWT_SECRET, { expiresIn: "3d" }); // expires in 3 days
};

module.exports = {
  createToken,
}