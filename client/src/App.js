import React, { Component } from 'react';
import FetchAuthentication from './components/FetchAuthentication';
import FetchHot from './components/FetchHot';
import FetchRising from './components/FetchRising';
import FetchSearch from './components/FetchSearch';
import FetchNew from './components/FetchNew';

import { Button } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FetchAuthentication />
        <FetchHot />
        <FetchRising />
        <FetchNew />
        <FetchSearch />
        <Button>Reactstrap Button Here</Button>
      </div>
    );
  }
}

export default App;
