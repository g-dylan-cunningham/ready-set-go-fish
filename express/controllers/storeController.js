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

const createNew = async (req, res) => {  // /create POST
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
      throw Error("storeName already in use");
    }
    // console.log('req.user.id', req.user.id)
  
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
    res.status(201).json({ token: merchantToken, email, store }); // updates to use store token // REVIEW

    // res.status(201).json(store);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error.message });
  }
};

const getMyStores = async (req, res) => { // GET /myStores
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

const updateStore = async (req, res) => { // PUT /
  try {
    if (!req.store || !req.store.id) { // uses middleware to get store id
      throw Error('no store is configured for this user')
    }
    console.log('req.body (update)', req.body)

    const addressProps = {
      // storeId: req.store?.id,
      ...(req.body?.street1 && {street1: req.body.street1}),
      ...(req.body?.street2 && {street1: req.body.street2}),
      ...(req.body?.city && {street1: req.body.city}),
      ...(req.body?.state && {street1: req.body.state}),
      ...(req.body?.postal && {street1: req.body.postal}),
      ...(req.body?.country && {street1: req.body.country}),
      ...(req.body?.province && {street1: req.body.province}),
      // street2: req.body.street2,
      // isIntl: req.body.street1,
      // city: req.body.city,
      // state: req.body.state,
      // postal: req.body.postal,
      // country: req.body.country,
      // province: req.body.province,
    }

    const storeProps = {
      // storeId: req.store?.id,
      ...(req.body?.storeName && {street1: req.body.storeName}),
      ...(req.body?.description1 && {street1: req.body.description1}),
      ...(req.body?.description2 && {street1: req.body.description2}),
      ...(req.body?.description3 && {street1: req.body.description3}),
      ...(req.body?.email && {street1: req.body.email}),
      ...(req.body?.phone && {street1: req.body.phone}),
      ...(req.body?.locationPostal && {street1: req.body.locationPostal}),
      ...(req.body?.isShipping && {street1: req.body.isShipping}),
      ...(req.body?.isPickup && {street1: req.body.isPickup}),
      ...(req.body?.isHidePhone && {street1: req.body.isHidePhone}),
      ...(req.body?.isHideAddress && {street1: req.body.isHideAddress}),
      // storeName   String @unique
      // description1  String?
      // description2  String?
      // description3  String?
      // email        String
      // phone        String?
      // locationPostal String
      // isShipping  Boolean  @default(true)
      // isPickup  Boolean  @default(true)
      // isHidePhone Boolean  @default(true)
      // isHideAddress Boolean  @default(true)
    }
    console.log('addressPorps;', addressProps);
    console.log('storeProps', storeProps)
    const store = await prisma.Store.update({
      where: {
        id: req.store.id
      },
      data: {
        ...storeProps,
        address: {
          connectOrCreate: {
            where: {
              storeId: req.store?.id
            },
            create: {
              ...addressProps
            }
          }
        }
      }
    })
    res.status(200).json(store)
  } catch (e) {
    console.log('error in put', e)
  }
}

module.exports = {
  getAll,
  createNew,
  deleteAll,
  getMyStores,
  updateStore,
};
