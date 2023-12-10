'use strict';
const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');

/**
 * Returns IPv4 address of the server
 *
 * uuid String 
 * returns inline_response_200_19
 **/
exports.getTcpServerLocalAddress = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-server-interface-1-0:local-address": value
  };
}

/**
 * Returns TCP port of the server
 *
 * uuid String 
 * returns inline_response_200_20
 **/
exports.getTcpServerLocalPort = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-server-interface-1-0:local-port": value
  };
}

/**
 * Documents IPv4 address of the server
 *
 * body Localaddress_ipv4address_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpServerLocalAddress = async function (url, body, uuid) {
  const oldValue = await tcpServerInterface.getLocalAddress();
  const newValue = body["tcp-server-interface-1-0:local-address"];
  if (JSON.stringify(oldValue) != JSON.stringify(newValue)) {
    const isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);

    /****************************************************************************************
     * Prepare attributes to automate forwarding-construct
     ****************************************************************************************/
    if (isUpdated) {
      const forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
        uuid
      );
      ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
        forwardingAutomationInputList
      );
    }
  }
}

/**
 * Documents TCP port of the server
 *
 * body Tcpserverinterfaceconfiguration_localport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpServerLocalPort = async function (url, body, uuid) {
  const oldValue = await tcpServerInterface.getLocalPort();
  const newValue = body["tcp-server-interface-1-0:local-port"];
  if (oldValue !== newValue) {
    const isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);

    /****************************************************************************************
     * Prepare attributes to automate forwarding-construct
     ****************************************************************************************/
    if (isUpdated) {
      const forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
        uuid
      );
      ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
        forwardingAutomationInputList
      );
    }
  }
}

exports.getTcpServerLocalProtocol = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-server-interface-1-0:local-protocol": value
  };
}

exports.putTcpServerLocalProtocol = async function (url, body, uuid) {
  const oldValue = await tcpServerInterface.getLocalProtocol()
  const newValue = body["tcp-server-interface-1-0:local-protocol"];
  const value = tcpServerInterface.getProtocolFromProtocolEnum(oldValue)[1]
  if (value !== newValue) {
    const isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
    if (isUpdated) {
      const forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
        uuid
      );
      ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
        forwardingAutomationInputList
      );
    }
  }
}

exports.putTcpServerDescription = async function (url, body, uuid) {
  const isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
  if (isUpdated) {
    const forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}

exports.getTcpServerDescription = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-server-interface-1-0:description": value
  };
}
