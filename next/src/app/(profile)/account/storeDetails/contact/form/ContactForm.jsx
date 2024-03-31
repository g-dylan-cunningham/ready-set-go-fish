"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Field } from "@/app/components/forms";
import { Main } from "@/app/components";
import Skeleton from "./wireframe";
import validationSchema from "./validation";
import { fields } from "./config";
import Alert from "@/app/components/forms/Alert";

const ContactForm = ({
  children,
  onSubmit,
  error,
  isLoading,
  initialValues = {
    isIntl: false,
    street1: "",
    street2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    province: "",
  },
}) => {
  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: onSubmit,
    validationSchema,
  });

  const handleChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      formik.setFieldValue(target.name, target.checked);
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  const heading = "Contact Details";
  if (isLoading) return <Skeleton heading={heading} />;

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-between max-w-md mx-auto"
      >
        <Alert error={error} />

        {formik.values.isIntl ? (
          fields.map((item, i) => {
            if (item.eligibility !== "US") {
              return (
                <Field
                  key={i}
                  item={{ ...item }}
                  formik={formik}
                  handleChange={handleChange}
                />
              );
            }
            return null;
          })
        ) : (
          fields.map((item, i) => {
            if (item.eligibility !== "intl") {
              return (
                <Field
                  key={i}
                  item={{ ...item }}
                  formik={formik}
                  handleChange={handleChange}
                />
              );
            }
            return null;
          })
        )}
        
        {/* BUTTONS */}
        <div className="mt-5 flex flex-row justify-between">
          {/* previous button */}
          {children}
          <button type="submit" className="btn btn-primary btn-active">
            NEXT
          </button>
        </div>
      </form>
    </Main>
  );
};

export default ContactForm;
