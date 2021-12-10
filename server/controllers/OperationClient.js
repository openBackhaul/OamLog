'use strict';

var OperationClient = require('../service/OperationClientService');
var authorizingService = require('../applicationPattern/security/AuthorizingService');
var responseBuilder = require('../applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('../applicationPattern/rest/server/ResponseCode');
var oamLogService = require('../applicationPattern/logging/OamLogService');

module.exports.getOperationClientDetailedLoggingIsOn = async function getOperationClientDetailedLoggingIsOn (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.getOperationClientDetailedLoggingIsOn(req.url)
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

module.exports.getOperationClientLifeCycleState = async function getOperationClientLifeCycleState (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.getOperationClientLifeCycleState(req.url)
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

module.exports.getOperationClientOperationKey = async function getOperationClientOperationKey (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.getOperationClientOperationKey(req.url)
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

module.exports.getOperationClientOperationName = async function getOperationClientOperationName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.getOperationClientOperationName(req.url)
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

module.exports.getOperationClientOperationalState = async function getOperationClientOperationalState (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.getOperationClientOperationalState(req.url)
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

module.exports.putOperationClientDetailedLoggingIsOn = async function putOperationClientDetailedLoggingIsOn (req, res, next, body) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.putOperationClientDetailedLoggingIsOn(req.url,body)
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

module.exports.putOperationClientOperationKey = async function putOperationClientOperationKey (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.putOperationClientOperationKey(req.url,body)
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

module.exports.putOperationClientOperationName = async function putOperationClientOperationName (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await OperationClient.putOperationClientOperationName(req.url,body)
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
