// jshint node: true
'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  loc: {
    type: [Number],
    index: '2d',
    validate: {
      validator: function(v) {
        if (v[0] < -90 || v[0] > 90) {
          return false;
        } else if (v[1] < -180 || v[1] > 180) {
          return false;
        } else {
          return true;
        }
      },
      message: 'Please enter a valid latitude and longitude.'
    },

  },
  country: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

placeSchema.virtual('isNorthernHemisphere').get(function() {
  return this.loc[0] > 0;
});

placeSchema.virtual('isWesternHemisphere').get(function() {
  return this.loc[1] < 0;
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;