const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  // console.log('prisma',prisma)
  const baseSpecies = await prisma.Base_Specie.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/baseSpecie.json", JSON.stringify(baseSpecies));
  console.log(fs.readFileSync(__dirname + "/../mocks/baseSpecie.json", "utf8"));

  res.json(baseSpecies);
})

module.exports = router;