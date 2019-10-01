import React, { Component } from 'react';
import { render } from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class SigninForm extends Component {
  render() {
    return (
      <h2>Sign in form</h2>
    );
  }
}

class SignupForm extends Component {
  render() {
    return (
      <h2>Sign up form</h2>
    );
  }
}

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
            <Route path="/app/signup" component={ SignupForm } />
            <Route path="/app/signin" component={ SigninForm } />
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
