import React, { useRef, useState } from "react";

import Container from "react-bootstrap/Container";

import MySlider from "./slider";

import Button from "react-bootstrap/Button";

import axios from "axios";

interface Props {}

const Distribution: React.FC<Props> = () => {
  const [valA, setValA] = useState(50);

  const [valB, setValB] = useState(50);

  function handleA(value: number) {
    //kanske kan plocka in id här och meka.. vem vet. inte såhär dock...
    setValA(value);
    return null;
  }

  function handleB(value: number) {
    //kanske kan plocka in id här och meka.. vem vet. inte såhär dock...
    setValB(value);
    return null;
  }

  function fetchData() {
    console.log("val " + valA);
    console.log("val " + valB);

    return axios
      .get("http://localhost:3001/prosumersettings/lisa2")
      .then((response) => console.log(response));
  }

  function postChanges() {
    postDistribution_Over();
    postDistribution_under(); //testar bara att de funkar. kanske ska göras till async/await eller göras om helt

    fetchData();
  }

  function postDistribution_Over() {
    console.log("sell " + (1 - valA / 100));

    return axios
      .put("http://localhost:3001/prosumersettings/lisa2/distr_over", {
        distribution: {
          sell: 0.1, //1 - valA / 100,
          store: 0.55, //valA / 100,}
        },
      })
      .then((response) => console.log(response));
  }

  function postDistribution_under() {
    console.log("buy " + (1 - valB / 100));

    return axios
      .put("http://localhost:3001/prosumersettings/lisa2/distr_under", {
        distribution: {
          buy: 0.6, //1 - valB / 100,
          drain: 0.7, //valB/ 100,
        },
      })
      .then((response) => console.log(response));
  }

  return (
    <Container className="p-3">
      <MySlider
        labelLeft={"sell"}
        labelRight={"store"}
        defaultValue={valA}
        funn={handleA}
      />

      <MySlider
        labelLeft={"buy"}
        labelRight={"drain"}
        defaultValue={valB}
        funn={handleB}
      />

      <p>{""}</p>

      <Button onClick={postChanges}> Fetch that shit </Button>
    </Container>
  );
};

export default Distribution;
