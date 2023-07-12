'use strict';
var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const httpClientServer = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface')
/**
 * Returns name of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_26
 **/
exports.getHttpClientApplicationName = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "http-client-interface-1-0:application-name": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) { }
    reject();
  });
}


/**
 * Returns release number of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_27
 **/
exports.getHttpClientReleaseNumber = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "http-client-interface-1-0:release-number": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) { }
    reject();
  });
}


/**
 * Configures release number of application to be addressed
 *
 * body Httpclientinterfaceconfiguration_releasenumber_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putHttpClientReleaseNumber = function (body, url, uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let oldValue = await httpClientServer.getReleaseNumberAsync(uuid);
      let newValue = body["http-client-interface-1-0:release-number"];
      if (oldValue !== newValue) {
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
    } catch (error) { }
    reject();

  });
}



exports.putHttpClientApplicationName = function (body, url, uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let oldValue = await httpClientServer.getApplicationNameAsync(uuid);
      let newValue = body["http-client-interface-1-0:application-name"];
      if (oldValue !== newValue) {
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
    } catch (error) { }
    reject();
  });
}
