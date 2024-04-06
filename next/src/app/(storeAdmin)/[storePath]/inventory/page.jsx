"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import Alert from "@/app/components/forms/Alert";
import { Main, ItemLink } from "@/app/components";
import useAuthContext from "@/app/hooks/useAuthContext";
import { getMyInventory } from "../api";

const StoreDetails = () => {
  const { dispatch, user, token, store } = useAuthContext();

  const {
    data: speciesArr,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myInventory", token],
    queryFn: getMyInventory,
    enabled: !!token,
  });

  if (isLoading || !speciesArr) {
    return <div>comp loading</div>;
  }
  if (error) return "An error has occurred: " + error.message;

  const heading = "Your Store Species:";

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>

      <ul className="list-none">
        {speciesArr.map((specie) => {
          return (
            <li key={specie.id} className="py-2">
              <ItemLink
                href={`/${store.storePath}/inventory/${specie.id}`}
                value={specie.commonName}
              />
            </li>
          );
        })}
      </ul>
      <Link href={`/${store.storePath}/inventory/addSpecie`} className="link link-primary">Add Species</Link>
    </Main>
  );
};

export default StoreDetails;
