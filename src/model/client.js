'use strict';

// imports
const mongoose         = require('../services/db/index');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name:        { type: String, required: true },
  lastName:    { type: String, required: true },
  birthday:    { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address:  {
    zipCode:      { type: String, required: true },
    Street:       { type: String, required: true },
    Neighborhood: { type: String, required: true },
    number:       { type: Number, required: true }
  },
  profession: { type: String, required: true },
  status:     { type: Number, required: true, default: 1 },
  createAt:   { type: Date, default: Date.now },
  updatedAt:  { type: Date }
});

module.exports = mongoose.model('Clients', clientSchema);