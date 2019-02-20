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
    required: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  thread_id: {
    type: String,
    required: true
  }
});

module.exports = {
  Reply
};
