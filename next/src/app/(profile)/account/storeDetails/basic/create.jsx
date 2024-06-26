"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import { getServerDomain, updateLocalStorageWithNewStore } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import BasicForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateBasic = ({ traverse }) => {
  const { dispatch, user, token } = useAuthContext();
  const [basicError, setBasicError] = useState('');
  // const router = useRouter();

  const {
    isLoading,
    isError,
    error,
    // onError,
    mutate: handleCreate,
    data,
  } = useMutation({
    onError: (err) => console.log('mutation error', err),
    mutationFn: async (body) => {
      try {
        const url = getServerDomain() + "/store/create";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          // throw new Error('res not ok')
          const error = await res.json();
          if (error) {
            console.log(error)
            setBasicError(error.message);
            return
          }
        }
        const payload = await res.json();

        // update local storage so that after page refresh, all items (including `user`, are present)
        updateLocalStorageWithNewStore(payload);

        dispatch({ type: "STORE_LOGIN", payload });
        traverse(1, true);
        // router.push(`/account/storeDetails`);
        return payload;
      } catch (e) {
        console.log(e)
      }
    },
  })
  // console.log('errror', error, isError)

  // onError

  const heading = "Let's set up your Store.";
  // if (isLoading) return <Skeleton heading={heading} />;

  if (data) return <div>create maybe</div>


  const initialValues = {
    storeName: '',
    email: '',
    // locationPostal: '',
  }

  return (
    <div>
      <Alert error={basicError} />
      <BasicForm
        onSubmit={handleCreate}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </div>
  );
};

export default CreateBasic;
