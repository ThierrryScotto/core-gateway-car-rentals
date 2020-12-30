'use strict';

// validate body
const validator = require('../../helpers/validate.helpers');

// model
const Clients = require('../../model/client');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterClients',
    'type': 'object',
    'properties': {
      'name':       { 'type': 'string' },
      'lastName':   { 'type': 'string' },
      'birthday':   { 'type': 'string' },
      'address':    { 'type': 'object' },
      'profession': { 'type': 'string' },
    },
    'required': ['name', 'lastName', 'birthday', 'address', 'profession']
  };
  return validator.validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const registerSchema = {
    'id'  : '/EditClients',
    'type': 'object',
    'properties': {
      'address':    { 'type': 'object' },
      'profession': { 'type': 'string' },
      "status":     { 'type': 'number' },
    },
    'required': ['address', 'profession']
  };
  return validator.validate(registerSchema, body);
};

async function registerClient(event) {
  try {
    const body = _validateRegisterBody(JSON.parse(event.body));
    const clientCreated = await Clients.create(body);

    return {
      statusCode: 201,
      body: JSON.stringify(clientCreated)
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: `Internal error: ${err}`,
    }
  }
}

async function editClient(event) {
  const body     = _validateEditBody(JSON.parse(event.body));
  const clientId = event.pathParameters.clientId;

  const clientFound = await Clients.findById({ _id: clientId }).where('status').equals('1');
  if (!clientFound) {
    return {
      statusCode: 404,
      message: `Client ${clientId} not found`
    }
  }


  clientFound.status     = body.status;
  clientFound.address    = body.address;
  clientFound.profession = body.profession;
  clientFound. updatedAt      = new Date();

  await clientFound.save();

  return { 
    statusCode: 200,
    body: JSON.stringify(clientFound)
  }
}

async function deleteClient(event) {
  const { clientId } = event.pathParameters;

  const clientFound = await Clients.findById({ _id: clientId }).where('status').equals('1');
  if (!clientFound) {
    return { statusCode: 404, body: `Client ${clientId} not found` };
  }

  clientFound.status = 0;

  await clientFound.save();
  
  return { 
    statusCode: 204,
    body: 'Client deleted'
  }
}

module.exports = {
  registerClient,
  editClient,
  deleteClient
}