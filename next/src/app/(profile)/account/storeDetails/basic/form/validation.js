import * as yup from "yup";

export default yup.object().shape({
  storeName: yup
    .string()
    .max(40, 'under 40 characters please')
    .min(2, 'at least 2 characters please')
    .required("Store name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Please enter email"),
});
