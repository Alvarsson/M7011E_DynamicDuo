//@ts-ignore

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";
import Card from "react-bootstrap/Card";

export default function MultiLineGraph(props) {
  return (
    <Card style={{ width: "30vw" }} bg="light">
      <Card.Body>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={props.display}
            margin={{ top: 3, right: 5, left: -20, bottom: 3 }}
          >
            <XAxis dataKey="tick" tick={false} />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" />
            <Line
              type="monotone"
              dataKey="consumption"
              isAnimationActive={false}
              stroke="#228B22"
            />
           <Line
              type="monotone"
              dataKey="production"
              isAnimationActive={false}
              stroke="#FF8C00"
            />
          </LineChart>
        </ResponsiveContainer>

        <Card.Title>
          {props.dataType}: {props.current}
        </Card.Title>
      </Card.Body>
    </Card>
  ); ///*<Tooltip />*/
}
