'use strict';

var OperationClient = require('../service/OperationClientService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getOperationClientDetailedLoggingIsOn = async function getOperationClientDetailedLoggingIsOn (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OperationClient.getOperationClientDetailedLoggingIsOn(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getOperationClientLifeCycleState = async function getOperationClientLifeCycleState (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OperationClient.getOperationClientLifeCycleState(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getOperationClientOperationKey = async function getOperationClientOperationKey (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OperationClient.getOperationClientOperationKey(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getOperationClientOperationName = async function getOperationClientOperationName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OperationClient.getOperationClientOperationName(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getOperationClientOperationalState = async function getOperationClientOperationalState (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OperationClient.getOperationClientOperationalState(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putOperationClientDetailedLoggingIsOn = async function putOperationClientDetailedLoggingIsOn (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
    await OperationClient.putOperationClientDetailedLoggingIsOn(req.url,body)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putOperationClientOperationKey = async function putOperationClientOperationKey (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
    await OperationClient.putOperationClientOperationKey(req.url,body)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putOperationClientOperationName = async function putOperationClientOperationName (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
    await OperationClient.putOperationClientOperationName(req.url,body)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
