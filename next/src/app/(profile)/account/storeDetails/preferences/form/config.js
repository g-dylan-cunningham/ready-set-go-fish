export const fields = [
  {
    component: 'Checkbox',
    label: 'Will you ship?',
    name: 'isShipping',
    type: 'checkbox',
    info: 'Are you prepared to offer shipping by mail to at least some shoppers? You will need to handle transaction and shipping details yourself.'
  },
  {
    component: 'Checkbox',
    label: 'Can customers pick up orders?',
    name: 'isPickUp',
    type: 'checkbox',
    info: 'Can local customers come to your home/business to collect their fish? This is a great way to connect with your local community'
  },
  {
    component: 'Checkbox',
    label: 'Hide my store address - I will provide it as needed to customers',
    name: 'isHideAddress',
    type: 'checkbox',
    info: 'We will never sell/share your address, but having your mailing address helps us provide better services in the future. Please check this box if you do not want other users to see your full address.'
  },
  {
    component: 'Checkbox',
    label: 'Hide Phone Number?',
    name: 'isHidePhone',
    type: 'checkbox',
    info: 'We will never sell/share your phone number, but having it helps us provide better services in the future. Please check this box if you do not want other users to see your phone number.'
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
//   isPickUp  Boolean  @default(true)
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt