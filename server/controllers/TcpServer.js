'use strict';

var TcpServer = require('../service/TcpServerService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getTcpServerLocalAddress = async function getTcpServerLocalAddress (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await TcpServer.getTcpServerLocalAddress(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getTcpServerLocalPort = async function getTcpServerLocalPort (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await TcpServer.getTcpServerLocalPort(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpServerLocalAddress = function putTcpServerLocalAddress (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpServer.putTcpServerLocalAddress(req.url,body,uuid)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.putTcpServerLocalPort = async function putTcpServerLocalPort (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await TcpServer.putTcpServerLocalPort(req.url, body,uuid)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getTcpServerLocalProtocol = function getTcpServerLocalProtocol (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  TcpServer.getTcpServerLocalProtocol(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpServerLocalProtocol = function putTcpServerLocalProtocol (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpServer.putTcpServerLocalProtocol(req.url,body,uuid)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getTcpServerDescription = function getTcpServerDescription (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  TcpServer.getTcpServerDescription(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putTcpServerDescription = function putTcpServerDescription (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  TcpServer.putTcpServerDescription(req.url,body,uuid)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    responseBuilder.buildResponse(res, responseCode, response);
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

