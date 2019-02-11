import React, { Component } from 'react';
import Store from './components/Store';
let items = require('./items');

class App extends Component {
  render() {
    return (
      <Store items={[...items]} />
    );
  }
}

export default App;
