const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  user: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstname: String,
    lastname: String,
    usermail: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    country: String,
    city: String,
    user_avatar: String,
    user_pets_id: [String],
    user_posts_id: [String]
  }
}, {
  timestamps: true
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.user.password);
};
module.exports = mongoose.model('Users', userSchema);