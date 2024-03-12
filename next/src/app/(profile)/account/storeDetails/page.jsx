'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Field } from '@/app/components/forms';
import { Main } from '@/app/components';
import Skeleton from './wireframe';
import Alert from '@/app/components/forms/Alert';
import formValidation from './validationxxx';
import { fields } from './configxxx';
import { getServerDomain } from '@/app/utils';
import useAuthContext from '@/app/hooks/useAuthContext';

const StoreDetails = () => {
  const { dispatch, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [myStores, setMyStores] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const noStoresConfigured = "You have no stores configured";

  useEffect(() => {
    const fetchStores = async () => {
      setError('')
      setIsLoading(true);
      const url = getServerDomain() + '/store/myStores';
  
      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          if(data.message) {
            console.log(data.message);
            setError(data.message);
            return;
          }
          setMyStores(data.stores);
          if (data.stores?.length === 0 ) {
            setError(noStoresConfigured);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          // setError(e)
          console.log(e);
        });
    };

    if (user?.token) {
      fetchStores()
    } else {
      setError(noStoresConfigured);
    }

  }, [user?.token])


  // const formik = useFormik({
  //   enableReinitialize: true, // need this to take latest values
  //   initialValues: {
  //     storeName: '',
  //     description: '',
  //     email: '',
  //     phone: '',
  //     isShipping: false, 
  //     isPickup : false,
  //     isHidePhone: false,
  //     isHideAddress: false,
  //     isIntl: false,
  //     street1: '',
  //     street2: '',
  //     city: '',
  //     state: '',
  //     postal: '',
  //     locationPostal: '',
  //     country: '',
  //     province: '',
  //   },
  //   onSubmit: fetchStores,
  //   validate: formValidation,
  // });

  // console.log(formik.values)

  // const handleChange = (e) => {
  //   const { target } = e;
  //   if(target.type === 'checkbox') {
  //     formik.setFieldValue(target.name, target.checked);
  //   } else {
  //     formik.setFieldValue(target.name, target.value);
  //   }
  // };

  const heading = "Your Store Details:";
  if (isLoading)
    return (
      <Skeleton heading={heading} />
    );

  return (
    <Main>
      <h1 className='text-2xl font-bold capitalize'>{heading}</h1>
      <Alert error={error} />

      {
        error === noStoresConfigured && (
          <div>
            <div className='mt-5 flex flex-row justify-center'>
              <Link className='link underline text-blue-600' href="/account/storeDetails/create">
                Create my store
              </Link>
            </div>
          </div>
        )
      }
      
      {
        myStores && myStores.length > 0 && (
          myStores.map(store => (
            <h1 key={store.storeName}>{store.storeName}</h1>
          ))
        )
      }
    </Main>
  );
};

export default StoreDetails;

