// jshint esversion: 6
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require('mongoose');
const dbUri = 'mongodb://localhost/spreads';
const dbOptions = {
  //useMongoClient: true,
  promiseLibrary: require('bluebird'),
};
const db = mongoose.createConnection(dbUri, dbOptions);

const User = require('./models/user')(db);
//----------------------------------
//Seed
const seed = () => {
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
      console.log('MONGODB SEED: ${users_.length} Users created.');
    });
};
db.on('open', () => {
  seed();
});
//----------------------------------

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./auth.js');

app.use(passport.initialize());

passport.use(
  new LocalStrategy({
    userNameField: 'email',
  },
  function(email, password, done) {
    User.findOne({ email }, function (err, user) {
      console.log('User is: ', user);
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
//----------------------------------
// Basic routes
app.get('/', function(req, res) {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

app.get('/protected', isAuthenticated, function(req, res) {
    res.send('Authenticated!');
});

const router = express.Router();

app.use('/api', require('./api')(isAuthenticated));

//----------------------------------

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    'error': {
      message:err.message,
      error: err
    }
  });
  next();
});

app.listen(3000);

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne({ email }, function(err, user) {
    done(err, user);
  });
});

const UserSchema = new Schema ({

});

UserSchema.methods = {
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
};

module.exports = db => db.model('User', UserSchema);

// const User = mongoose.model('User', UserSchema);


app.use((req, res, next) => {

const isAuthenticated = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.email) {
    next();
  } else {
    next(403);
  }
};

const sendUnauthorized = (req, res) => {
  res.status(401).json({ message: 'Unauthorized' });
};

//----------------------------------

// seed();

http.listen(3000);
