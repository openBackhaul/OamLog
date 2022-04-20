'use strict';

var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const integerProfileMaximumPath = "/core-model-1-4:control-construct/profile-collection/profile=ol-0-0-1-integer-p-0000/integer-profile-1-0:integer-profile-pac/integer-profile-capability/maximum";

/**
 * Returns the name of the Integer
 *
 * returns inline_response_200_9
 **/
exports.getIntegerProfileIntegerName = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "integer-profile-1-0:integer-name": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {}
    reject();
  });
}


/**
 * Returns the configured value of the Integer
 *
 * returns inline_response_200_13
 **/
exports.getIntegerProfileIntegerValue = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "integer-profile-1-0:integer-value": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {}
    reject();
  });
}


/**
 * Returns the maximum value of the Integer
 *
 * returns inline_response_200_12
 **/
exports.getIntegerProfileMaximum = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "integer-profile-1-0:maximum": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {}
    reject();
  });
}


/**
 * Returns the minimum value of the Integer
 *
 * returns inline_response_200_11
 **/
exports.getIntegerProfileMinimum = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "integer-profile-1-0:minimum": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {}
    reject();
  });
}


/**
 * Returns the unit of the Integer
 *
 * returns inline_response_200_10
 **/
exports.getIntegerProfileUnit = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "integer-profile-1-0:unit": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {}
    reject();
  });
}


/**
 * Configures value of the Integer
 *
 * body Integerprofileconfiguration_integervalue_body 
 * no response value expected for this operation
 **/
exports.putIntegerProfileIntegerValue = function(body , url) {
  return new Promise(async function (resolve, reject) {
    try {
      let integerProfileMaximum = await fileOperation.readFromDatabaseAsync(integerProfileMaximumPath);
      let valueToBeUpdated = body["integer-profile-1-0:integer-value"];
      if (valueToBeUpdated <= integerProfileMaximum) {
        await fileOperation.writeToDatabaseAsync(url, body, false);
      }
      resolve();
    } catch (error) {}
    reject();
  });
}

