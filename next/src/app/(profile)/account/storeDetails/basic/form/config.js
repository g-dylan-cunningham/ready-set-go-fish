export const fields = [
  {
    component: 'Input',
    label: 'Store Name',
    name: 'storeName',
    required: true,
  },
  {
    component: 'Input',
    label: 'Store Email',
    name: 'email',
    required: true,
  },
  // { // is now getting duplicate data from  `postal` field (US only). might be useful in regionalizing
  //   component: 'Input',
  //   label: 'Zip/Postal Code',
  //   name: 'locationPostal', // used for user creation (even if they don't set an address)
  //   required: true,
  // },
];
