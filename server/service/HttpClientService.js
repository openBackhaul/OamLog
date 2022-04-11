'use strict';


/**
 * Returns name of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_31
 **/
exports.getHttpClientApplicationName = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "http-client-interface-1-0:application-name" : "OldRelease"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns release number of application to be addressed
 *
 * uuid String 
 * returns inline_response_200_32
 **/
exports.getHttpClientReleaseNumber = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "http-client-interface-1-0:release-number" : "0.0.1"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configures release number of application to be addressed
 *
 * body Httpclientinterfaceconfiguration_releasenumber_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putHttpClientReleaseNumber = function(body,uuid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

