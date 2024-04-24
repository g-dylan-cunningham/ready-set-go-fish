const express = require('express')
const prisma = require('../db/prisma');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
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

router.get('/store/:storeSpecieId', async (request, res) => {
  console.log('hit the route')
  try {
    const { storeSpecieId } = request.params
  console.log('storeSpecieId', storeSpecieId)
    const images = await prisma.Image.findMany({
      where: {
        AND: [{ storeSpecieId }, { isThumbnail: true }],
      },
    });
    res.json(images);
  } catch (e) {
    console.error(e);
    res.status(500).send({})
  }
})

// adds an image for a store specie
router.post("/store/specie", async (req, res) => {
  try {
    const { body } = req;
    const {
      url,
      isPrimary,
      isSecondary,
      isThumbnail,
      thumbnailUrl,
      fullImageUrl,
      fullImageKey,
      storeSpecieId,
      key,
    } = body;

    const img = await prisma.Image.create({
      data: {
        // baseSpecie: {
        //   connect: { id: specieId },
        // },
        storeSpecie: {
          connect: { id: storeSpecieId },
        },
        key, // image path
        url,
        isPrimary,
        isSecondary,
        isThumbnail,
        thumbnailUrl,
        fullImageUrl,
        fullImageKey
      },
    });

    res.json(img);
  } catch (e) {
    console.log("post store species", e);
    res.json({ error: e });
  }
});

module.exports = router;