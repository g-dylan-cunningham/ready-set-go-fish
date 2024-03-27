"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import BasicForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateBasic = ({ traverse }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();

  const {
    isLoading,
    error,
    mutate: handleCreate,
    data,
  } = useMutation({
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
          throw new Error('res not ok')
        }
        const payload = await res.json();

        // update local storage so that after page refresh, all items (including `user`, are present)
        const oldStore = JSON.parse(localStorage.getItem('details'));
        const newStore = {
          ...oldStore,
          token: payload.token,
          store: payload.store,
        }
        localStorage.setItem("details", JSON.stringify(newStore));
        dispatch({ type: "STORE_LOGIN", payload });
        traverse(1, false);
        // router.push(`/account/storeDetails`);
        return payload;
      } catch (e) {
        console.log(e)
      }
    },
  })

  const heading = "Let's set up your Store.";
  // if (isLoading) return <Skeleton heading={heading} />;

  if (data) return <div>create maybe</div>


  const initialValues = {
    storeName: '',
    email: '',
    locationPostal: '',
  }

  return (
    <div>
      <Alert error={error} />
      <BasicForm
        onSubmit={handleCreate}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </div>
  );
};

export default CreateBasic;
