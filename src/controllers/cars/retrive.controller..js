'use strict';

// model
const Cars = require('../../model/car');

async function getAllCars(event) {
  const carFound = await Cars.find().where('status').equals('1');

  return { 
    statusCode: 200,
    body: JSON.stringify(carFound)
  }  
}

async function getCarById(event) {
  const  { carId } = event.pathParameters;

  const carFound = await Cars.findById({ _id: carId }).where('status').equals('1');
  if (!carFound) {
    return { statusCode: 404, body: `Car ${carId} not found` };
  }

  return { 
    statusCode: 200,
    body: JSON.stringify(carFound)
  }  
}

module.exports = {
  getAllCars,
  getCarById
}