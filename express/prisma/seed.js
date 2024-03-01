const { PrismaClient } = require('@prisma/client')
const cuid = require('cuid')
const prisma = new PrismaClient()

async function main() {
  const wetSpot = await prisma.Store.upsert({
    where: { store_id: 'wet-spot-store-id'},
    update: {},
    create: {
      store_name: 'The Wet Spot',
      description: 'Beautiful fish available',
      email: 'alice@prisma.io',
      phone: '6023500692',
      is_shipping: false,
      is_pickup: true,
    },
  })
  const baseTrout = await prisma.Base_Specie.upsert({
    where: { specie_id: 'malawi-trout-id'},
    update: {},
    create: {
      specie_id: 'malawi-trout-id',
      common_name: 'Malawi trout',
      scientific_name: 'Der Malawi trout',
      description: 'Beautiful troue fish',
      max_size: 233,
      temperament: 'temperament',
      diet: 'diet',
      compatability: 'compatability',
    },
  });

  const storeTrout = await prisma.Store_Specie.upsert({
    where: { specie_id: 'my-malawi-trout-id'},
    update: {},
    create: {
      specie_id: 'my-malawi-trout-id',
      base_specie_id: 'malawi-trout-id',
      common_name: 'my Malawi trout',
      scientific_name: 'my Der Malawi trout',
      description: 'my Beautiful troue fish',
      max_size: 233,
      temperament: 'my temperament',
      diet: 'my diet',
      compatability: 'my compatability',
    },
  });

  const troutSku1 = await prisma.Sku.upsert({
    where: { sku_id: 'sku1'},
    update: {},
    create: {
      sku_id: 'sku1',
      store_specie_id: 'my-malawi-trout-id',
      price: "14",
      sex: "MALE",
      size: "L"
    },
  })
  const troutSku2 = await prisma.Sku.upsert({
    where: { sku_id: 'sku2' },
    update: {},
    create: {
      sku_id: 'sku2',
      store_specie_id: 'my-malawi-trout-id',
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