const mongoose = require('mongoose');
const moment = require('moment');

const Thread = mongoose.model('Thread', {
  text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: moment()
  },
  bumped_on: {
    type: Date,
    default: moment()
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password: {
    type: String,
    required: true
  },
  replies: {
    type: Array,
    default: []
  },
  board: {
    type: String,
    required: true
  }
});

module.exports = {
  Thread
};
