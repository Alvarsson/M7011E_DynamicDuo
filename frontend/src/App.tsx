import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import Distribution from "./components/Distribution";

import axios from "axios";
import DashSimple from "./components/DashSimple";
import Col from "react-bootstrap/esm/Col";

const App: React.FC = () => {
  const [valA, setValA] = useState(1);
  const [valB, setValB] = useState(1);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Run! Like go get some data from an API.
    fetchShit();
  }, []);

  //TODO: nu vill jag bara fetcha data när vi öppnar sidan och sen spara de värdena som defaults

  const fetchShit = () => {
    axios
      .get("http://localhost:3001/prosumersettings/lisa2")
      .then((response) => {
        const valA = response.data.distribution.sell;
        const valB = response.data.distribution.buy;

        setValA(100 - valA);
        setValB(100 - valB);
        setLoaded(true);

        console.log(valB);
      });
  };

  return (
    <Container className="p-3">
      <Col>
        <DashSimple />
      </Col>

      <Col>
      {isLoaded ? (
        <Distribution initialValueA={valA} initialValueB={valB} />
      ) : (
        <p> waiting </p>
      )}
      </Col>
    </Container>
  );
};

export default App;
