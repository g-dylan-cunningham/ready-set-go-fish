"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import ContactForm from "./form";
import Alert from "@/app/components/forms/Alert";

const Create = ({ traverse }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();
console.log('create')
  const {
    isLoading,
    error,
    mutate: handlePut,
    data,
  } = useMutation({
    mutationFn: async (body) => {
      // debugger
      const url = getServerDomain() + "/store";
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const payload = await res.json();
      traverse(1);
      // localStorage.setItem("user", JSON.stringify(payload));
      // dispatch({ type: "LOGIN", payload });
      // router.push(`/account/storeDetails`);
      // TODO dispatch to next tab?
      return payload;
    },
  })

  if (data) return <div>create maybe</div>

  const initialValues = {
    storeName: '',
    email: '',
    locationPostal: '',
  }

  return (
    <div>
      <Alert error={error} />
      <ContactForm
        onSubmit={handlePut}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      />
      createee
    </div>
  );
};

export default Create;
