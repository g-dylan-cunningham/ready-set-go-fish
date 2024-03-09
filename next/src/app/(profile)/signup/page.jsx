'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Field } from '@/app/components/forms';
import { Main } from '@/app/components';
import formValidation from '@/app/(profile)/signup/formValidation';
import { fields } from '@/app/(profile)/signup/signupConfig';
import { getServerDomain } from '@/app/utils';
import Skeleton from './SignupWireframe';
import useAuthContext from '@/app/hooks/useAuthContext';

const Signup = ({ params: { specie_id = 1234 } }) => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSignup = async (values) => {
    setError('')
    const payload = { ...values };
    setIsLoading(true);
    const url = getServerDomain() + '/user';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        localStorage.setItem('user', JSON.stringify(data))
        dispatch({ type: "LOGIN", payload: data })
        // router.push(`/`);
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
      email: '',
      password: '',
      zip: '',
      confirm: '',
    },
    onSubmit: handleSignup,
    validate: formValidation,
  });

  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  const heading = "Let's set up your account.";
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
        { error && (
          <div role="alert" className="alert alert-error mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
        )}
        {fields.map((item, i) => (
          <Field
            key={i}
            item={{ ...item }}
            formik={formik}
            handleChange={handleChange}
          />
        ))}

        {/* BUTTONS */}
        <div className='mt-5 flex flex-row justify-between'>
          <button type='submit' className='btn btn-primary btn-active'>
            Save
          </button>
        </div>
      </form>
    </Main>
  );
};

export default Signup;


// zip        String
// displayName String
// password    String
// email      String @unique
// firstName String
// middleName String?
// birthday  String?
// lastName  String?
//  state      String?
// street1    String?
// street2    String?
// city       String?
// country    String?
// isSeller  Boolean  @default(true)