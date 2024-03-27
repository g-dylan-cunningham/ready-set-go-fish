"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import PreferenceForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreatePreferences = ({ traverse, children }) => {
  const { dispatch, user, token } = useAuthContext();
  // const router = useRouter();

  const {
    isLoading,
    error,
    mutate: handlePut,
    data,
  } = useMutation({
    mutationFn: async (body) => {
      try {
        const url = getServerDomain() + "/store";
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          throw new Error("res not ok");
        }
        const payload = await res.json();
        // shows the message before main content in this component
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (data) return <h1>Congrats, your store is set up!</h1>;

  const initialValues = {
    storeName: "",
    email: "",
    locationPostal: "",
  };

  return (
    <div>
      <i>(CREATE)</i>
      <Alert error={error} />
      <PreferenceForm
        onSubmit={handlePut}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      >
        {children}
      </PreferenceForm>
    </div>
  );
};

export default CreatePreferences;