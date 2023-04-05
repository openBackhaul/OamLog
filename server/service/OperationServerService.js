'use strict';

var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const OperationServerService = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface')
/**
 * Returns the configured life cycle state of the operation
 *
 * uuid String 
 * returns inline_response_200_15
 **/
exports.getOperationServerLifeCycleState = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
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
 * returns inline_response_200_16
 **/
exports.getOperationServerOperationKey = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
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
 * returns inline_response_200_14
 **/
exports.getOperationServerOperationName = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
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
exports.putOperationServerLifeCycleState = function (url, body, uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let value
      let oldValue = await OperationServerService.getLifeCycleState(uuid)
      let remoteServerLifeCycleState = [];
      let remoteLifeCycleStateEnum = OperationServerService.OperationServerInterfacePac.OperationServerInterfaceConfiguration.lifeCycleStateEnum;
      for (let remoteLifeCycleStateEnumKey in remoteLifeCycleStateEnum) {
        if (remoteLifeCycleStateEnum[remoteLifeCycleStateEnumKey] == oldValue || remoteLifeCycleStateEnumKey == oldValue) {
          remoteServerLifeCycleState = [remoteLifeCycleStateEnumKey, remoteLifeCycleStateEnum[remoteLifeCycleStateEnumKey]];
        }
      }
      value = remoteServerLifeCycleState[1]
      let newValue = body["operation-server-interface-1-0:life-cycle-state"];
      if (value !== newValue) {
        let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);

        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        if (isUpdated) {
          let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
            uuid
          );
          ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
            forwardingAutomationInputList
          );
        }
      }
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
      await fileOperation.writeToDatabaseAsync(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}

