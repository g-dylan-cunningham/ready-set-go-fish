const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const fs = require("fs");
const { createToken } = require('./utils/tokens')

const getAll = async (req, res) => {
  const stores = await prisma.Store.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/store.json", JSON.stringify(stores));
  // console.log(fs.readFileSync(__dirname + "/../mocks/store.json", "utf8"));

  res.json(stores);
}

const deleteAll = async (req, res) => {
  const result = await prisma.Store.deleteMany();
  res.json({ result })
}

const createNew = async (req, res) => {
  try {
    const {
      user,
      storeName,
      email,
      phone,
      locationPostal,
     } = req.body;

    if (!email || !storeName || !locationPostal) {
      throw Error("email, store name and postal code are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }


    // is storeName unique?
    const exists = await prisma.Store.findUnique({
      where: {
        storeName,
      },
    });
    if (exists) {
      throw Error("Store name already in use");
    }

    console.log('req.user.id', req.user.id)
  
    const store = await prisma.Store.create({
      data: {
        users: {
          connect: { id: req.user.id}
        },
        storeName,
        email,
        phone,
        locationPostal,
      },
    });

    const merchantToken = createToken(req.user.id, store.id); // baseUser & merchant
    res.status(201).json({ token: merchantToken, email }); // updates to use store token // REVIEW

    // res.status(201).json(store);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error.message });
  }
};

const getMyStores = async (req, res) => {
  try {
    if (!req.store || !req.store.id) { // uses middleware to get store id
      throw Error('no store is configured for this user')
    }

    const stores = await prisma.Store.findFirst({
      where: {
        id: req.store.id
      },
    })

    console.log('str resp', stores)
    res.json({stores: [stores]})
  } catch (e) {
    console.log("getAllStores error:", e.message);
    res.status(400).send({ message: e?.message})
  }
}

module.exports = {
  getAll,
  createNew,
  deleteAll,
  getMyStores,
};
