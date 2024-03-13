"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Main } from "@/app/components";
import Skeleton from "./wireframe";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import { StoreMinimum } from "../../forms";

const AddStore = () => {
  const { dispatch, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async (values) => {
    setError("");
    const payload = { ...values };
    setIsLoading(true);
    const url = getServerDomain() + "/store/create";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.message) {
          setError(data.message);
          return;
        }
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        router.push(`/account/storeDetails`);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  const heading = "Let's set up your Store.";
  if (isLoading) return <Skeleton heading={heading} />;

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
