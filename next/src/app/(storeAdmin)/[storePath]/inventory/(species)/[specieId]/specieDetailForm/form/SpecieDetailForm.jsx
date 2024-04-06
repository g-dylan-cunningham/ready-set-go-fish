"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import { getServerDomain, updateLocalStorageWithNewStore } from "@/app/utils";
import { Field } from "@/app/components/forms";
import validationSchema from "./validation";
import { fields as defaultFields } from "./config";
// import useStepContext from "../../contexts/useStepContext";

const SpecieDetailForm = ({
  onSubmit,
  specie,
  // initialValues,
  setBasicError
}) => {
console.log('ss', specie)
  // const { dispatch } = useStepContext();
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: { description: specie?.description },
    onSubmit: onSubmit,
    validationSchema,
  });

  const [ fields, setFields ] = useState(defaultFields);


  const [isPristine, setIsPristine] = useState(true)

  const handleChange = (e) => {
    if (isPristine) {
      setIsPristine(false);
    }
    const { target } = e;
    if (target.type === "checkbox") {
      formik.setFieldValue(target.name, target.checked);
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-between max-w-md mx-auto"
    >
      {fields.map((item, i) => (
        <Field
          key={i}
          item={{
            ...item,
          }}
          formik={formik}
          handleChange={handleChange}
        />
      ))}
      <div className="mt-5 flex flex-row justify-end">
        <button type="submit" className="btn btn-primary btn-active">
          SELECT SPECIES
        </button>
      </div>
    </form>
  );
};

export default SpecieDetailForm;
