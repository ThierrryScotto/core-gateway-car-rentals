'use strict';

// model
const CarsRent = require('../../model/carsRent');

async function getAllCarsRent(event) {
  const carsRentFound = await CarsRent.find().where('status').equals('1');

  return { 
    statusCode: 200,
    body: JSON.stringify(carsRentFound)
  }  
}

async function getCarsRentById(event) {
  const  { carsRentId } = event.pathParameters;

  const carsRentFound = await CarsRent.findById({ _id: carsRentId }).where('status').equals('1');
  if (!carsRentFound) {
    return { statusCode: 404, body: `CarsRent ${carsRentId} not found` };
  }

  return { 
    statusCode: 200,
    body: JSON.stringify(carsRentFound)
  }  
}

module.exports = {
  getAllCarsRent,
  getCarsRentById
}