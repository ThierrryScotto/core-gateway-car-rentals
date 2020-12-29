'use strict';

// model
const Clients = require('../../model/client');

async function getAllClients(event) {
  const clientFound = await Clients.find().where('status').equals('1');

  return { 
    statusCode: 200,
    body: JSON.stringify(clientFound)
  }  
}

async function getClientById(event) {
  const  { clientId } = event.pathParameters;

  const clientFound = await Clients.findById({ _id: clientId }).where('status').equals('1');
  if (!clientFound) {
    return { statusCode: 404, body: `Client ${clientId} not found` };
  }

  return { 
    statusCode: 200,
    body: JSON.stringify(clientFound)
  }  
}

module.exports = {
  getAllClients,
  getClientById
}