const express = require("express");
const requireAuth = require('../middleware/requireAuth');
const prisma = require("../db/prisma");
const fs = require("fs");

const router = express.Router();
router.use(requireAuth);

router.post("/", async (req, res) => {
  try {
    const { body, store } = req;
    const { region, category, specie } = body;
    const { id: storeId } = store
    console.log(storeId, region, category, specie)

    if (!specie || !storeId) {
      throw Error("specie and store name are required");
    }

    const storeSpecies = await prisma.StoreSpecie.create({
      data: {
        baseSpecie: {
          connect: { id: specie },
        },
        store: {
          connect: { id: storeId}
        },
        region,
        category,
        scientificName: specie,
        commonName: specie,
      },
    });

    res.json(storeSpecies);
  } catch (e) {
    console.log("post store species", e);
    res.json({ error: e });
  }
});

router.get("/all", async (req, res) => {
  const storeSpecies = await prisma.StoreSpecie.findMany({});

  fs.writeFileSync(
    __dirname + "/../mocks/storeSpecie.json",
    JSON.stringify(storeSpecies)
  );
  console.log(
    fs.readFileSync(__dirname + "/../mocks/storeSpecie.json", "utf8")
  );

  res.json(storeSpecies);
});

router.delete("/all", async (req, res) => {
  const result = await prisma.StoreSpecie.deleteMany();
  res.json({ result });
});

module.exports = router;
