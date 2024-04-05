"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import Alert from "@/app/components/forms/Alert";
import { Main, ItemLink } from "@/app/components";
import useAuthContext from "@/app/hooks/useAuthContext";
import { getSpecie } from "../../api";


const BaseData = ({ data = {} }) => {
  return (
    <>
    <h3>Default Species Info:</h3>
      { data.commonName}
      
    </>
  )
}

const StoreDetails = ({params }) => {
  const { specieId } = params;
  const { dispatch, user, token, store } = useAuthContext();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["myInventory", specieId, token],
    queryFn: getSpecie,
    enabled: !!token,
  });
  if (isLoading || !data) {
    return <div>comp loading</div>;
  }
  if (error) return "An error has occurred: " + error.message;

  const heading = "Your Store Specie Detail:";

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      { data.storeSpecie.commonName}
      { data.baseSpecie.commonName}
      <BaseData data={data.baseData} />
      
    </Main>
  );
};

export default StoreDetails;
