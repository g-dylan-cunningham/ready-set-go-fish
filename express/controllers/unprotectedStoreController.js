const prisma = require("../db/prisma");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const validator = require("validator");
const fs = require("fs");
const { createToken, getStorePath } = require('./utils')


// const deleteAll = async (req, res) => {
//   const result = await prisma.Store.deleteMany();
//   res.json({ result })
// }


const getStore = async (req, res) => { // GET /store/myStores
  console.log('getSToreee')
  try {
    const { storePath } = req.params;
    const store = await prisma.Store.findFirst({
      where: {
        storePath
      },
      include: {
        address: true
      }
    })

    console.log('/unprotectedStore/store', store)
    res.json({ store })
  } catch (e) {
    console.log("getStore error:", e.message);
    res.status(400).send({ message: e?.message})
  }
}

module.exports = {
  getStore,
};
