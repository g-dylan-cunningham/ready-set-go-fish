import React from "react";
import Update from "./update";
import Create from "./create";

const UpdateCreateSwitch = ({
  myStores,
  traverse,
}) => {
  console.log('switch')
  // if (myStores.length < 1) {
  return <Create myStores={myStores} traverse={traverse} />;
  // }
  // return (
  //   <Update
  //     myStores={myStores}
  //     traverse={traverse}
  //   />
  // );
};

export default UpdateCreateSwitch;