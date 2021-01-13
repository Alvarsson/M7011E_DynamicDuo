import React, { useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";

import LabelledSlider from "./LabelledSlider";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/esm/Card";
import { CURRENTUSER, API_BASE_URL } from "../../../constants/apiConstants";

interface Props {
  initialValueA: number;
}

const Distribution: React.FC<Props> = ({ initialValueA }) => {
  const [valA, setValA] = useState(initialValueA);

  function handleA(value: number) {
    //kanske kan plocka in id här och meka.. vem vet. inte såhär dock...
    console.log(Math.round(value));
    setValA(Math.round(value));
    return null;
  }

  
  function postDistribution_Over() {
    return axios.put(
      API_BASE_URL +
        "/managersettings/distribution",
      {
        distribution: {
          sell: (100 - valA) / 100,
          store: valA / 100,
        },
      }
    );
  }


  return (
    <Container className="p-3">
      <Card style={{ width: "50vw" }} bg="light">
        <Card.Body>
          <Card.Title>For over-production:</Card.Title>

          <LabelledSlider
            labelLeft={"Sell"}
            labelRight={"Store"}
            defaultValue={valA}
            callback={handleA}
          />
          

          <Button onClick={postDistribution_Over}> Save </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Distribution;
