'use strict';
const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const { elasticsearchService } = require('onf-core-model-ap/applicationPattern/services/ElasticsearchService');

/**
 * Returns entire data tree
 *
 * returns inline_response_200_7
 **/
exports.getControlConstruct = async function() {
  const value = await fileOperation.readFromDatabaseAsync("core-model-1-4:control-construct");
  const controlConstruct = await elasticsearchService.updateControlConstructWithServicePolicy(value);
  return {
    "core-model-1-4:control-construct": controlConstruct
  };
}

/**
 * Returns entire instance of Profile
 *
 * uuid String 
 * returns inline_response_200_5
 **/
exports.getProfileInstance = async function(url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "core-model-1-4:profile": value
  };
}
