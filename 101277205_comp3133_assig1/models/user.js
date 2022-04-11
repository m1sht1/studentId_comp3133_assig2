const mongoose = require('mongoose');
const User = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'User Name Required'],
  },
  firstname: {
    type: String,
    required: [true, 'First Name Required']
  },
  lastname: {
    type: String,
    required: [true, 'Last Name Required']
  },
  password: {
    type: String,
    required: [true,'Password Required'],
    minlength:6,
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
  type: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('User', User);


