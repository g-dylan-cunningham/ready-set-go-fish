import { enumArr, enumMap  } from '@/app/config';
const { stateList, countryList } = enumArr;
const { stateMap, countryMap } = enumMap;
export const fields = [
  {
    component: 'Checkbox',
    label: 'Is non-US address?',
    info: 'Store outside of the US are welcome! Please check this box to make sure we collect your address correctly',
    name: 'isIntl',
    type: 'checkbox',
    eligibility: 'global',
  },
  {
    component: 'Input',
    label: 'Street Address 1',
    name: 'street1',
    type: 'text',
    eligibility: 'global',
  },
  {
    component: 'Input',
    label: 'Street Address 2',
    name: 'street2',
    type: 'text',
    eligibility: 'global',
  },
  {
    component: 'Input',
    label: 'City',
    name: 'city',
    type: 'text',
    eligibility: 'global',
  },
  {
    component: 'Select',
    label: 'State',
    name: 'state',
    list: stateList,
    map: stateMap,
    eligibility: 'US',
  },
  {
    component: 'Input',
    label: 'Zip/Postal Code',
    name: 'postal',
    required: true,
    eligibility: 'US',
  },
  {
    component: 'Input',
    label: 'State/Region/Province',
    name: 'province',
    type: 'text',
    eligibility: 'intl',
  },
  {
    component: 'Input',
    label: 'Postal Code',
    name: 'intlPostal',
    required: true,
    eligibility: 'intl',
  },
  {
    component: 'Select',
    label: 'Country',
    name: 'country',
    list: countryList,
    map: countryMap,
    eligibility: 'intl',
  },
  {
    component: 'Input',
    label: 'Phone Number (optional)', // TODO support intl phone also for validation purposes in US
    name: 'phone',
    eligibility: 'US',
  },
  {
    component: 'Input',
    label: 'Phone Number (optional)', // TODO support intl phone also for validation purposes in US
    name: 'intlPhone',
    eligibility: 'intl',
  },
];

