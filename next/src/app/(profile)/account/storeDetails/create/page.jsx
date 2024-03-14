"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import { Main } from "@/app/components";
import { getServerDomain } from "@/app/utils";
import Skeleton from "./wireframe";
import useAuthContext from "@/app/hooks/useAuthContext";
import { StoreMinimum } from "../../forms";

const AddStore = () => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();

  const {
    isLoading,
    error,
    mutate: handleCreate,
    data,
  } = useMutation({
    mutationFn: async (payload) => {
      const url = getServerDomain() + "/store/create";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      return await res.json();
    },
  })

  const heading = "Let's set up your Store.";
  if (isLoading) return <Skeleton heading={heading} />;

  if (data) return <div>create maybe</div>


  const initialValues = {
    storeName: '',
    email: '',
    locationPostal: '',
  }

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      <StoreMinimum
        onSubmit={handleCreate}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </Main>
  );
};

export default AddStore;
