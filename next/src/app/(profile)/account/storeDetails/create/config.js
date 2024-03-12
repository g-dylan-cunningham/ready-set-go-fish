export const fields = [
  {
    component: 'Input',
    label: 'Store Name',
    name: 'storeName',
    required: true,
  },
  {
    component: 'TextArea',
    label: 'Description 1',
    name: 'description1',
    // type: 'textarea',
    required: true,
  },
  {
    component: 'TextArea',
    label: 'Description 2',
    name: 'description2',
    // type: 'textarea',
    // required: true,
  },
  {
    component: 'TextArea',
    label: 'Description 3',
    name: 'description3',
    // type: 'textarea',
    // required: true,
  },
  {
    component: 'Input',
    label: 'Store Email',
    name: 'email',
    required: true,
  },
  {
    component: 'Input',
    label: 'Phone Number (optional)',
    name: 'phone',
    // required: true,
  },
  {
    component: 'Input',
    label: 'Hide Phone Number?',
    name: 'isHidePhone',
    // required: true,
  },
  {
    component: 'Input',
    label: 'Zip/Postal Code',
    name: 'postal',
    required: true,
  },
  {
    component: 'Input',
    label: 'Zip/Postal Code',
    name: 'locationPostal', // used for user creation (even if they don't set an address)
    required: true,
  },
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
    label: 'Hide Phone Number?',
    name: 'isHidePhone',
    type: 'checkbox',
  },
  {
    component: 'Checkbox',
    label: 'Hide Address?',
    name: 'isHideAddress',
    type: 'checkbox',
  },
  {
    component: 'Checkbox',
    label: 'Is non-US address?',
    name: 'isIntl',
    type: 'checkbox',
  },
  {
    component: 'Input',
    label: 'Street Address 1',
    name: 'street1',
    type: 'text',
    // required: true,
  },
  {
    component: 'Input',
    label: 'Street Address 2',
    name: 'street2',
    type: 'text',
    // required: true,
  },
  {
    component: 'Input',
    label: 'City',
    name: 'city',
    type: 'text',
    // required: true,
  },
  {
    component: 'Input',
    label: 'State',
    name: 'state',
    type: 'text',
    // required: true,
  },
  // {
  //   component: 'Input',
  //   label: 'Zip/Postal',
  //   name: 'postal',
  //   type: 'text',
  //   // required: true,
  // },
  {
    component: 'Input',
    label: 'Country',
    name: 'country',
    type: 'text',
    // required: true,
  },
  {
    component: 'Input',
    label: 'State/Region/Province',
    name: 'province',
    type: 'text',
    // required: true,
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