const mongoose = require('mongoose');

var petSchema = mongoose.Schema({
  pet: {
    pet_id: {
      type: String,
      required: true,
      unique: true
    },
    pet_name: {
      type: String,
      required: true
    },
    pet_dob: Date,
    pet_gender: String,
    pet_species: String,
    pet_ras: String,
    pet_avatar: String,
    pet_owner: String,
    pet_tag_id: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pets', petSchema);