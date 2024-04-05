import { getServerDomain } from '@/app/utils';

const getMyInventory = async ({ queryKey }) => {
  const url = getServerDomain() + `/storeSpecie/${queryKey[0]}`; // /myInventory
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${queryKey[1]}`,
    },
  });
  return await res.json();
}

const getSpecie = async ({ queryKey }) => {
  console.log('querykey', queryKey)
  const url = getServerDomain() + `/storeSpecie/${queryKey[0]}/${queryKey[1]}`; // /myInventory
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${queryKey[2]}`,
    },
  });
  return await res.json();
}

export {
  getMyInventory,
  getSpecie,
}