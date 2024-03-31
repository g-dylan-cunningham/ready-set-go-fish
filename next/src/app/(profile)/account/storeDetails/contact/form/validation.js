import * as yup from "yup";

export default yup.object().shape({
  street1: yup
    .string()
    .max(50),
    // .min(2)
    // .required("Store name is required"),
  street2: yup
    .string()
    .max(50),
  city: yup
    .string()
    .max(50)
    .required("City is required"),
  state: yup
    .string()
    .max(2)
    .min(2),
  postal: yup
    .string()
    .max(5)
    .min(5),
  phone: yup.object().shape({
    value: yup
      .string()
      .max(10)
      .min(10),
  })
    // .min(2)
});