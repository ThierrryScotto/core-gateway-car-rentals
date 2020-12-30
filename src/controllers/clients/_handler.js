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

async function registerClients(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(persistController.registerClient, event);
}

async function editClients(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(persistController.editClient, event);
}

async function deleteClients(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
 return await executeControllerFunction(persistController.deleteClient, event);
}

async function getAllClients(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getAllClients, event);
}

async function getClientsById(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return await executeControllerFunction(retrieveController.getClientById, event);
}

module.exports = {
  registerClients,
  editClients,
  deleteClients,
  getAllClients,
  getClientsById
}