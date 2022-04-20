'use strict';

var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns entire record of a OaM request
 *
 * uuid String 
 * returns inline_response_200_8
 **/
exports.getOamRecordProfileCapability = function(url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "oam-record-profile-1-0:oam-record-profile-capability": value
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

