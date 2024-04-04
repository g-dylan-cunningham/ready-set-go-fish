import React from "react";
import InputWrapper from "./InputWrapper";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const Select = ({ item, formik, handleChange }) => {
  const { name, type, label, map, list, disabled, ...rest } = item;
  return (
    <InputWrapper label={label} formik={formik} name={name}>
      <select
        disabled={disabled}
        name={name}
        className={`select select-bordered w-full 
          ${
            formik.errors[name]
              ? "border border-red-400 focus:border-red-400"
              : ""
          }`}
        onChange={e => handleChange(e, e.target.myvalue)}
        // value={formik.values[name]}
      >
        <option value="default" disabled={disabled}>
          Select {name}
        </option>
        {list.map((listItem) => (
          <SelectItem key={listItem} myvalue={listItem} value={listItem} label={map[listItem]} />
        ))}
      </select>
    </InputWrapper>
  );
};

export default Select;

const SelectItem = ({ value, label = value, key }) => {
  console.log('selectitem', value, label, key)
  return (
    <option key={key} value={value}>
      {label}
    </option>
  );
};
