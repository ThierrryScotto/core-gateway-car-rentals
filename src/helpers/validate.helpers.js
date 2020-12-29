"use strict"

// dependecies
const jsonschema = require('jsonschema');

const validate = (schema, jsonObject) => {
  const validator = new jsonschema.Validator();
  let validatorResult = validator.validate(jsonObject, schema);

  if (validatorResult.errors.length > 0) {
    throw new Error("Body incorrect");
  }

  return validatorResult.instance;
};

module.exports = {
  validate
}