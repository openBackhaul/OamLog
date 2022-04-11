'use strict';

var utils = require('../utils/writer.js');
var TcpClient = require('../service/TcpClientService');

module.exports.getTcpClientRemoteIpv4Address = function getTcpClientRemoteIpv4Address (req, res, next, uuid) {
  TcpClient.getTcpClientRemoteIpv4Address(uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTcpClientRemotePort = function getTcpClientRemotePort (req, res, next, uuid) {
  TcpClient.getTcpClientRemotePort(uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putTcpClientRemoteIpv4Address = function putTcpClientRemoteIpv4Address (req, res, next, body, uuid) {
  TcpClient.putTcpClientRemoteIpv4Address(body, uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putTcpClientRemotePort = function putTcpClientRemotePort (req, res, next, body, uuid) {
  TcpClient.putTcpClientRemotePort(body, uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
