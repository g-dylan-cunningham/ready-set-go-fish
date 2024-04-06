"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import Alert from "@/app/components/forms/Alert";
import { Main, ItemLink } from "@/app/components";
import useAuthContext from "@/app/hooks/useAuthContext";
import { getSpecie } from "../../../api";
import SpecieDetailForm from './specieDetailForm';


const StoreDetails = ({params }) => {
  const { specieId } = params;
  const { dispatch, user, token, store } = useAuthContext();

  const { data: specie, isLoading, refetch, error } = useQuery({
    queryKey: ["myInventory", specieId, token],
    queryFn: getSpecie,
    enabled: !!token,
  });
  console.log('specie', specie, error)
  if (isLoading || !specie) {
    return <div>comp loading</div>;
  }
  if (error) return "An error has occurred: " + error.message;

  const heading = "Your Store Specie Detail:";

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      { specie?.storeSpecie?.commonName} / { specie?.baseSpecie?.scientificName}
      <SpecieDetailForm specie={specie?.storeSpecie}/>
    </Main>
  );
};

export default StoreDetails;
