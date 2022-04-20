'use strict';

var IntegerProfile = require('../service/IntegerProfileService');
var authorizingService = require('onf-core-model-ap-bs/basicServices/AuthorizingService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap-bs/basicServices/OamLogService');

module.exports.getIntegerProfileIntegerName = async function getIntegerProfileIntegerName (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
    if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
      await IntegerProfile.getIntegerProfileIntegerName(req.url)
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

module.exports.getIntegerProfileIntegerValue = async function getIntegerProfileIntegerValue (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
    if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
      await IntegerProfile.getIntegerProfileIntegerValue(req.url)
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

module.exports.getIntegerProfileMaximum = async function getIntegerProfileMaximum (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
    if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
      await IntegerProfile.getIntegerProfileMaximum(req.url)
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

module.exports.getIntegerProfileMinimum = async function getIntegerProfileMinimum (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
    if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
      await IntegerProfile.getIntegerProfileMinimum(req.url)
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

module.exports.getIntegerProfileUnit = async function getIntegerProfileUnit (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
    if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
      await IntegerProfile.getIntegerProfileUnit(req.url)
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

module.exports.putIntegerProfileIntegerValue = async function putIntegerProfileIntegerValue (req, res, next, body) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await IntegerProfile.putIntegerProfileIntegerValue(body, req.url)
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
