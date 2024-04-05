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
        onChange={(e) => handleChange(e, e.target.label)}
        // value={formik.values[name]}
      >
        <option value="default" disabled={disabled}>
          Select {name}
        </option>
        {list.map((listItem) => {
          const label = map[listItem];
          return (
            <SelectItem
              key={listItem}
              value={listItem + "_" + label} // workaround because having a hard time getting both data in onChange handler
              label={label}
            />
          );
        })}
      </select>
    </InputWrapper>
  );
};

export default Select;

const SelectItem = ({ value, label }) => {
  return (
    <option value={value}>
      {label}
    </option>
  );
};
