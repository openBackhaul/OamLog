'use strict';
var fileOperation = require('../applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns detailed logging configuration.
 *
 * returns inline_response_200_25
 **/
exports.getOperationClientDetailedLoggingIsOn = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-client-interface-1-0:detailed-logging-is-on": value
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
 * Returns life cycle state of the operation
 *
 * uuid String 
 * returns inline_response_200_24
 **/
exports.getOperationClientLifeCycleState = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-client-interface-1-0:life-cycle-state": value
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
 * Returns key used for connecting to server.
 *
 * uuid String 
 * returns inline_response_200_22
 **/
exports.getOperationClientOperationKey = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-client-interface-1-0:operation-key": value
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
 * returns inline_response_200_21
 **/
exports.getOperationClientOperationName = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-client-interface-1-0:operation-name": value
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
 * Returns operational state of the operation
 *
 * uuid String 
 * returns inline_response_200_23
 **/
exports.getOperationClientOperationalState = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "operation-client-interface-1-0:operational-state": value
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
 * Configures detailed logging on/off.
 *
 * body Operationclientinterfaceconfiguration_detailedloggingison_body 
 * no response value expected for this operation
 **/
exports.putOperationClientDetailedLoggingIsOn = function (url, body) {
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
 * Configures key used for connecting to server.
 *
 * body Operationclientinterfaceconfiguration_operationkey_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putOperationClientOperationKey = function (url, body) {
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
 * Configures operation name
 *
 * body Operationclientinterfaceconfiguration_operationname_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putOperationClientOperationName = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}