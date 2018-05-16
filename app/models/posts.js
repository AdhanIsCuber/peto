const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  post: {
    post_id: {
      type: String,
      required: true,
      unique: true
    },
    post_name: {
      type: String,
      required: true
    },
    post_dob: Date,
    post_gender: String,
    post_species: String,
    post_ras: String,
    post_avatar: String,
    post_owner: String,
    post_tag_id: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Posts', postSchema);