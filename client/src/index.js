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

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>User Profile</h2>
      </div>
    );
  }
}

class SignupForm extends Component {
  render() {
    const {
      state: {
        name,
        email,
        password,
      },
      onNameUpdate,
      onEmailUpdate,
      onPasswordUpdate,
    } = this.props;

    return (
        <div>
          <h2>Sign up form</h2>

          <div>
            <input
              type="text"
              onChange={ e => onNameUpdate(e.target.value) }
              value={ name }
              placeholder="Your name" />
          </div>
          <div>
            <input
            type="email"
            onChange={ e => onEmailUpdate(e.target.value) }
            value={ email }
            placeholder="Your email" />
          </div>
          <div>
            <input
            type="password"
            onChange={ e => onPasswordUpdate(e.target.value) }
            value={ password }
            placeholder="Your password" />
          </div>
          <div>
            <button type="button">Continue</button>
          </div>
        </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      signUpForm: {
        name: '',
        email: '',
        password: '',
      },
    }
  }

  onNameUpdate(name) {
    const { signUpForm } = this.state;

    const updatedForm = Object.assign({}, signUpForm, { name });

    this.setState({
      signUpForm: updatedForm,
    });
  }

  onEmailUpdate(email){
    const { signUpForm } = this.state;

    const updatedForm = Object.assign({}, signUpForm, { email });

    this.setState({
      signUpForm: updatedForm,
    });
  }

  onPasswordUpdate(password){
    const { signUpForm } = this.state;

    const updatedForm = Object.assign({}, signUpForm, { password });

    this.setState({
      signUpForm: updatedForm,
    });
  }

  render() {
    const { currentUser, signUpForm } = this.state;

    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/app/signin">Sign in</Link></li>
            <li><Link to="/app/signup">Sign up</Link></li>
          </ul>
          <div>
            <Route path="/app/signup" render={ () => (
              <SignupForm
                state={ signUpForm }
                onNameUpdate={ this.onNameUpdate.bind(this)}
                onEmailUpdate={ this.onEmailUpdate.bind(this)}
                onPasswordUpdate={ this.onPasswordUpdate.bind(this)}
                />
            )} />
            <Route path="/app/signin" component={ SigninForm } />
            <Route path="/app/user/profile" render={ () => (
              <UserProfile user={ currentUser } />
            )} />
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
