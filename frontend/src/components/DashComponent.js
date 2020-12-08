//@ts-ignore

import React from "react";
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";

export default function DashComponent(props) {
  return (
    <Container className="p-3">
      <Row class="text-center">

        <h3>{props.current}</h3>

      </Row>
      <Row>
        <LineChart
          width={300}
          height={200}
          data={props.display}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="tick" />
          <YAxis domain={[0,100]}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="value"
            isAnimationActive={false}
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </Row>
    </Container>
  );
}
