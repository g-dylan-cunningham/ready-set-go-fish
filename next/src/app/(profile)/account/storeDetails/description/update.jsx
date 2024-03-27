"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import ContactForm from "./form";
import Alert from "@/app/components/forms/Alert";

const UpdateDescription = ({ myStores, traverse, children }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();
  console.log("myStores", myStores);
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

  const initialValues = {
    description1: myStores[0]?.description1 || '',
    description2: myStores[0]?.description2 || '',
    description3: myStores[0]?.description3 || '',
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

export default UpdateDescription;
