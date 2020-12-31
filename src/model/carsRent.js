'use strict';

// imports
const mongoose         = require('../services/db/index');

const Schema = mongoose.Schema;

const carsRent = new Schema({
  clientId:  { type: String, required: true },
  carId:     { type: String, required: true },
  status:    { type: Number, default: 1 },
  createAt:  { type: Date, default: Date.now },
  updatedAt: { type: Date }
});


module.exports = mongoose.model('CarsRent', carsRent);