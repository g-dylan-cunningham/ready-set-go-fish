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


router.get('/categoriesFromRegion/:region', async (req, res) => {
  try {
    const { region } = req.params;
    let list, map;
    if (region === 'MALAWI') {
      list = ['PEACOCK', 'HAP', 'MBUNA'];
      map = {PEACOCK: 'Peacock', HAP: 'Hap', MBUNA: 'Mbuna'};
    } else if (region === 'TANGANYIKA') {
      list = ['FEATHERFIN', 'FRONTOSA', 'JULIOCHROMIS', 'LAMPROLOGINES', 'TROPHEUS', 'MISC_TANGANYIKA'];
      map = {FEATHERFIN: 'Feather Fin', FRONTOSA: 'Frontosa', JULIOCHROMIS: 'Julidochromis', LAMPROLOGINES: 'Lamprologines', TROPHEUS: 'Tropheus', MISC_TANGANYIKA: 'Misc Tanganyikans'};
    } else if (region === 'VICTORIA') {
      list = ['Victorians'];
      map = {VICTORIAN_CICHLIDS: 'Victorians'};
    } else {
      throw new Error('unsupported regions', region)
    }
 
    const categoryConfig = {
        component: 'Select',
        label: 'Category',
        name: 'category',
        disabled: false,
        list,
        map,
      };
    res.json([categoryConfig]);
  } catch (e) {
    console.log('e)', e);
    res.json({error: e})
  }

})



router.get('/speciesFromCategory/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const baseSpecies = await prisma.BaseSpecie.findMany({
      where: {
        category
      },
      select: {
        id: true,
        species: true,
        scientificName: true,
        commonName: true,
      }
    })

    let list = [];
    let map = {};
    for (let i = 0; i < baseSpecies.length; i++ ) {
      list.push(baseSpecies[i].id);
      map[baseSpecies[i].id] = baseSpecies[i].species
    }
    console.log('list Map', list, map)
    const speciesConfig = {
      component: 'Select',
      label: 'Species',
      name: 'specieId',
      disabled: false,
      list,
      map,
    };
    console.log('speciesConfig', speciesConfig)
    // disabled: false,
    res.json([speciesConfig]);
  } catch (e) {
    console.log('e)', e);
    res.json({error: e})
  }

})

router.get('/baseSpecieDetail/:specieId', async (req, res) => {
  try {
    const { specieId } = req.params;
    const baseSpecie = await prisma.BaseSpecie.findUnique({
      where: {
        id: specieId
      },

      // select: {
        //   id: true,
        //   species: true,
        //   scientificName: true,
        //   commonName: true,
        // }
      })
      console.log('baslSepcie', baseSpecie)

    // let list = [];
    // let map = {};
    // for (let i = 0; i < baseSpecies.length; i++ ) {
    //   list.push(baseSpecies[i].id);
    //   map[baseSpecies[i].id] = baseSpecies[i].species
    // }
    // console.log('list Map', list, map)
    // const speciesConfig = {
    //   component: 'Select',
    //   label: 'Species',
    //   name: 'specieId',
    //   disabled: false,
    //   list,
    //   map,
    // };
    // console.log('speciesConfig', speciesConfig)
    // disabled: false,
    res.json([baseSpecie]);
  } catch (e) {
    console.log('e)', e);
    res.json({error: e})
  }

})



router.delete('/all', async (req, res) => {
  const result = await prisma.BaseSpecie.deleteMany();
  res.json({ result })
})
module.exports = router;