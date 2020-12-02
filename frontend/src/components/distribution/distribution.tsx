import React, { FC, useState, useCallback } from "react";
import Container from 'react-bootstrap/Container';

import Slider from './slider';

const Distributions: FC<{}> = (): JSX.Element => {
  const [count, setCount] = useState(0);
  
  return (
    <Container>
      <h1>Distribution</h1>
      <Slider/>
      
    </Container>
  );
};
export default Distributions;
