import React from "react";
import Link from 'next/link'

async function getData({ storePath }) {
  // const res = await fetch('https://api.example.com/...')

  try {
    const res = await fetch(
      `http://localhost:3000/api/stores?storePath=${storePath}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          next: { revalidate: 1 }, // REVIEW - needed to get latest data during development
        },
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  } catch (e) {
    console.log('e',e)
  }
  
}


const MailingAddress = ({ address = {} }) => {
  return (
    <div>
      <h3>ADDRESS:</h3>
      <p>{address.street1}</p>
      <p>{address.street2}</p>
      <span>{address.city}{" "}</span>
      <span>{address.state}{" "}</span>
      <span>{address.postal}</span>
    </div>
  )
}

const StorePage = async ({ params }) => {
  const { storePath } = params;
  let { store } = await getData({ storePath });
  if (!store) {
    store = {}
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center">StorePage {storePath}</h1>
      <div>
        {store?.storeName && <h1>{store.storeName}</h1>}
        {store?.description1 && <p>{store.description1}</p>}
        {store?.description2 && <p>{store.description2}</p>}
        {store?.description3 && <p>{store.description3}</p>}
        <div>
          CONTACT INFO:
          {store?.intlPhone && (
            <p>{store.intlPhone}</p>
          )}
          {store?.intlPhone && (
            <p>{store.intlPhone}</p>
          )}
          <MailingAddress address={store.address} />
        </div>
      </div>
      <Link href={`/${storePath}/inventory`} className="link link-primary">Inventory</Link>
    </div>
  );
};

export default StorePage;
