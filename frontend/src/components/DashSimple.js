import axios from "axios";
import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

export default function DashSimple() {
  const [data, setData] = useState("");

  const fetchData = () => {
    const url = "http://localhost:3001/prosumerlog/lisa2/getlatest";

    return axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
        return JSON.stringify(data, null, 2);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData().then((res) => {
        setData(res);
      });

    const interval = setInterval(() => {
        fetchData().then((res) => {
            setData(res);
          });
    }, 10000);

    return () => clearInterval(interval);

   
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const a = axiosTest();
  //       console.log(a);

  //       changeCounter((prevCounter) => a);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <Container className="p-3">
      <pre>{data} </pre>
    </Container>
  );
}
