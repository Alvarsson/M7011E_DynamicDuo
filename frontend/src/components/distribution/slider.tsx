import React, { FC, useState } from "react";
import Container from "react-bootstrap/Container";

const Slider: FC<{ initial?: number }> = ({ initial = 0 }) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);
  return (
    <>
      <p>Clicks: {clicks}</p>
      <input type="range" id="volume" min="0" max="11" className="custom-range"/>
      <label>Volume</label>
    </>
  );
};

export default Slider;
