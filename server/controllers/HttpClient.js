'use strict';

var HttpClient = require('../service/HttpClientService');
var authorizingService = require('../applicationPattern/security/AuthorizingService');
var responseBuilder = require('../applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('../applicationPattern/rest/server/ResponseCode');
var oamLogService = require('../applicationPattern/logging/OamLogService');

module.exports.getHttpClientApplicationName = async function getHttpClientApplicationName(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await HttpClient.getHttpClientApplicationName(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  } else {
    responseCode = responseCodeEnum.code.UNAUTHORIZED;
    responseBuilder.buildResponse(res, responseCode);
  }
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getHttpClientReleaseNumber = async function getHttpClientReleaseNumber(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await HttpClient.getHttpClientReleaseNumber(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  } else {
    responseCode = responseCodeEnum.code.UNAUTHORIZED;
    responseBuilder.buildResponse(res, responseCode);
  }
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putHttpClientReleaseNumber = async function putHttpClientReleaseNumber(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await HttpClient.putHttpClientReleaseNumber(body, req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  } else {
    responseCode = responseCodeEnum.code.UNAUTHORIZED;
    responseBuilder.buildResponse(res, responseCode);
  }
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};