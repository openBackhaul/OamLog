'use strict';
var fileOperation = require('../applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns IPv4 address of the server
 *
 * uuid String 
 * returns inline_response_200_19
 **/
exports.getTcpServerLocalIpv4Address = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "tcp-server-interface-1-0:local-address": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject();
    }
  });
}


/**
 * Returns TCP port of the server
 *
 * uuid String 
 * returns inline_response_200_20
 **/
exports.getTcpServerLocalPort = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "tcp-server-interface-1-0:local-port": value
      };
      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject();
    }
  });
}


/**
 * Documents IPv4 address of the server
 *
 * body Localaddress_ipv4address_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpServerLocalIpv4Address = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 * Documents TCP port of the server
 *
 * body Tcpserverinterfaceconfiguration_localport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpServerLocalPort = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}