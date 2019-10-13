// SERVER/MODEL/users_
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const createHash = crypto.createHash;


const UserSchema = new Schema({
  email: String,
  displayName: String,
  hashedPassword: String,
  salt: String,
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  authenticate: function(plainText) {
    return this.encryptoPassword(plainText) === this.hashedPassword;
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
};

module.exports = db => db.model('User', UserSchema);

// const User = mongoose.model('User', UserSchema);
// -------------------------------------------------
// module.exports = User;
