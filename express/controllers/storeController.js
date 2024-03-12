const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const fs = require("fs");

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
      throw Error("Email already in use");
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
    // const token = createToken(st.id);
    // const resp = {
    //   email,
    //   displayName,
    //   locationPostal,
    //   // token,
    // };

    res.status(201).json(store);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error.message });
  }
};

const getMyStores = async (req, res) => {
  // join user and stores on userId (many to many)
  const {stores} = await prisma.User.findFirst({
    where: {
      id: req.user.id
    },
    select: {
      stores: true
    }
  })
  res.json({ stores })
}

module.exports = {
  getAll,
  createNew,
  deleteAll,
  getMyStores,
};
