'use strict';

var utils = require('../utils/writer.js');
var TcpServer = require('../service/TcpServerService');

module.exports.getTcpServerLocalIpv4Address = function getTcpServerLocalIpv4Address (req, res, next, uuid) {
  TcpServer.getTcpServerLocalIpv4Address(uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTcpServerLocalPort = function getTcpServerLocalPort (req, res, next, uuid) {
  TcpServer.getTcpServerLocalPort(uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putTcpServerLocalIpv4Address = function putTcpServerLocalIpv4Address (req, res, next, body, uuid) {
  TcpServer.putTcpServerLocalIpv4Address(body, uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putTcpServerLocalPort = function putTcpServerLocalPort (req, res, next, body, uuid) {
  TcpServer.putTcpServerLocalPort(body, uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
