const { PrismaClient } = require('@prisma/client')
const cuid = require('cuid')
const prisma = new PrismaClient()

async function main() {
  const wetSpot = await prisma.Store.upsert({
    where: { id: 'wet-spot-store-id'},
    update: {},
    create: {
      storeName: 'The Wet Spot',
      description: 'Beautiful fish available',
      email: 'alice@prisma.io',
      phone: '6023500692',
      isShipping: false,
      isPickup: true,
    },
  })
  const baseTrout = await prisma.BaseSpecie.upsert({
    where: { id: 'malawi-trout-id'},
    update: {},
    create: {
      id: 'malawi-trout-id',
      commonName: 'Malawi trout',
      scientificName: 'Der Malawi trout',
      description: 'Beautiful troue fish',
      maxSize: 233,
      temperament: 'temperament',
      diet: 'diet',
      compatability: 'compatability',
    },
  });

  const storeTrout = await prisma.StoreSpecie.upsert({
    where: { id: 'my-malawi-trout-id'},
    update: {},
    create: {
      id: 'my-malawi-trout-id',
      baseSpecieId: 'malawi-trout-id',
      commonName: 'my Malawi trout',
      scientificName: 'my Der Malawi trout',
      description: 'my Beautiful troue fish',
      maxSize: 233,
      temperament: 'my temperament',
      diet: 'my diet',
      compatability: 'my compatability',
    },
  });

  const troutSku1 = await prisma.Sku.upsert({
    where: { id: 'sku1'},
    update: {},
    create: {
      id: 'sku1',
      storeSpecieId: 'my-malawi-trout-id',
      price: "14",
      sex: "MALE",
      size: "L"
    },
  })
  const troutSku2 = await prisma.Sku.upsert({
    where: { id: 'sku2' },
    update: {},
    create: {
      id: 'sku2',
      storeSpecieId: 'my-malawi-trout-id',
      price: "11",
      sex: "MALE",
      size: "XS"
    },
  });


  console.log({ wetSpot, baseTrout, storeTrout})//, troutSku })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })