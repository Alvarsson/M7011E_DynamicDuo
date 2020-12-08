//@ts-ignore

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Card from "react-bootstrap/Card";

export default function DashComponent(props) {
  return (
   <Card style={{ width: '30vw' }} bg="light">
      <Card.Body>
        
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={props.display}
              margin={{ top: 3, right: 5, left: -20, bottom: 3 }}
            >
              <XAxis dataKey="tick" />
              <YAxis  />

              <CartesianGrid stroke="#eee"  />
              <Line
                type="monotone"
                dataKey="value"
                animationDuration={300}
                stroke={props.strokeColor}
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
