import React from "react";
import Update from "./update";
import Create from "./create";

const UpdateCreateSwitch = ({ myStores, traverse, children }) => {
  if (!myStores[0]?.description1) {
    // REVIEW - may not be sufficent check
    return <Create myStores={myStores} traverse={traverse}>{children}</Create>;
  }
  return <Update myStores={myStores} traverse={traverse}>{children}</Update>;
};

export default UpdateCreateSwitch;