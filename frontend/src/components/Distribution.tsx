import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import LabelledSlider from "./LabelledSlider";

import Button from "react-bootstrap/Button";

import axios from "axios";

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
    return axios
      .put("http://localhost:3001/prosumersettings/lisa2/distr_over", {
        distribution: {
          sell: 100 - valA,
          store: valA,
        },
      });
  }

  function postDistribution_under() {
    return axios
      .put("http://localhost:3001/prosumersettings/lisa2/distr_under", {
        distribution: {
          buy: 100 - valB,
          drain: valB,
        },
      });
  }

  return (
    <Container className="p-3">
      <h4>{"For over-production:"}</h4>
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
    </Container>
  );
};

export default Distribution;
