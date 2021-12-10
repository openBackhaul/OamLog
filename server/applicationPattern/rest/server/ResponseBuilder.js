/**
 * @file This module provides funtionality to trigger and dispatch rest request from this application to other applications  
 * This class consolidates the technology specific extensions.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';
const OnfAttributeFormatter = require("../../onfModel/utility/OnfAttributeFormatter");

exports.buildResponse = function (response, responseCode, responseBody, responseHeader) {
  /**if no response code given, we default to 500 */
  if (responseCode == undefined || responseCode.length == 0 || responseCode == 500) {
    responseCode = 500;
    responseBody = {
      "message": "Internal server error"
    }
  }else if (responseCode == 401) {
    responseBody = {
      "message": "Unauthorized Access"
    }
  }
  if (typeof responseBody === 'object') {
    responseBody = JSON.stringify(responseBody, null, 2);
  }
  let stringifiedResponseHeader = {
    'Content-Type': 'application/json'
  };
  if (responseHeader != undefined) {
    stringifiedResponseHeader = OnfAttributeFormatter.modifyJsonObjectKeysToKebabCase(responseHeader);
  }
  Object.keys(stringifiedResponseHeader).forEach(key => {
    response.setHeader(key, stringifiedResponseHeader[key]);
  });
  response.writeHead(responseCode);
  response.end(responseBody);
}