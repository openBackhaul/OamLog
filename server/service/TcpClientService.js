'use strict';
var fileOperation = require('../applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns remote IPv4 address
 *
 * uuid String 
 * returns inline_response_200_28
 **/
exports.getTcpClientRemoteIpv4Address = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "tcp-client-interface-1-0:remote-address": value
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
 * Returns target TCP port at server
 *
 * uuid String 
 * returns inline_response_200_29
 **/
exports.getTcpClientRemotePort = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabase(url);
      var response = {};
      response['application/json'] = {
        "tcp-client-interface-1-0:remote-port": value
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
 * Configures remote IPv4 address
 *
 * body Ipaddress_ipv4address_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpClientRemoteIpv4Address = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(body);
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 * Configures target TCP port at server
 *
 * body Tcpclientinterfaceconfiguration_remoteport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpClientRemotePort = function (url, body) {
  return new Promise(async function (resolve, reject) {
    try {
      await fileOperation.writeToDatabase(url, body, false);
      resolve();
    } catch (error) {
      reject();
    }
  });
}