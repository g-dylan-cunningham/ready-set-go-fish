"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import usePageStateContext from '../context/usePageStateContext';
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import SpecieDetailForm from "./form";
import Alert from "@/app/components/forms/Alert";

const CreateStoreSpecieDetail = ({ specie }) => {
  const params = useParams()
  const { specieId } = params;
  const { dispatch, user, store, token } = useAuthContext();
  const { dispatch: dispatchPageState } = usePageStateContext();
  const [basicError, setBasicError] = useState("");
  // const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false); // is form in disabled state

  const {
    // isLoading,
    isError,
    error,
    mutate: handleSpecieDescMutate,
    data,
  } = useMutation({
    onError: (err) => console.log("mutation error", err),
    mutationFn: async (body) => {
      console.log('body', body)
      // debugger
      try {
        console.log('SET LOADING')
        dispatchPageState({ type: 'UPDATE_SECTION_STATE', payload: { section: 'description', isLoading: true }})
        const url = getServerDomain() + `/storeSpecie/${specieId}`;
        const res = await fetch(url, {
          method: "PUT",
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
        const specie = await res.json();
        console.log("SET UNLOADING")
        dispatchPageState({ type: 'UPDATE_SECTION_STATE', payload: { section: 'description', isDisabled: true, isLoading: false }})
        // router.push(`/${store.storePath}/inventory/${storeSpecie.id}`)
        return specie;
      } catch (e) {
        dispatchPageState({ type: 'UPDATE_SECTION_STATE', payload: { section: 'description', isDisabled: true, isLoading: false }});
        console.log(e);
      }
    },
  });

  const heading = "Let's create a listing";

  return (
    <section>
      <Alert error={basicError} />
      <SpecieDetailForm
        onSubmit={handleSpecieDescMutate}
        // isLoading={isLoading}
        initialValues={{ region: "MALAWI" }}
        setBasicError={setBasicError}
        specie={specie}
      />
    </section>
  );
};

export default CreateStoreSpecieDetail;
