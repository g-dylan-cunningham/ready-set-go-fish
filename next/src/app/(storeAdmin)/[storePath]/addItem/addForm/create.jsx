"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getServerDomain, updateLocalStorageWithNewStore } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import SpecieForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateStoreSpecie = ({}) => {
  const { dispatch, user, store, token } = useAuthContext();
  const [basicError, setBasicError] = useState("");
  // const router = useRouter();

  const {
    isLoading,
    isError,
    error,
    mutate: handleCreate,
    data,
  } = useMutation({
    onError: (err) => console.log("mutation error", err),
    mutationFn: async (body) => {
      console.log('body', body)
      try {
        // debugger
        const url = getServerDomain() + "/storeSpecie";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const error = await res.json();
          if (error) {
            console.log(error);
            setBasicError(error.message);
            return;
          }
        }

        const payload = await res.json();
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });

  const heading = "Let's create a listing";


  // const initialValues = {
  //   storeName: "",
  //   email: "",
  // };

  return (
    <div>
      {" "}
      <Alert error={basicError} />
      <SpecieForm
        onSubmit={handleCreate}
        isLoading={isLoading}
        initialValues={{ region: "MALAWI" }}
      />
    </div>
  );
};

export default CreateStoreSpecie;
