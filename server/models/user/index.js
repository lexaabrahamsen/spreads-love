/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const createHash = crypto.createHash;

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
