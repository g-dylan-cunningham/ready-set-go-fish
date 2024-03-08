const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/all', async (req, res) => {
  const storeSpecies = await prisma.StoreSpecie.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/storeSpecie.json", JSON.stringify(storeSpecies));
  console.log(fs.readFileSync(__dirname + "/../mocks/storeSpecie.json", "utf8"));

  res.json(storeSpecies);
})

router.delete('/all', async (req, res) => {
  const result = await prisma.StoreSpecie.deleteMany();
  res.json({ result })
})

module.exports = router;