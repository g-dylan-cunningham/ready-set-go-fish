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

const StoreMinimum = ({ onSubmit, error, isLoading, initialValues, disabled }) => {
  // const { dispatch, user } = useAuthContext();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  // const router = useRouter();


  // const handleCreate = async (values) => {
  //   // debugger;
  //   setError('')
  //   const payload = { ...values };
  //   setIsLoading(true);
  //   const url = getServerDomain() + '/store/create';

  //   await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setIsLoading(false);
  //       if(data.message) {
  //         setError(data.message);
  //         return;
  //       }
  //       localStorage.setItem('user', JSON.stringify(data))
  //       dispatch({ type: "LOGIN", payload: data })
  //       router.push(`/account/storeDetails`);
  //     })
  //     .catch((e) => {
  //       setIsLoading(false);
  //       // setError(e)
  //       console.log(e);
  //     });
  // };

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues,
    onSubmit: onSubmit,
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

  const heading = "Let's set up your Store.";
  if (isLoading)
    return (
      <Skeleton heading={heading} />
    );

  return (
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col justify-between'
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
        <div className='mt-5 flex flex-row justify-end'>
          <button type='submit' className='btn btn-primary btn-active'>
            Create
          </button>
        </div>
      </form>
  );
};

export default StoreMinimum;

