'use strict';

var TcpClient = require('../service/TcpClientService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getTcpClientRemotePort = function getTcpClientRemotePort(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  TcpClient.getTcpClientRemotePort(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.putTcpClientRemotePort = function putTcpClientRemotePort(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpClient.putTcpClientRemotePort(body, uuid)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.getTcpClientRemoteAddress = function getTcpClientRemoteAddress(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  TcpClient.getTcpClientRemoteAddress(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.getTcpClientRemoteProtocol = function getTcpClientRemoteProtocol(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  TcpClient.getTcpClientRemoteProtocol(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpClientRemoteAddress = function putTcpClientRemoteAddress(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpClient.putTcpClientRemoteAddress(body, uuid)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpClientRemoteProtocol = function putTcpClientRemoteProtocol(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpClient.putTcpClientRemoteProtocol(body, uuid)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
