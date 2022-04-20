'use strict';

var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns entire data tree
 *
 * returns inline_response_200_7
 **/
exports.getControlConstruct = function() {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync("core-model-1-4:control-construct");
      var response = {};
      response['application/json'] = {
        "core-model-1-4:control-construct": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
}

