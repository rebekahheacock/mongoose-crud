// jshint node: true
'use strict';

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    given: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    }
  },
  dob: {
    type: Date,
    required: true,
    match: /\d{4}-\d{2}-\d{2}/
  },
  gender: {
    type: String,
    enum: {
      values: ['f', 'm', 'n', 'o']
    },
    default: 'o'
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;