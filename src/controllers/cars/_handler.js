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

async function registerCar(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(persistController.registerCar, event);
}

async function editCar(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(persistController.editCar, event);
}

async function deleteCar(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
 return await executeControllerFunction(persistController.deleteCar, event);
}

async function getAllCars(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getAllCars, event);
}

async function getCarById(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getCarById, event);
}

module.exports = {
  registerCar,
  editCar,
  deleteCar,
  getAllCars,
  getCarById
}