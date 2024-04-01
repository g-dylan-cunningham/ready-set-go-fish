import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
// import { updateSku } from '@/modules/prisma/actions';


export async function GET(request) {
  // get single speciesy
  console.log('he')
  
  try {
    const storePath = request.nextUrl.searchParams.get(['storePath']);
    const res = await fetch(`http://localhost:4000/storeRead/${storePath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log('data', data)
    if (data.isHidePhone) {
      delete data.phone;
      delete data.intlPhone;
    }

    if (data.isHideAddress) {
      delete data.address;
    }

    return NextResponse.json({ ...data });
  } catch (e) {
    console.log('get my store error', e);
    return NextResponse.json({ error: true});
  }

  

  // // handle fetch unique
  // if (specie_id) {
  //   const specie = await prisma.species.findUnique({
  //     where: {
  //       specie_id,
  //     },
  //     include: { skus: true },
  //   });
  //   return NextResponse.json(specie);
  // }

  // handle fetch all
  // const species = await prisma.species.findMany({
  //   orderBy: { created_at: 'desc' },
  //   include: {
  //     skus: {
  //       orderBy: { created_at: 'desc' },
  //     },
  //     images: {
  //       // where: {
  //       //   is_primary: true,
  //       //   is_thumbnail: true,
  //       // },
  //     },
  //   },
  // });


  
}
