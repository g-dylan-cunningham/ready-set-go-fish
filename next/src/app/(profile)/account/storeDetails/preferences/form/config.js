export const fields = [
  {
    component: 'Checkbox',
    label: 'Will you ship?',
    name: 'isShipping',
    type: 'checkbox',
  },
  {
    component: 'Checkbox',
    label: 'Can customers pick up orders?',
    name: 'isPickUp',
    type: 'checkbox',
  },
  {
    component: 'Checkbox',
    label: 'Hide my store address - I will provide it as needed to customers',
    name: 'isHideAddress',
    type: 'checkbox',
  },
  // {
  //   component: 'Input',
  //   label: 'Phone Number (optional)',
  //   name: 'phone',
  //   // required: true,
  // },
  {
    component: 'Checkbox',
    label: 'Hide Phone Number?',
    name: 'isHidePhone',
    type: 'checkbox',
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