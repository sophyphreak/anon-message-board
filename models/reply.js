const mongoose = require('mongoose');
const moment = require('moment');

const Reply = mongoose.model('Reply', {
  text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: moment()
  },
  delete_password: {
    type: String,
    default: 'iamthepassword'
  },
  reported: {
    type: Boolean,
    default: false
  }
});

module.exports = {
  Reply
};
