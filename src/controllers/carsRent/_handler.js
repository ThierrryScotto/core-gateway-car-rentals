'use strict';

const persistController  = require('./persist.controller');
const retrieveController = require('./retrive.controller.');

const executeControllerFunction = async (functionToExecute, event) => {
  try {
    const result = await functionToExecute(event);
    return result;
  } 
  catch (err){
    console.log(err);
  }
};

async function registerCarsRent(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(persistController.registerCarsRent, event);
}

async function deleteCarsRent(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
 return await executeControllerFunction(persistController.deleteCarsRent, event);
}

async function getAllCarsRent(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getAllCarsRent, event);
}

async function getCarsRentById(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getCarsRentById, event);
}

module.exports = {
  registerCarsRent,
  deleteCarsRent,
  getAllCarsRent,
  getCarsRentById
}