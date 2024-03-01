const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  const stores = await prisma.Store.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/store.json", JSON.stringify(stores));
  console.log(fs.readFileSync(__dirname + "/../mocks/store.json", "utf8"));

  res.json(stores);
})

module.exports = router;
