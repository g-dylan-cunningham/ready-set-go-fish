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

const AddStore = () => {
  const { dispatch, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleCreate = async (values) => {
    // debugger;
    setError('')
    const payload = { ...values };
    setIsLoading(true);
    const url = getServerDomain() + '/store/create';

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if(data.message) {
          console.log(data.message);
          setError(data.message);
          return;
        }
        // localStorage.setItem('user', JSON.stringify(data))
        // dispatch({ type: "LOGIN", payload: data })
        router.push(`/`);
      })
      .catch((e) => {
        setIsLoading(false);
        // setError(e)
        console.log(e);
      });
  };

  const formik = useFormik({
    enableReinitialize: true, // need this to take latest values
    initialValues: {
      storeName: '',
      description: '',
      email: '',
      phone: '',
      isShipping: false, 
      isPickup : false,
      isHidePhone: false,
      isHideAddress: false,
      isIntl: false,
      street1: '',
      street2: '',
      city: '',
      state: '',
      postal: '',
      locationPostal: '',
      country: '',
      province: '',
    },
    onSubmit: handleCreate,
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

