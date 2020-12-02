import React from 'react';

import Distributions from './components/distribution/distribution'
import Container from 'react-bootstrap/Container';


const App: React.FC = () => {
  return (
    <Container className="p-3">
      <Distributions /> 
    </Container>
    
  );
};

export default App;


