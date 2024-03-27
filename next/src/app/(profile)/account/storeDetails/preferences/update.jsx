"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import PreferencesForm from "./form";
import Alert from "@/app/components/forms/Alert";

const UpdatePreferences = ({ myStores, traverse, children }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();
  console.log("myStores update prefs", myStores);
  const {
    isLoading,
    error,
    mutate: handlePut,
    data,
  } = useMutation({
    mutationFn: async (body) => {
      try {
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
        if (!res.ok) {
          throw new Error("res not ok");
        }
        const payload = await res.json();
        traverse(1);
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (data) return <div>shouldn't see this..</div>;
console.log('myStores[0]?.isHidePhone', myStores[0]?.isHidePhone)
  const initialValues = {
    isHideAddress: myStores[0]?.isHideAddress || false,
    isHidePhone: myStores[0]?.isHidePhone || false,
    isPickUp: myStores[0]?.isPickup || false, // isPickup in express! (casing)
    isShipping: myStores[0]?.isShipping || false,
  };
  console.log('init values', initialValues)

  return (
    <div>
      <i>(UPDATE)</i>
      <Alert error={error} />
      <PreferencesForm
        onSubmit={handlePut}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      >
        {children}
      </PreferencesForm>
    </div>
  );
};

export default UpdatePreferences;
