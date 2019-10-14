// SERVER
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// -------------------------------------------------
const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost/spreads';
const dbOptions = {
  promiseLibrary: require('bluebird'),
};

const db = mongoose.createConnection(dbUri, dbOptions);

const User = require('./models/user')(db);

// -------------------------------------------------
//Seed
const seed = () => {
  // User.find({}).remove().then(() => {
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
      // console.log(`MONGODB SEED: ${users.length} Users created.`);
      console.log(`MONGODB SEED: ${users_.length} Users created.`);
    });
};
db.on('open', () => {
  seed();
});

// -------------------------------------------------

// -------------------------------------------------

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./auth.js');

app.use(passport.initialize());

passport.use(
  new LocalStrategy({
    usernameField: 'email'
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
  })
);

app.post('/auth/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log('auth/login', req.user);
    const access_token = auth.sign(user);
    res.json({ access_token });
  }
);


const isAuthenticated = auth.isAuthenticated(User);

// -------------------------------------------------
// Basic routes
app.get('/', function(req, res) {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

app.get('/protected', auth.isAuthenticated(User), function(req, res) {
  res.send('Authenticated!');
});

<<<<<<< HEAD

app.use('/api', require('./api')(isAuthenticated));
=======
// app.use('/api', require('./api')(db, isAuthenticated));


// -------------------------------------------------

// seed();
>>>>>>> parent of 79be0d5a... Continue work on authentication

// -------------------------------------------------

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

// -------------------------------------------------


app.listen(3000);
