'use strict';
var fileOperation = require('../applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns the configured life cycle state of the operation
 *
 * uuid String 
 * returns inline_response_200_10
 **/
exports.getOperationServerLifeCycleState = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-server-interface-1-0:life-cycle-state": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject();
    }
  });
}


/**
 * Returns key for connecting
 *
 * uuid String 
 * returns inline_response_200_11
 **/
exports.getOperationServerOperationKey = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-server-interface-1-0:operation-key": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject();
    }

  });
}


/**
 * Returns operation name
 *
 * uuid String 
 * returns inline_response_200_9
 **/
exports.getOperationServerOperationName = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-server-interface-1-0:operation-name": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject();
    }
  });
}

/**
 * Configures life cycle state
 *
 * body Operationserverinterfaceconfiguration_lifecyclestate_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putOperationServerLifeCycleState = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 * Changes key for connecting
 *
 * body Operationserverinterfaceconfiguration_operationkey_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putOperationServerOperationKey = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}