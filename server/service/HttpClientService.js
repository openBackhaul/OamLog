'use strict';
var fileOperation = require('../applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns name of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_26
 **/
exports.getHttpClientApplicationName = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "http-client-interface-1-0:application-name": value
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
 * Returns release number of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_27
 **/
exports.getHttpClientReleaseNumber = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "http-client-interface-1-0:release-number": value
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
 * Configures release number of application to be addressed
 *
 * body Httpclientinterfaceconfiguration_releasenumber_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putHttpClientReleaseNumber = function (body, url) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {}
    reject();
  });
}