import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/app/signin">Sign in</Link></li>
            <li><Link to="/app/signup">Sign up</Link></li>
          </ul>
          <div>
            <Route path="/app/signin"
          </div>
        </div>
      </Router>
    );
  }
}

const container = document.getElementById('root');

render(
  <App />,
  container
);
