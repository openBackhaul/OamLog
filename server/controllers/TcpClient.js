'use strict';

var TcpClient = require('../service/TcpClientService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getTcpClientRemoteIpv4Address = async function getTcpClientRemoteIpv4Address (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await TcpClient.getTcpClientRemoteIpv4Address(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getTcpClientRemotePort = async function getTcpClientRemotePort (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await TcpClient.getTcpClientRemotePort(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpClientRemoteIpv4Address = async function putTcpClientRemoteIpv4Address (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
    await TcpClient.putTcpClientRemoteIpv4Address(req.url, body)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpClientRemotePort = async function putTcpClientRemotePort (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
    await TcpClient.putTcpClientRemotePort(req.url, body)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
