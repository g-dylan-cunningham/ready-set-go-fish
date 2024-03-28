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


const getMyStores = async (req, res) => { // GET /store/myStores
  try {
    if (!req.store || !req.store.id) { // uses middleware to get store id
      throw Error('no store is configured for this user')
    }

    const stores = await prisma.Store.findFirst({
      where: {
        id: req.store.id
      },
      include: {
        address: true
      }
    })

    console.log('/stores/getMyStores resp', stores)
    res.json({stores: [stores]})
  } catch (e) {
    console.log("getAllStores error:", e.message);
    res.status(400).send({ message: e?.message})
  }
}


/**
 * Only called from the intial store setup flow. It returns a new token, which is updated in sessionStorage
 * Subsequent updates occur in updateStore method in this controller
 * @param {*} req 
 * @param {*} res 
 */
const createNew = async (req, res) => {  // /store/create POST
  try {
    const {
      user,
      storeName,
      email,
      phone,
      locationPostal,
     } = req.body;

    if (!email || !storeName) {
      throw Error("email and store name are required");
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

    const address = await prisma.Address.create({
      data: {}
    })
  console.log('address', address)
    const store = await prisma.Store.create({
      data: {
        users: {
          connect: { id: req.user.id}
        },
        storeName,
        email,
        phone,
        locationPostal,
        address: {
          connect: { id: address.id}
        },
      },      
    });

    const merchantToken = createToken(req.user.id, store.id); // baseUser & merchant
    res.status(201).json({ token: merchantToken, store }); // updates to use store token // REVIEW

    // res.status(201).json(store);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error.message });
  }
};


/**
 * There are several pages which this api supports
 * 1) updating the basic info (not create, see above method)
 * 2) address 
 * 3) description
 * 4) prefs
 * @param {*} req 
 * @param {*} res 
 */
const updateStore = async (req, res) => { // PUT /store
  try {
    if (!req.store || !req.store.id) { // uses middleware to get store id
      throw Error('no store is configured for this user')
    }
    console.log('req.body (/store/  PUT)', req.body,
    
    req.body?.isShipping,
    req.body?.isPickUp,
    req.body?.isHidePhone,
    req.body?.isHideAddress)

    // address is a separate table (1:1). If address fields, present, then we'll add them.
    // if not present, we will make sure it's all connected REVIEW
    const addressProps = {
      ...(req.body.hasOwnProperty('isIntl') && {isIntl: req.body.isIntl}),
      ...(req.body?.street1 && {street1: req.body.street1}),
      ...(req.body?.street2 && {street2: req.body.street2}),
      ...(req.body?.city && {city: req.body.city}),
      ...(req.body?.state && {state: req.body.state}),
      ...(req.body?.postal && {postal: req.body.postal}),
      ...(req.body?.intlPostal && {intlPostal: req.body.intlPostal}),
      ...(req.body?.country && {country: req.body.country}),
      ...(req.body?.province && {province: req.body.province}),
    }

    const storeProps = {
      ...(req.body?.storeName && {
        storeName: req.body.storeName,
        // generate store path from store name to be used in URLs
        storePath: req.body.storeName.replace(/\s+/g, '-').toLowerCase(),
      }),
      ...(req.body?.description1 && {description1: req.body.description1}),
      ...(req.body?.description2 && {description2: req.body.description2}),
      ...(req.body?.description3 && {description3: req.body.description3}),
      ...(req.body?.email && {email: req.body.email}),
      ...(req.body?.phone && {phone: req.body.phone}),
      ...(req.body?.intlPhone && {intlPhone: req.body.intlPhone}),
      ...(req.body?.postal && {locationPostal: req.body.postal}),

      // using .hasOwnProperty on booleans so that `false` values aren't conditionally not added
      ...(req.body.hasOwnProperty('isShipping') && {isShipping: req.body.isShipping}),
      ...(req.body.hasOwnProperty('isPickUp') && {isPickUp: req.body.isPickUp}),
      ...(req.body.hasOwnProperty('isHidePhone') && {isHidePhone: req.body.isHidePhone}),
      ...(req.body.hasOwnProperty('isHideAddress') && {isHideAddress: req.body.isHideAddress}),
    }

    console.log('addressPorps;', addressProps, req.store?.id);
    console.log('storeProps', storeProps)

    const store = await prisma.Store.update({
      where: {
        id: req.store.id
      },
      data: {
        ...storeProps,
        // address: {
        //   connectOrCreate: {
        //     where: {
        //       storeId: req.store?.id
        //     },
        //     create: {
        //       ...addressProps
        //     }
        //   }
        // },
      },
      include: {
        address: true,
      }
    })

    if (addressProps.city) {
      const address = await prisma.Address.update({
        where: {
          id: store.address?.id
        },
        data: {
          ...addressProps
        }
      })
      store.address = address;
    }

    console.log('/stores PUT', store)
    res.status(200).json(store)
  } catch (e) {
    console.log('error in put', e)
    res.status(500).json({error: 'issue with /store PUT'})
  }
}

module.exports = {
  getAll,
  createNew,
  deleteAll,
  getMyStores,
  updateStore,
};
