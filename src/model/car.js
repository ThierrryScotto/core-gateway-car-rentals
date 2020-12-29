'use strict';

// imports
const mongoose         = require('../service/db/index');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  model:           { type: String, required: true },
  totalKilometers: { type: String, required: true },
  year:            { type: String, required: true },
  dailyValue:      { type: Number, required: true },
  airConditioning: { type: Boolean, required: true },
  clutch:          { type: String, required: true },
  doors:           { type: Number, required: true },
  seats:           { type: Number, required: true },
  status:          { type: Number, default: 1 },
  createAt:        { type: Date, default: Date.now }
});


module.exports = mongoose.model('Cars', carSchema);