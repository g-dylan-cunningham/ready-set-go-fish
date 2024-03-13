'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Field } from '@/app/components/forms';
import { Main } from '@/app/components';
import Skeleton from './wireframe';
import formValidation from './validation';
import { fields } from './config';
import { getServerDomain } from '@/app/utils';
import useAuthContext from '@/app/hooks/useAuthContext';
import Alert from '@/app/components/forms/Alert';

const AddStore = ({ handleAction }) => {
  const { dispatch, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      description1: '',
      description2: '',
      description3: '',
    },
    onSubmit: handleAction,
    validate: formValidation,
  });

  console.log(formik.values)

  const handleChange = (e) => {
    const { target } = e;
    if(target.type === 'checkbox') {
      formik.setFieldValue(target.name, target.checked);
    } else {
      formik.setFieldValue(target.name, target.value);
    }
  };

  const heading = "Storefront";
  if (isLoading)
    return (
      <Skeleton heading={heading} />
    );

  return (
    <Main>
      <h1 className='text-2xl font-bold capitalize'>{heading}</h1>

      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-between'
      >
        <Alert error={error} />
        {fields.map((item, i) => (
          <Field
            key={i}
            item={{ ...item }}
            formik={formik}
            handleChange={handleChange}
          />
        ))}

        {/* BUTTONS */}
        <div className='mt-5 flex flex-row justify-end'>
          <button type='submit' className='btn btn-primary btn-active'>
            Create
          </button>
        </div>
        {/* <div className='mt-5 flex flex-row justify-center'>
          <Link className='link underline text-blue-600' href="/login">
            Already have an account?
          </Link>
        </div> */}
      </form>
    </Main>
  );
};

export default AddStore;

