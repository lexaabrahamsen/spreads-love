/*jshint esversion: 6 */
// const express = require('express');
// const app = express();

//----------------------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./models/user');

const crypto = require('crypto');
const createHash = crypto.createHash;

// mongoose.connect('mongodb://localhost/spreads');

const seed = () => {
  User.find({}).remove().then(() => {
    const users = [{
      email: 'alice@example.com',
      displayName: 'Alice',
      password: '123123',
    },{
      email: 'bob@example.com',
      displayName: 'Bob',
      password: '321321',
    }];

    User.create({
      email: 'bob@example.com',
      displayName: 'Bob',
      password: '321321',
    }).then(( => {
      console.log('Created!');
    }, err => {
      console.log('Not created :(', err);
    });
    //
    //   console.log('ERROR:' + err);
    //   console.log('MONGODB SEED: ${users_.length} Users created.');
    // });
  })
};

//----------------------------------

app.get('/', function(req, res) {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

seed();

app.listen(3000);
