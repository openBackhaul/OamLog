'use strict';


/**
 * Returns IPv4 address of the server
 *
 * uuid String 
 * returns inline_response_200_24
 **/
exports.getTcpServerLocalIpv4Address = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tcp-server-interface-1-0:ipv-4-address" : "10.118.125.157"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns TCP port of the server
 *
 * uuid String 
 * returns inline_response_200_25
 **/
exports.getTcpServerLocalPort = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tcp-server-interface-1-0:local-port" : 1000
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
exports.putTcpServerLocalIpv4Address = function(body,uuid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Documents TCP port of the server
 *
 * body Tcpserverinterfaceconfiguration_localport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpServerLocalPort = function(body,uuid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

