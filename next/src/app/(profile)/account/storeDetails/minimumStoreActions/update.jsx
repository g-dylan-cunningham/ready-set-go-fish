import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getServerDomain } from "@/app/utils";
import useAuthContext from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import StoreMinimumForm from "./form";
import Alert from "@/app/components/forms/Alert";

const MinimumStoreActions = ({ myStores, disabled, setDisabled }) => {
  const { dispatch, user, token } = useAuthContext();
  const router = useRouter();

  const initialValues = {
    storeName: myStores[0]?.storeName,
    email: myStores[0]?.email,
    locationPostal: myStores[0]?.locationPostal,
  };
  const {
    error,
    mutate: handleEdit,
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
        // router.push(`/`);
        setDisabled(true)
        return await res.json();
      } catch (e) {
        console.log(e)
        return null;
      }

    },
  });

  return (
    <div>
      upDATE
      <Alert error={error} />
      <StoreMinimumForm
        onSubmit={handleEdit}
        error={error}
        isLoading={!myStores}
        initialValues={initialValues}
        disabled={disabled}
      />
      {disabled && ( // enables form for updating
        <div className="mt-5 flex flex-row justify-end">
          <button
            type="button"
            onClick={() => setDisabled(false)}
            className="btn btn-ghost"
            >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default MinimumStoreActions;