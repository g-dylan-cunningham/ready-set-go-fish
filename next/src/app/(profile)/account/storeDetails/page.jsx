"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import Alert from "@/app/components/forms/Alert";
import { Main } from "@/app/components";
import useAuthContext from "@/app/hooks/useAuthContext";
import { getMyStores } from "./api";
import Preferences from "./preferences";
import Description from "./description";
import BasicForm from "./basic";
import ContactForm from "./contact";
import { StepContextProvider } from "./contexts/stepContext";
import useStepContext from "./contexts/useStepContext";

const StoreDetailsContext = () => {
  return (
    <StepContextProvider>
      <StoreDetails />
    </StepContextProvider>
  );
};

const StoreDetails = () => {
  const { dispatch, user, token, store } = useAuthContext();
  const { dispatch: stepDispatch, steps, currentIdx } = useStepContext();
  // console.log('steps',steps)

  // const [isDisabled, setIsDisabled] = useState({
  //   // REVIEW do we want to auto disable at all?
  //   minimum: false,
  //   contact: false,
  //   description: false,
  //   preferences: false,
  // });
  // const router = useRouter();
  const noStoresConfigured = "You have no stores configured";

  // const setDisabled = useCallback(
  //   (store, bool) => {
  //     const state = { ...isDisabled };
  //     state[store] = bool;
  //     setIsDisabled(state);
  //   },
  //   [isDisabled]
  // );

  const updateCurrentStep = (delta) => {
    stepDispatch({ type: "SET_STEP", payload: { value: delta } });
  };

  // const accessDenied = !token;
  // if (accessDenied) {
  //   redirect('/login')
  // }

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["myStores", token],
    queryFn: getMyStores,
    enabled: !!token,
  });

  const myStores = data?.stores || [];

  const traverse = useCallback(
    (stepValue, isRefetch) => {
      if (stepValue > 0 && currentIdx < steps.length) {
        updateCurrentStep(1);
      }
      if (stepValue < 0 && currentIdx > 0) {
        updateCurrentStep(-1);
      }
      if (isRefetch) {
        refetch();
      }
    },
    [currentIdx]
  );

  const PrevButton = () => {
    return (
      <button
        type="button"
        onClick={() => traverse(-1, true)}
        className="btn btn-ghost float-left"
      >
        BACK
      </button>
    );
  };
  if (isLoading) {
    return <div>comp loading</div>;
  }
  if (error) return "An error has occurred: " + error.message;

  const heading = "Your Store Details:";

  return (
    <Main>
      <h1 className="text-2xl font-bold capitalize">{heading}</h1>

      <Alert error={error} />
      <ul className="steps">
        {steps.map((step, i) => (
          <li
            className={`step ${i <= currentIdx && "step-primary"}`}
            data-content={(i < currentIdx && "✓") || i + 1}
            key={step.title}
          >
            {step.title}
          </li>
        ))}
      </ul>

      {currentIdx === 0 && (
        <BasicForm
          myStores={myStores}
          traverse={traverse}
        />
      )}
      {currentIdx === 1 && (
        <ContactForm myStores={myStores} traverse={traverse}>
          <PrevButton />
        </ContactForm>
      )}
      {currentIdx === 2 && (
        <Description myStores={myStores} traverse={traverse}>
          <PrevButton />
        </Description>
      )}
      {currentIdx === 3 && (
        <Preferences myStores={myStores} traverse={traverse}>
          <PrevButton />
        </Preferences>
      )}
    </Main>
  );
};

export default StoreDetailsContext;
