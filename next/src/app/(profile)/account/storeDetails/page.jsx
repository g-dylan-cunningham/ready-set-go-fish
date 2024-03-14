'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, redirect } from 'next/navigation';
import Alert from '@/app/components/forms/Alert';
import Skeleton from './wireframe';
import { Main } from '@/app/components';
// import { getServerDomain } from '@/app/utils';
import useAuthContext from '@/app/hooks/useAuthContext';
import {
  getMyStores,
} from './api'
import {
  StoreContact,
  StoreDescription,
  StorePreferences,
  StoreMinimum,
} from '../forms'

const StoreDetails = () => {
  const { dispatch, user, token, store } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState({
    minimum: true,
    contact: true,
    description: true,
    preferences: true,
  })
  // const router = useRouter();
  const noStoresConfigured = "You have no stores configured";

  const setDisabled = useCallback((store, bool) => {
    const state = { ...isDisabled };
    state[store] = bool;
    setIsDisabled(state);
  }, [isDisabled])


  // const accessDenied = !token;
  // if (accessDenied) {
  //   redirect('/login')
  // }
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myStores', token],
    queryFn: getMyStores,
    enabled: !!token
  })

  const myStores = data?.stores || [];

  if (isLoading) {
    return <div>comp loading</div>
  }
  if (error) return 'An error has occurred: ' + error.message;

  console.log('mystores', myStores)

  const callback = () => {

  }

  const initialValues = {
    storeName: myStores[0]?.storeName,
    email: myStores[0]?.email,
    locationPostal: myStores[0]?.locationPostal,
  }

  const heading = "Your Store Details:";
  return (
    <Main>
      <h1 className='text-2xl font-bold capitalize'>{heading}</h1>
      <Alert error={error} />

      {
        error === noStoresConfigured && ( // TODO fix this
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
      <StoreMinimum
        onSubmit={callback}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
        disabled={isDisabled.minimum}
        setDisabled={(bool) => setDisabled('minimum', bool)}
      />
      <StorePreferences onSubmit={callback} />
      <hr />
      <StoreContact onSubmit={callback} />
      <hr />
      <StoreDescription onSubmit={callback} />
    </Main>
  );
};

export default StoreDetails;

