const mongoose = require('mongoose');
const Listing = new mongoose.Schema({
    listing_id: {
    type: String,
    unique: [true],
    required: true
    
  },
  listing_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: [true]
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email !!!"],
    trim: true,
    validate: function(value) {
      var emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailValidation.test(value);
    }
  },
});
module.exports = mongoose.model('Listing', Listing);


