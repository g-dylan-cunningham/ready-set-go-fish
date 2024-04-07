import { enumArr, enumMap  } from '@/app/config';
const { regionList, countryList } = enumArr;
const { regionMap, countryMap } = enumMap;

export const fields = [
  {
    component: 'TextArea',
    label: 'Description',
    name: 'description',
    // list: regionList,
    // map: regionMap,
  },

  // {
  //   component: 'Input',
  //   label: 'Store Name',
  //   name: 'storeName',
  //   required: true,
  // },
  // {
  //   component: 'Input',
  //   label: 'Store Email',
  //   name: 'email',
  //   required: true,
  // },

  // {
  //   component: 'Select',
  //   label: 'Category',
  //   name: 'category',
  //   list: regionList,
  //   map: regionMap,
  // },
];
