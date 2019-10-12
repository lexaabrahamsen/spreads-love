// SERVER
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());



// -------------------------------------------------
const mongoose = require('mongoose');
const crypto = require('crypto');
const createHash = crypto.createHash;

mongoose.connect('mongodb://localhost/spreads', { useNewUrlParser: true });

const User = require('./models/user');


const seed = () => {
  User.find({}).remove().then(() => {
    const users = [{
      email: 'alice@example.com',
      displayName: 'Alice',
      password: '123123',
    }, {
      email: 'bob@example.com',
      displayName: 'Bob',
      password: '321321',
    }];

    User.create(users, (err, users_) => {
      console.log(`MONGODB SEED: ${users.length} Users created.`);
      // console.log(`MONGODB SEED: ${users_.length} Users created.`);

    });
  });
};

// -------------------------------------------------

app.get('/', function(req, res) {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

// -------------------------------------------------

jwt = require('express-jwt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne({ email }, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  session: false
  },
  function(email, password, done) {
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error('Auth error: ' + err);
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    console.log('Looking for a user...');
  }
));

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log(user);
    res.json(user);
  })(req, res, next);
});

// -------------------------------------------------

seed();

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    'error': {
      message: err.message,
      error: err
    }
  });
  next();
});

app.listen(3000);
