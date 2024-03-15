"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Field } from "@/app/components/forms";
import Skeleton from "./wireframe";
import formValidation from "./validation";
import { fields } from "./config";
import Alert from "@/app/components/forms/Alert";

const StoreMinimumForm = ({
  onSubmit,
  error,
  isLoading,
  initialValues,
  disabled,
  setDisabled,
}) => {  
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: onSubmit,
    validate: formValidation,
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      formik.setFieldValue(target.name, target.checked);
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  const heading = "Let's set up your Store.";
  if (isLoading) return <Skeleton heading={heading} />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-between"
    >
      <Alert error={error} />
      {fields.map((item, i) => (
        <Field
          key={i}
          item={{ ...item, disabled }}
          formik={formik}
          handleChange={handleChange}
        />
      ))}
      {disabled ? (
        <div className="mt-5 flex flex-row justify-end">
          <button type="button" onClick={() => setDisabled(false)} className="btn btn-secondary btn-active">
            Edit
          </button>
        </div>
      ) : (
        <div className="mt-5 flex flex-row justify-end">
          <button type="submit" className="btn btn-primary btn-active">
            Create
          </button>
        </div>
      )}
    </form>
  );
};

export default StoreMinimumForm;
