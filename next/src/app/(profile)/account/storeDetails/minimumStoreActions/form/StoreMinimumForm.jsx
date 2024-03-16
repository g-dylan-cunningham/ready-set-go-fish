"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Field } from "@/app/components/forms";
import formValidation from "./validation";
import { fields } from "./config";

const StoreMinimumForm = ({
  onSubmit,
  initialValues,
  disabled,
}) => {
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: onSubmit,
    validate: () => formValidation,
  });

  const handleChange = (e) => {
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
      className="flex flex-col justify-between"
    >
      {fields.map((item, i) => (
        <Field
          key={i}
          item={{ ...item, disabled }}
          formik={formik}
          handleChange={handleChange}
        />
      ))}
      {!disabled && (
        <div className="mt-5 flex flex-row justify-end">
          <button type="submit" className="btn btn-primary btn-active">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default StoreMinimumForm;
