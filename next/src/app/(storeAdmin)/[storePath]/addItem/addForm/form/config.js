import { enumArr, enumMap  } from '@/app/config';
const { regionList, countryList } = enumArr;
const { regionMap, countryMap } = enumMap;

export const fields = [
  {
    component: 'Select',
    label: 'Region',
    name: 'region',
    list: regionList,
    map: regionMap,
  },

  // {
  //   component: 'Select',
  //   label: 'Category',
  //   name: 'category',
  //   list: regionList,
  //   map: regionMap,
  // },
];
