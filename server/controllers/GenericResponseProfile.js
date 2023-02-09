'use strict';


var GenericResponseProfile = require('../service/GenericResponseProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getGenericResponseProfileDatatype = function getGenericResponseProfileDatatype (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  GenericResponseProfile.getGenericResponseProfileDatatype(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getGenericResponseProfileDescription = function getGenericResponseProfileDescription (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  GenericResponseProfile.getGenericResponseProfileDescription(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getGenericResponseProfileFieldName = function getGenericResponseProfileFieldName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  GenericResponseProfile.getGenericResponseProfileFieldName(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
module.exports.getGenericResponseProfileOperationName = function getGenericResponseProfileOperationName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  console.log(req.url)
  GenericResponseProfile.getGenericResponseProfileOperationName(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getGenericResponseProfileValue = function getGenericResponseProfileValue (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  GenericResponseProfile.getGenericResponseProfileValue(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putGenericResponseProfileValue = function putGenericResponseProfileValue (req, res, next, body) {
  let responseCode = responseCodeEnum.code.NO_CONTENT; 
  GenericResponseProfile.putGenericResponseProfileValue(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};