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
  {
    component: 'Input',
    label: 'Zip/Postal Code',
    name: 'locationPostal', // used for user creation (even if they don't set an address)
    required: true,
  },
];

// model Store {
//   id       String   @id @default(cuid())
//   storeName   String
//   description1  String
//   description2  String
//   description3  String
//   email        String
//   phone        String
// isHidePhone
// isHideAddress
// address1
// address2
// city
// state
// postal
// country
// province

//   isShipping  Boolean  @default(true)
//   isPickup  Boolean  @default(true)
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt