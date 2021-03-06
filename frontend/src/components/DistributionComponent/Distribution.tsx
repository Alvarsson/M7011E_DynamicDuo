import React, { useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";

import LabelledSlider from "./LabelledSlider";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/esm/Card";
import {CURRENTUSER,API_BASE_URL} from '../../constants/apiConstants';

interface Props {
  initialValueA: number;
  initialValueB: number;
}



const Distribution: React.FC<Props> = ({ initialValueA, initialValueB }) => {
  const [valA, setValA] = useState(initialValueA);

  const [valB, setValB] = useState(initialValueB);

  function handleA(value: number) {
    //kanske kan plocka in id här och meka.. vem vet. inte såhär dock...
    console.log(Math.round(value));
    setValA(Math.round(value));
    return null;
  }

  function handleB(value: number) {
    //kanske kan plocka in id här och meka.. vem vet. inte såhär dock...
    setValB(Math.round(value));
    return null;
  }

  function postChanges() {
    postDistribution_Over();
    postDistribution_under(); //testar bara att de funkar. kanske ska göras till async/await eller göras om helt
  }

  function postDistribution_Over() {

    return axios.put(
      API_BASE_URL + "/prosumersettings/" + localStorage.getItem(CURRENTUSER)+"/distr_over",
      {
        distribution: {
          sell: (100 - valA) / 100,
          store: valA / 100,
        },
      },
      
    );
  }

  function postDistribution_under() {
    return axios
      .put(
        API_BASE_URL + "/prosumersettings/" + localStorage.getItem(CURRENTUSER)+"/distr_under",
        {
          distribution: {
            buy: (100 - valB) / 100,
            drain: valB / 100,
          },
        },
        
      )
      .then((response) => console.log(response));
  }

  return (
    <Container className="p-3">
      <Card  bg="light">
        <Card.Body>
          <Card.Title>{"For over-production:"}</Card.Title>

          <LabelledSlider
            labelLeft={"Sell"}
            labelRight={"Store"}
            defaultValue={valA}
            callback={handleA}
          />
          <h4>{"For under-production:"}</h4>
          <LabelledSlider
            labelLeft={"Buy"}
            labelRight={"Drain"}
            defaultValue={valB}
            callback={handleB}
          />

          <Button onClick={postChanges}> Save </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Distribution;
