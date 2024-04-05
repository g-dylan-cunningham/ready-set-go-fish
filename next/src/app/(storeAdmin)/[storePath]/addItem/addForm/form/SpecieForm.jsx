"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import { getServerDomain, updateLocalStorageWithNewStore } from "@/app/utils";
import { Field } from "@/app/components/forms";
import validationSchema from "./validation";
import { fields as defaultFields } from "./config";
// import useStepContext from "../../contexts/useStepContext";

const BasicForm = ({
  onSubmit,
  initialValues,
}) => {
  // const { dispatch } = useStepContext();
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: onSubmit,
    validationSchema,
  });

  const [ fields, setFields ] = useState(defaultFields);
// console.log('fields', fields)
  // useEffect(() => setIsPristine(true), [])
  // const [isPristine, setIsPristine] = useState(true)

  const handleGetNextField = async ({evt, name, value}) => {
    evt.preventDefault();

    try {
      let url, lastIdx;
      // debugger
      if (name === 'region') {
        url = getServerDomain() + `/baseSpecie/categoriesFromRegion/${value}`;
        lastIdx = 0;
      } else if (name = 'category') {
        url = getServerDomain() + `/baseSpecie/speciesFromCategory/${value}`;
        lastIdx = 1;
      }
      const oldFields = [ ...fields ];
      oldFields.length = lastIdx + 1;
      
      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          next: { revalidate: 1 }, // REVIEW - needed to get latest data during development
        },
      });
      if (!res.ok) {
        const error = await res.json();
        if (error) {
          console.log(error);
          return;
        }
      }
      // debugger
      const newField = await res.json();
      console.log('newFiled', newField)
      setFields([ ...oldFields, ...newField ])
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (evt, next) => {
    
    const { target  } = evt;
    const { name, value, type } = target;
    const [fieldId, fieldLabel] = value.split('_'); 

    console.log('fieldLabel',fieldId, fieldLabel)
    if (name === 'region' || name === 'category') {
      handleGetNextField({evt, name, value: fieldId})
    } else if (name === 'specieId') {
      formik.setFieldValue('commonName', fieldLabel);
    }

    formik.setFieldValue(target.name, fieldId);
    
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

export default BasicForm;
