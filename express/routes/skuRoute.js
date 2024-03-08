const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const fs = require('fs');


router.get('/all', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const skus = await prisma.Sku.findMany({
    // where: {
    //   published: true,
    //   ...or,
    // },
    // include: { id: true, email: true },
    // select: { store_id: true, store_name: true, is_shipping: true, phone: true, is_pickup: true, description: true }
    // take: Number(take) || undefined,
    // skip: Number(skip) || undefined,
    // orderBy: {
    //   updatedAt: orderBy || undefined,
    // },
  })
  fs.writeFileSync(__dirname + "/../mocks/sku.json", JSON.stringify(skus));
  console.log(fs.readFileSync(__dirname + "/../mocks/sku.json", "utf8"));

  res.json(skus)
})

router.delete('/all', async (req, res) => {
  const result = await prisma.Sku.deleteMany();
  res.json({ result })
})

module.exports = router;
