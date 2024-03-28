import React from "react";
import { InfoIcon } from "@/app/components/icons";
import InputWrapper from "./InputWrapper";

const Checkbox = ({ item, formik, handleChange, children }) => {
  const { name, type, label, info, ...rest } = item;
  return (
    <>
      <label className="form-control w-full flex-row justify-between">
        <div className="flex flex-row">
        <span
          onClick={(e) => e.preventDefault()}
          className="tooltip h-full mr-2 flex"
          data-tip={info}
        >
          <InfoIcon classes='h-full m-auto'/>
        </span>

        <span className="label inline-block max-w-sm">
          <span className="label-text font-sans">{label}</span>
        </span>
        </div>
      

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
    </>
  );
};

export default Checkbox;
