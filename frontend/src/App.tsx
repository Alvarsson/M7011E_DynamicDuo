import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import Distribution from "./components/Distribution";

import axios from "axios";
import DashSimple from "./components/DashSimple";
import Row from "react-bootstrap/Row";

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
      .then(({ data }) => {
        console.log(data);
        const valA = data.distribution.sell;
        const valB = data.distribution.buy;

        setValA(100 - valA);
        setValB(100 - valB);
        setLoaded(true);
      });
  };

  return (
    <Container className="p-3">

      <Row>
        <DashSimple />
      </Row>

      <Row>
      
        {isLoaded ? (
          <Distribution initialValueA={valA} initialValueB={valB} />
        ) : (
          <p> waiting </p>
        )}
      </Row>
    </Container>
  );
};

export default App;
