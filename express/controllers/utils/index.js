const jwt = require("jsonwebtoken");

const createToken = (id, storeId) => {
  return jwt.sign({id, storeId}, process.env.JWT_SECRET, { expiresIn: "3d" }); // expires in 3 days
};

const getStorePath = (storeName) => { // generate store path from store name to be used in URLs
  debugger
  return storeName.replace(/\s+/g, '-').toLowerCase();
}

module.exports = {
  createToken,
  getStorePath,
}