'use strict';

// validate body
const validator = require('../../helpers/validate.helpers');

// model
const Cars = require('../../model/car');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterCar',
    'type': 'object',
    'properties': {
      'model'           : { 'type': 'string' },
      'totalKilometers' : { 'type': 'string' },
      'year'            : { 'type': 'string' },
      'dailyValue'      : { 'type': 'string' },
      'clutch'          : { 'type': 'string' },
      'doors'           : { 'type': 'number' },
      'seats'           : { 'type': 'number' }
    },
    'required': ['model', 'totalKilometers', 'year', 'dailyValue', 'clutch', 'doors', 'seats']
  };
  return validator.validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const registerSchema = {
    'id'  : '/EditCar',
    'type': 'object',
    'properties': {
      'model'           : { 'type': 'string' },
      'totalKilometers' : { 'type': 'string' },
      'year'            : { 'type': 'string' },
      'dailyValue'      : { 'type': 'string' },
    },
    'required': ['model', 'totalKilometers', 'year', 'dailyValue']
  };
  return validator.validate(registerSchema, body);
};

async function registerCar(event) {
  try {
    const body = _validateRegisterBody(JSON.parse(event.body));
    const carCreated = await Cars.create(body);

    return {
      statusCode: 201,
      body: JSON.stringify(carCreated)
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: `Internal error: ${err}`,
    }
  }
}

async function editCar(event) {
  const body  = _validateEditBody(JSON.parse(event.body));
  const carId = event.pathParameters.carId;

  const car = await Cars.findById({ _id: carId }).where('status').equals('1');
  if (!car) {
    return {
      statusCode: 404,
      message: `Car ${carId} not found`
    }
  }

  car.model           = body.model;
  car.totalKilometers = body.totalKilometers;
  car.year            = body.year;
  car.dailyValue      = body.dailyValue; 

  await car.save();

  return { 
    statusCode: 200,
    body: JSON.stringify(car)
  }
}

async function deleteCar(event) {
  const { carId } = event.pathParameters;

  const carFound = await Cars.findById({ _id: carId }).where('status').equals('1');
  if (!carFound) {
    return { statusCode: 404, body: `Car ${carId} not found` };
  }

  carFound.status = 0;

  await carFound.save();
  
  return { 
    statusCode: 204,
    body: 'Car deleted'
  }
}

module.exports = {
  registerCar,
  editCar,
  deleteCar
}