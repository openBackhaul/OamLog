'use strict';

var utils = require('../utils/writer.js');
var ActionProfile = require('../service/ActionProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getActionProfileConsequentOperationReference = function getActionProfileConsequentOperationReference (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  ActionProfile.getActionProfileConsequentOperationReference(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.getActionProfileDisplayInNewBrowserWindow = function getActionProfileDisplayInNewBrowserWindow (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  ActionProfile.getActionProfileDisplayInNewBrowserWindow(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getActionProfileInputValueListt = function getActionProfileInputValueListt (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  ActionProfile.getActionProfileInputValueListt(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getActionProfileLabel = function getActionProfileLabel (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  ActionProfile.getActionProfileLabel(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getActionProfileOperationName = function getActionProfileOperationName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  ActionProfile.getActionProfileOperationName(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putActionProfileConsequentOperationReference = function putActionProfileConsequentOperationReference (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  ActionProfile.putActionProfileConsequentOperationReference(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
