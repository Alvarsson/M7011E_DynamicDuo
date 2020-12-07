import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Slider, { createSliderWithTooltip } from "rc-slider";
//man kan använda tooltips för att visa i slider vad du har för värden. kanske är snyggt?

import "rc-slider/assets/index.css";

interface Props {
  labelLeft: string;
  labelRight: string;
  defaultValue: number;
  callback: (val: number) => null;
}

const LabelledSlider: React.FC<Props> = ({
  labelLeft = "left",
  labelRight = "right",
  defaultValue= 55,
  callback,
}) => {
  const [value, setValue] = useState(defaultValue);

  function log1(newValue: number) {
    setValue(newValue); //store the value in current state
    callback(newValue); //callback to parent

    return null;
  }

  return (
    <Container className="p-3">
      <Row>
        <Col>
          {" "}
          {labelLeft + "/" + labelRight+":"} {100 - value + "/" + value}
        </Col>
        <Col>
          <Slider onChange={log1} defaultValue={defaultValue} step={1} max={100} min={0} />
        </Col>
      </Row>
    </Container>
  );
};

export default LabelledSlider;
