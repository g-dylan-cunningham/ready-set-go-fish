import { countDecimals } from '@/app/utils';
const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validationSchema = (values, props) => {
  
  const errors = {};
  // if (!values.email) {
  //   errors.email = 'Please add your email - we will never sell your info';
  // } else if (!values.email.match(emailValidRegex)) {
  //   errors.email = 'Enter a valid email'
  // }

  // if (values.password !== values.confirm) {
  //   errors.password = 'Password must match Confirm Passworld';
  //   errors.confirm = 'Password must match Confirm Passworld';
  // }

  return errors;
};

export default validationSchema;
