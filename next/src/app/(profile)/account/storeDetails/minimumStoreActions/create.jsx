"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import StoreMinimumForm from "./form";
import Alert from "@/app/components/forms/Alert";

const Create = () => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();

  const {
    isLoading,
    error,
    mutate: handleCreate,
    data,
  } = useMutation({
    mutationFn: async (body) => {
      const url = getServerDomain() + "/store/create";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const payload = await res.json();
      localStorage.setItem("user", JSON.stringify(payload));
      dispatch({ type: "LOGIN", payload });
      router.push(`/account/storeDetails`);
      return payload;
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
      creATE
      <Alert error={error} />
      <StoreMinimumForm
        onSubmit={handleCreate}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </div>
  );
};

export default Create;
