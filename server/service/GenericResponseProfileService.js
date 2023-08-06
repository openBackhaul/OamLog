'use strict';
const fileOperation = require('../node_modules/onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns the Datatype of the Field
 *
 * uuid String 
 * returns inline_response_200_14
 **/
exports.getGenericResponseProfileDatatype = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "response-profile-1-0:datatype": value
  };
}


/**
 * Returns the Description of the Field
 *
 * uuid String 
 * returns inline_response_200_13
 **/
exports.getGenericResponseProfileDescription = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "response-profile-1-0:description": value
  };
}


/**
 * Returns the name of the Field
 *
 * uuid String 
 * returns inline_response_200_12
 **/
exports.getGenericResponseProfileFieldName = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "response-profile-1-0:field-name": value
  };
}


/**
 * Returns the name of the Operation
 *
 * uuid String 
 * returns inline_response_200_11
 **/
exports.getGenericResponseProfileOperationName = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "response-profile-1-0:operation-name": value
  };
}


/**
 * Returns the Value of the Field
 *
 * uuid String 
 * returns inline_response_200_15
 **/
exports.getGenericResponseProfileValue = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "response-profile-1-0:value": value
  };
}


/**
 * Configures the Value of the Field
 *
 * body Responseprofileconfiguration_value_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putGenericResponseProfileValue = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}
