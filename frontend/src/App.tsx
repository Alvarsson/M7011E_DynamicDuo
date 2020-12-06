import React from 'react';

import Container from 'react-bootstrap/Container';

import Distribution from './components/Distribution'

import axios from 'axios';


const App: React.FC = () => {



  return (
    <Container className="p-3">
      <Distribution />
    </Container>
    
  );
};

export default App;


