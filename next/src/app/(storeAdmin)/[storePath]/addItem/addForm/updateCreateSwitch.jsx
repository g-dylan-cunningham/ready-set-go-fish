import React from "react";
// import Update from "./update";
import Create from "./create";

const UpdateCreateSwitch = ({ myStores, disabled, setDisabled, traverse }) => {
  // if (myStores.length < 1) {
  //   return <Create myStores={myStores} traverse={traverse} />;
  // }
  return (
    <Create
      // myStores={myStores}
      // disabled={disabled}
      // setDisabled={setDisabled}
      // traverse={traverse}
    />
  );
};

export default UpdateCreateSwitch;
