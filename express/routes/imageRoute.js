const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');

router.get('/all', async (req, res) => {
  const images = await prisma.Image.findMany({})

  fs.writeFileSync(__dirname + "/../mocks/image.json", JSON.stringify(images));
  console.log(fs.readFileSync(__dirname + "/../mocks/image.json", "utf8"));

  res.json(images);
})

router.delete('/all', async (req, res) => {
  try {
    const result = await prisma.Image.deleteMany();
    res.json({ result })
  } catch (e) {
    console.error(e)
  }
})

module.exports = router;