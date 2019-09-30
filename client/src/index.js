import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return <div>Hello</div>;
  }
}
const container = document.getElementById('root');

render(
  <App />,
  container
);
