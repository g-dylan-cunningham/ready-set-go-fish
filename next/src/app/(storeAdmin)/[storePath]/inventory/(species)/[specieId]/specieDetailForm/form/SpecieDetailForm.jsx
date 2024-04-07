"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import { Field } from "@/app/components/forms";
import usePageStateContext from '../../context/usePageStateContext';
import validationSchema from "./validation";
import { fields } from "./config";
import { EditIcon } from "@/app/components/icons"

const SpecieDetailForm = ({
  onSubmit,
  specie,
  // isLoading,
}) => {
  const { sections, dispatch: dispatchPageState } = usePageStateContext();
  const { isDisabled, isLoading } = sections?.description;

  console.log('isLoading', sections)
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: { description: specie?.description },
    onSubmit: onSubmit,
    validationSchema,
  });

  const handleChange = (e) => {
    const { target } = e;
    // if (target.type === "checkbox") {
    //   formik.setFieldValue(target.name, target.checked);
    // } else {
    formik.setFieldValue(target.name, target.value);
    // }
  };

  const toggleDisabled = () => {
    dispatchPageState({ type: 'UPDATE_SECTION_STATE', payload: { section: 'description', isDisabled: !isDisabled }})
  }

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
          disabled={isDisabled}
        />
      ))}
      <div className={`mt-5 flex flex-row ${isDisabled ? 'justify-between' : 'justify-end'}`}>
        {
          isDisabled && (
            <button onClick={toggleDisabled}>
              <EditIcon />
            </button>
          )
        }
        <button type="submit" className="btn btn-primary btn-active" disabled={isDisabled}>
          {
            isLoading ? <span className="loading loading-spinner"></span> : "UPDATE SPECIE"
          }
        </button>
      </div>
    </form>
  );
};

export default SpecieDetailForm;
