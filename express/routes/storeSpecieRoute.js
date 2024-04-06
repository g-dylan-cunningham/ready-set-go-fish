const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const prisma = require("../db/prisma");
const fs = require("fs");

const router = express.Router();
router.use(requireAuth);

router.post("/", async (req, res) => {
  try {
    const { body, store } = req;
    const { region, category, specieId, commonName } = body;
    const { id: storeId } = store;
    console.log(storeId, region, category, specieId);

    if (!specieId || !storeId) {
      throw Error("specieId and store name are required");
    }

    const exists = await prisma.storeSpecie.findFirst({
      where: {
        baseSpecieId: specieId,
      },
    });

    if (exists) {
      return res
        .status(409)
        .json({
          message:
            "Your store already has this species listed. You can not create a duplicate",
        });
    }

    const baseSpecie = await prisma.baseSpecie.findFirst({
      where: {
        id: specieId,
      },
      // select: {
      //   id: true,
      //   password: true,
      //   stores: { // handles store token if store present
      //     select: {
      //       id: true,
      //       storeName: true,
      //       storePath: true
      //     }
      //   }
      // }
    });

    const storeSpecie = await prisma.StoreSpecie.create({
      data: {
        baseSpecie: {
          connect: { id: specieId },
        },
        store: {
          connect: { id: storeId },
        },
        region,
        category,
        scientificName: specieId,
        commonName: commonName,
      },
    });

    res.json({ storeSpecie, baseSpecie });
  } catch (e) {
    console.log("post store species", e);
    res.json({ error: e });
  }
});

router.put("/:specieId", async (req, res) => {
  try {
    const { body, store, params } = req;
    const { description } = body;
    const { specieId } = params;
    const { id: storeId } = store;
    // console.log(storeId, region, category, specieId);

    if (!specieId || !storeId) {
      throw Error("specieId and store name are required");
    }

    const specie = await prisma.storeSpecie.update({
      where: {
        id: specieId,
      },
      data: {
        description
      }
    });


    res.json(specie);
  } catch (e) {
    console.log("put store species", e);
    res.json({ error: e });
  }
});

router.get("/myInventory", async (req, res) => {
  try {
    const { store } = req;
    const storeSpecies = await prisma.StoreSpecie.findMany({
      where: {
        storeId: store.id,
      },
    });

    return res.json(storeSpecies);
  } catch (e) {
    return res.status(500).send({ error: e, message: e.message });
  }
});

router.get("/myInventory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const storeSpecie = await prisma.StoreSpecie.findFirst({
      where: {
        id: id,
      },
    });

    const baseSpecie = await prisma.BaseSpecie.findFirst({
      where: {
        id: storeSpecie.baseSpecieId,
      },
    });
    console.log("storeSpec");
    // // if any values are null in obj1, override them w obj2 attrs
    // function mergeObjs(obj1, obj2){
    //   const merged = {}
    //   keys1 = Object.keys(obj1);
    //   keys1.forEach(k1 => {
    //      merged[k1] = obj2[k1] || obj1[k1]; // replace values from 2nd object, if any
    //   })
    //   Object.keys(obj2).forEach(k2 => {
    //      if (!keys1.includes(k2)) merged[k2] = obj2[k2]; // add additional properties from second object, if any
    //   })
    //   return merged
    // }

    // const combined = mergeObjs(storeSpecie, baseSpecie)

    return res.json({ storeSpecie, baseSpecie });
  } catch (e) {
    return res.status(500).send({ error: e, message: e.message });
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
