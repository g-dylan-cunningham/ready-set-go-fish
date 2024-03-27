import React from "react";
import InputWrapper from "./InputWrapper";

const Checkbox = ({ item, formik, handleChange, children }) => {
  const { name, type, label, ...rest } = item;
  console.log(formik.values, name, rest);
  return (
    <label className="form-control w-full flex-row justify-between">
      <span className="label inline-block">
        <span className="label-text font-sans">{label}</span>
      </span>
      <div className="flex flex-column items-center">
        <input
          type={type}
          name={name}
          onChange={handleChange}
          checked={formik.values[name]}
          className={`checkbox checkbox-success`}
          {...rest}
        />
      </div>
    </label>
  );
};

export default Checkbox;
