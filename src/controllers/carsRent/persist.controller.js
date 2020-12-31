'use strict';

// validate body
const validator = require('../../helpers/validate.helpers');

// models
const CarsRent = require('../../model/carsRent');
const Clients  = require('../../model/client');
const Cars     = require('../../model/car');

// sns 
const sns = require('../../services/sns');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterCarsRent',
    'type': 'object',
    'properties': {
      'clientId': { 'type': 'string' },
      'carId':    { 'type': 'string' }
    },
    'required': ['clientId', 'carId']
  };
  return validator.validate(registerSchema, body);
};

async function registerCarsRent(event) {
  try {
    const body = _validateRegisterBody(JSON.parse(event.body));
    const carFound = await Cars.findById({ _id: body.carId }).where('status').equals('1');
    if (!carFound) {
      return { statusCode: 404, message: `Car ${carsRentId} not found` }
    }
    
    const clientsFound = await Clients.findById({ _id: body.clientId }).where('status').equals('1');
    if (!clientsFound) {
      return { statusCode: 404, message: `Client ${carsRentId} not found` }
    }
    
    const carsRentCreated = await CarsRent.create(body);

    await sns.sendSMS(clientsFound, carFound);

    return { statusCode: 201, body: JSON.stringify(carsRentCreated) }
  } catch (err) {
    return {
      statusCode: 500,
      message: `Internal error: ${err}`,
    }
  }
}

async function deleteCarsRent(event) {
  const { carsRentId } = event.pathParameters;

  const carsRentFound = await CarsRent.findById({ _id: carsRentId }).where('status').equals('1');
  if (!carsRentFound) {
    return { statusCode: 404, body: `CarsRent ${carsRentId} not found` };
  }

  carsRentFound.status = 0;

  await carsRentFound.save();
  
  return { 
    statusCode: 204,
    body: 'CarsRent deleted'
  }
}

module.exports = {
  registerCarsRent,
  deleteCarsRent
}