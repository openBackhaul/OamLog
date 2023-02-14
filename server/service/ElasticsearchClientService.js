'use strict';
var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const { elasticsearchService, getApiKeyAsync, getIndexAliasAsync } = require('onf-core-model-ap/applicationPattern/services/ElasticsearchService');
const prepareElasticsearch = require('./individualServices/ElasticsearchPreparation');

/**
 * Returns API key
 *
 * url String
 * returns inline_response_200_50
 **/
exports.getElasticsearchClientApiKey = function(url) {
  return new Promise(async function(resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "elasticsearch-client-interface-1-0:api-key" : value
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
 * Returns index alias
 *
 * url String
 * returns inline_response_200_51
 **/
exports.getElasticsearchClientIndexAlias = function(url) {
  return new Promise(async function(resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "elasticsearch-client-interface-1-0:index-alias" : value
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
 * Returns life cycle state of the connection towards Elasticsearch
 *
 * url String
 * returns inline_response_200_54
 **/
exports.getElasticsearchClientLifeCycleState = function(url) {
  return new Promise(async function(resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "elasticsearch-client-interface-1-0:life-cycle-state" : value
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
 * Returns operational state of the connection towards Elasticsearch
 *
 * url String
 * uuid String
 * returns inline_response_200_53
 **/
exports.getElasticsearchClientOperationalState = function(url, uuid) {
  return new Promise(async function(resolve, reject) {
    try {
      let value = await elasticsearchService.getElasticsearchClientOperationalStateAsync(uuid);
      var response = {};
      response['application/json'] = {
        "elasticsearch-client-interface-1-0:operational-state" : value
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
 * Returns service records policy
 *
 * uuid String
 * returns inline_response_200_52
 **/
exports.getElasticsearchClientServiceRecordsPolicy = function(uuid) {
  return new Promise(async function(resolve, reject) {
    try {
      var value = await elasticsearchService.getElasticsearchClientServiceRecordsPolicyAsync(uuid);
      var response = {};
      response['application/json'] = {
        "elasticsearch-client-interface-1-0:service-records-policy" : value
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
 * Configures API key
 *
 * body Auth_apikey_body
 * url String
 * no response value expected for this operation
 **/
exports.putElasticsearchClientApiKey = function(url, body, uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let oldValue = await getApiKeyAsync(uuid);
      if (oldValue !== body["elasticsearch-client-interface-1-0:api-key"]) {
        await fileOperation.writeToDatabaseAsync(url, body, false);
        // recreate the client with new connection data
        await elasticsearchService.getClient(true, uuid);
        await prepareElasticsearch();
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}

/**
 * Configures index alias
 *
 * body Elasticsearchclientinterfaceconfiguration_indexalias_body
 * url String
 * no response value expected for this operation
 **/
exports.putElasticsearchClientIndexAlias = function(url, body, uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let oldValue = await getIndexAliasAsync(uuid);
      let oldPolicy = await elasticsearchService.getElasticsearchClientServiceRecordsPolicyAsync(uuid);
      if (oldValue !== body["elasticsearch-client-interface-1-0:index-alias"]) {
        await fileOperation.writeToDatabaseAsync(url, body, false);
        await prepareElasticsearch();
        // we need to reassign policy associated with the old alias to the new
        if (oldPolicy) {
          await elasticsearchService.assignPolicyToIndexTemplate(oldPolicy["service-records-policy-name"], uuid);
        }
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}

  /**
 * Configures service records policy
 *
 * body Elasticsearchclientinterfaceconfiguration_servicerecordspolicy_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putElasticsearchClientServiceRecordsPolicy = function(uuid, body) {
  return new Promise(async function(resolve, reject) {
    try {
      await elasticsearchService.putElasticsearchClientServiceRecordsPolicyAsync(uuid, body);
      let policy = body["elasticsearch-client-interface-1-0:service-records-policy"];
      await elasticsearchService.assignPolicyToIndexTemplate(policy["service-records-policy-name"], uuid);
      resolve();
    } catch (error) {
      reject();
    }
  });
}