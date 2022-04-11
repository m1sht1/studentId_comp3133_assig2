const mongoose = require('mongoose');
const Booking = new mongoose.Schema({
  listing_id: {
    type: String,
    required: true,
  },
  booking_id: {
    type: String,
    required: true,
    unique: [true]
  },
  booking_date: {
    type: String,
    required: true
  },
  booking_start: {
    type: String,
    required: true
  },
  booking_end: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Booking', Booking);


