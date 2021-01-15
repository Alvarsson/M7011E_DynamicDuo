import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";

import Distribution from "./components/DistributionComponent/Distribution";
import { ACCESS_TOKEN_NAME, API_BASE_URL, CURRENTUSER } from './constants/apiConstants';

import axios from "axios";
import DashSimple from "./components/logsComponent/DashSimple";
import Row from "react-bootstrap/Row";

const ProsumerSettings: React.FC = () => {
  const [valA, setValA] = useState(1);
  const [valB, setValB] = useState(1);
  const [isLoaded, setLoaded] = useState(false);
  const [img_url, setImgUrl] = useState("");
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Run! Like go get some data from an API.
    fetchShit();
  }, []);

  //TODO: nu vill jag bara fetcha data när vi öppnar sidan och sen spara de värdena som defaults

  const fetchShit = () => {
    //TODO: skaffa wrapper runt getlocalStorage
    axios 
      .get(API_BASE_URL + "/prosumersettings/" + localStorage.getItem(CURRENTUSER), {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        const valA = data.distribution.sell * 100;
        const valB = data.distribution.buy * 100;

        setValA(100 - valA);
        setValB(100 - valB);
        setImgUrl(data.img_url)
        setLoaded(true);
        setSettings(data);
      });
  };

  return (
    <Container className="p-3">
      <Row>
        <DashSimple img_url={img_url} settingsData={settings} />
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

export default ProsumerSettings;
