import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return <div>Helloo</div>;
  }
}

const container = document.getElementById('root');

render(
  <App />,
  container
);
