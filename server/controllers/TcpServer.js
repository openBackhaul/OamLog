'use strict';

var TcpServer = require('../service/TcpServerService');
var authorizingService = require('../applicationPattern/security/AuthorizingService');
var responseBuilder = require('../applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('../applicationPattern/rest/server/ResponseCode');
var oamLogService = require('../applicationPattern/logging/OamLogService');

module.exports.getTcpServerLocalIpv4Address = async function getTcpServerLocalIpv4Address (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await TcpServer.getTcpServerLocalIpv4Address(req.url)
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

module.exports.getTcpServerLocalPort = async function getTcpServerLocalPort (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await TcpServer.getTcpServerLocalPort(req.url)
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

module.exports.putTcpServerLocalIpv4Address = async function putTcpServerLocalIpv4Address (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await TcpServer.putTcpServerLocalIpv4Address(req.url, body)
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

module.exports.putTcpServerLocalPort = async function putTcpServerLocalPort (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await TcpServer.putTcpServerLocalPort(req.url, body)
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
