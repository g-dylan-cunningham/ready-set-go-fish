const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/all', async (req, res) => {
  // console.log('prisma',prisma)
  const baseSpecies = await prisma.BaseSpecie.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/baseSpecie.json", JSON.stringify(baseSpecies));
  console.log(fs.readFileSync(__dirname + "/../mocks/baseSpecie.json", "utf8"));

  res.json(baseSpecies);
})

router.delete('/all', async (req, res) => {
  const result = await prisma.BaseSpecie.deleteMany();
  res.json({ result })
})
module.exports = router;