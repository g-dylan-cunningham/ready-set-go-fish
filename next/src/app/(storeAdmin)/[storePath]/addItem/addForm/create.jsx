"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getServerDomain, updateLocalStorageWithNewStore } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import SpecieForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateStoreSpecie = ({ traverse }) => {
  const { dispatch, user, store, token } = useAuthContext();
  const [basicError, setBasicError] = useState("");
  // const router = useRouter();

  const {
    isLoading,
    isError,
    error,
    // onError,
    mutate: handleCreate,
    data,
  } = useMutation({
    onError: (err) => console.log("mutation error", err),
    mutationFn: async (body) => {
      try {
        const url = getServerDomain() + "/store/create";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        debugger;
        if (!res.ok) {
          // throw new Error('res not ok')
          const error = await res.json();
          if (error) {
            console.log(error);
            setBasicError(error.message);
            return;
          }
        }

        const payload = await res.json();

        // update local storage so that after page refresh, all items (including `user`, are present)
        // updateLocalStorageWithNewStore(payload);

        // dispatch({ type: "STORE_LOGIN", payload });
        // traverse(1, true);
        // router.push(`/account/storeDetails`);
        return payload;
      } catch (e) {
        console.log(e);
      }
    },
  });
  // console.log('errror', error, isError)

  // onError

  const heading = "Let's create a listing";

  // if (data) return <div>create maybe</div>

  const initialValues = {
    storeName: "",
    email: "",
    // locationPostal: '',
  };
  const handleGetCategory = async (body) => {

    try {
      const url = getServerDomain() + `/baseSpecie/speciesFromCategory/${body.category}`;
      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          next: { revalidate: 1 }, // REVIEW - needed to get latest data during development
        },
      });

      if (!res.ok) {
        // throw new Error('res not ok')
        const error = await res.json();
        if (error) {
          console.log(error);
          // setBasicError(error.message);
          return;
        }
      }

      const payload = await res.json();

      // update local storage so that after page refresh, all items (including `user`, are present)
      // updateLocalStorageWithNewStore(payload);

      // dispatch({ type: "STORE_LOGIN", payload });
      // traverse(1, true);
      // router.push(`/account/storeDetails`);
      return payload;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleGetCategory({ category: "HAP" })}>get category</button>
      <Alert error={basicError} />
      <SpecieForm
        onSubmit={handleCreate}
        isLoading={isLoading}
        initialValues={initialValues}
      />
    </div>
  );
};

export default CreateStoreSpecie;
