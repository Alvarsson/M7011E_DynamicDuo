//@ts-ignore

import React from "react";

export default function ManagerOutput(props) {
  return (
    <pre>{JSON.stringify(props.data, null, 2)}</pre>
  ); 
}
