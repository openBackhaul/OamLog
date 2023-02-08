'use strict';

var HttpClient = require('../service/HttpClientService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getHttpClientApplicationName = async function getHttpClientApplicationName(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await HttpClient.getHttpClientApplicationName(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getHttpClientReleaseNumber = async function getHttpClientReleaseNumber(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await HttpClient.getHttpClientReleaseNumber(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putHttpClientReleaseNumber = async function putHttpClientReleaseNumber(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await HttpClient.putHttpClientReleaseNumber(body, req.url,uuid)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putHttpClientApplicationName = function putHttpClientApplicationName (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  HttpClient.putHttpClientApplicationName(body, req.url,uuid)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};