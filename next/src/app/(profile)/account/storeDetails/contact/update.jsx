"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import ContactForm from "./form";
import Alert from "@/app/components/forms/Alert";

const UpdateContact = ({ myStores, traverse, children }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();

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
        traverse(1);
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (data) return <div>create maybe</div>;

  const initialValues = {
    isIntl: myStores[0]?.address?.isIntl || false,
    street1: myStores[0]?.address?.street1 || '',
    street2: myStores[0]?.address?.street2 || '',
    city: myStores[0]?.address?.city || '',
    state: myStores[0]?.address?.state || '',
    postal: myStores[0]?.address?.postal || '',
    intlPostal: myStores[0]?.address?.intlPostal || '',
    country: myStores[0]?.address?.country || '',
    province: myStores[0]?.address?.province || '',
    phone: myStores[0]?.phone || '',
  };

  return (
    <div>
      <i>(UPDATE)</i>
      <Alert error={error} />
      <ContactForm
        onSubmit={handlePut}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      >
        {children}
      </ContactForm>
    </div>
  );
};

export default UpdateContact;
