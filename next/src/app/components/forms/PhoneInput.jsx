import React, { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import InputWrapper from './InputWrapper';

const PhoneInput = ({ item, formik, children }) => {
  const [phone, setPhone] = useState(formik.values.phone);
  const { name, type, label, ...rest } = item;
  const handleChange = (value) => {
    formik.setFieldValue(name, value);
    setPhone(value.value)
  }
  // console.log('phone', formik.values.phone)


  return (
    <InputWrapper label={label} formik={formik} name={name}>
      <PatternFormat 
        type="tel"
        format="+1(###) ###-####" 
        mask=" " 
        value={phone}
        onValueChange={value => handleChange(value)}
        className={`input input-bordered w-full
      
        ${
          formik.errors[name]
            ? 'border border-red-400 focus:border-red-400'
            : ''
        }`}
      />


      {/* <input
        type={type}
        name={name}
        onChange={handleChange}
        value={formik.values[name]}
        // onBlur={formik.handleBlur}
        className={`input input-bordered w-full
        ${
          formik.errors[name]
            ? 'border border-red-400 focus:border-red-400'
            : ''
        }`}
        {...rest}
      /> */}
    </InputWrapper>
  );
};

export default PhoneInput;
