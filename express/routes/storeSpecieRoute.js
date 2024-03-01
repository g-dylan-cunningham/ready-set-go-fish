const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  const storeSpecies = await prisma.Store_Specie.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/storeSpecie.json", JSON.stringify(storeSpecies));
  console.log(fs.readFileSync(__dirname + "/../mocks/storeSpecie.json", "utf8"));

  res.json(storeSpecies);
})

module.exports = router;