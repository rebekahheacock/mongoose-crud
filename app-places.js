// jshint node: true
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose-crud');
const db = mongoose.connection;

const Place = require('./models/place.js');

const done = function() {
  db.close();
};

// CRUD Actions
const create = function(name, latitude, longitude, country) {
  Place.create({
    name: name,
    loc: [latitude, longitude],
    country: country
  })
  .then(console.log)
  .catch(console.error)
  .then(done);
};

const index = function() {
  let search = {};
  if (arguments[0] && arguments[1]) {
    let field = arguments[0];
    let criterion = arguments[1];
    search[field] = criterion;
  }
  Place.find(search)
  .then((places) => {
    places.forEach((place) => {
      console.log(place);
    });
  })
  .catch(console.error)
  .then(done);
};

const show = function(id) {
  Place.findById(id)
  .then(console.log)
  .catch(console.error)
  .then(done);
};

const update = function(id, field, value) {
  Place.findById(id)
  .then((place) => {
    if (field === 'latitude') {
      place.loc[0] = value;
    } else if (field === 'longitude') {
      place.loc[1] = value;
    } else {
      place[field] = value;
    }
    return place.save();
  })
  .then(console.log)
  .catch(console.error)
  .then(done);
};

const destroy = function(id) {
  Place.findById(id)
  .then((place) => {
    return place.remove();
  })
  .catch(console.error)
  .then(done);
};

// UI
db.once('open', function() {
  let command = process.argv[2];

  // Using more than once, avoiding jshint complaints
  let field;
  let id;

  switch (command) {
    case 'create':
      let name = process.argv[3];
      let latitude = process.argv[4];
      let longitude =  process.argv[5];
      let country =  process.argv[6];
      if (true || name) {
        create(name, latitude, longitude, country);
      } else {
        console.log('usage create <name> <latitutde> <longitude> [country]');
        done();
      }
      break;

    case `show`:
      id = process.argv[3];
      show(id);
      break;

    case 'update':
      id = process.argv[3];
      field = process.argv[4];
      let value = process.argv[5];
      update(id, field, value);
      break;

    case 'destroy':
      id = process.argv[3];
      destroy(id);
      break;

    case 'search':
      field = process.argv[3];
      let criterion = process.argv[4];
      if(!criterion) {
        console.log('usage: search <field> <criterion>');
        done();
      } else {
        index(field, criterion);
      }
      break;

    default:
      index();
      break;
  }

});
