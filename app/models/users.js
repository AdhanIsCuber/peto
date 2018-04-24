const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  peter: {
    username: String,
    firstname: String,
    lastname: String,
    usermail: String,
    password: String
  }
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.user.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);