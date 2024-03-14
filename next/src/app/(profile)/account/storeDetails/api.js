import { getServerDomain } from '@/app/utils';

const getMyStores = async ({ queryKey }) => {
  const url = getServerDomain() + '/store/myStores';
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${queryKey[1]}`,
    },
  });
  return await res.json();
}

export {
  getMyStores,
}