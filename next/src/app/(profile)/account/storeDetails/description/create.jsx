"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import DescriptionForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateDescription = ({ traverse, children }) => {
  const { dispatch, user, token } = useAuthContext();
  // const router = useRouter();

  const {
    isLoading,
    error,
    mutate: handlePut,
    data,
  } = useMutation({
    mutationFn: async (body) => {
      // debugger
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
        traverse(1, true);
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (data) return <div>create maybe</div>;

  const initialValues = {
    storeName: "",
    email: "",
    locationPostal: "",
  };

  return (
    <div>
      <i>(CREATE)</i>
      <Alert error={error} />
      <DescriptionForm
        onSubmit={handlePut}
        error={error}
        isLoading={isLoading}
        initialValues={initialValues}
      >
        {children}
      </DescriptionForm>
    </div>
  );
};

export default CreateDescription;