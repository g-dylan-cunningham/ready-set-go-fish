import React from "react";
import InputWrapper from "./InputWrapper";

const Checkbox = ({ item, formik, handleChange, children }) => {
  const { name, type, label, ...rest } = item;
  // console.log(formik.values, name)
  return (
    <label className="form-control w-full flex-row justify-between">
      <div className="flex flex-column items-center">
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className={`checkbox checkbox-success`}
        {...rest}
      />
      </div>


      <span className="label inline-block">
        <span className="label-text font-sans">{label}</span>
      </span>
    </label>
  );
};

export default Checkbox;
