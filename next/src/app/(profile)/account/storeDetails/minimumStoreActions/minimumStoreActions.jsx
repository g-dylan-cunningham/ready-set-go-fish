import React from "react";
import Update from "./update";
import Create from "./create";

const MinimumStoreActions = ({ myStores, disabled, setDisabled }) => {
  if (myStores.length < 1) {
    return <Create myStores={myStores} />;
  }
  return (
    <Update myStores={myStores} disabled={disabled} setDisabled={setDisabled} />
  );
};

export default MinimumStoreActions;
