//@ts-ignore

import React from "react";

export default function LabelCollection(props) {
  return (
    <div>
      <p>Status: {props.broken_turbine}</p>
      <p>Battery: {props.battery_level}</p>
    </div>
  ); ///*<Tooltip />*/
}
