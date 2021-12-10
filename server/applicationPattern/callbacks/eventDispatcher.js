/**
 * @file This module provides funtionality to trigger and dispatch rest request from this application to other applications  
 * This class consolidates the technology specific extensions.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const RequestHeader = require('../rest/client/RequestHeader.js');
const OnfAttributeFormatter = require("../onfModel/utility/OnfAttributeFormatter");
const RestRequestBuilder = require('../rest/client/RequestBuilder');
const httpServerInterface = require('../onfModel/models/layerprotocols/HttpServerInterface.js');
const basicServiceCallback = require('./requestBodyFactory/BasicService');
const individualServiceCallback = require('./requestBodyFactory/IndividualService');
/**
 * This funtion formulates the request body based on the operation name and application 
 * @param {string} serviceType provides "basic" if the service comes from the basicservice layer or else "individual"
 * @param {String} remoteIpAndPort ip address,port of the client application in the format <ipaddress>:<port>.
 * @param {String} clientApplicationName name of the client application to which we are going to sent the request.
 * @param {String} operationName name of the client operation that needs to be addressed. 
 * @param {String} operationKey operation key to access the service in the client application. 
 * @param {String} attributeList list of attributes that needs to be included in the request body based on the operation name. 
 * @param {String} user username of the request initiator. 
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses. 
 * @param {String} traceIndicator Sequence number of the request. 
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies.
 */
exports.dispatchEvent = function (serviceType,remoteIpAndPort, clientApplicationName, operationName, operationKey,
    attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        let result = false;
        try {
            let httpRequestBody;
            let originator = await httpServerInterface.getApplicationName();
            let httpRequestHeader = new RequestHeader(user, originator,xCorrelator, traceIndicator, customerJourney, operationKey);
            httpRequestHeader = OnfAttributeFormatter.modifyJsonObjectKeysToKebabCase(httpRequestHeader);
            
            if(serviceType == "Basic"){
                httpRequestBody = await basicServiceCallback.prepareRequestBody(clientApplicationName, operationName, attributeList);
            }else{
                httpRequestBody = await individualServiceCallback.prepareRequestBody(clientApplicationName, operationName, attributeList);
            }
            let response = await RestRequestBuilder.BuildAndTriggerRestRequest(remoteIpAndPort, operationName, "POST", httpRequestHeader, httpRequestBody);
            if (response !== undefined && response.status === 200) {
                result = true;
            }
            resolve(result);
        } catch (error) {
            resolve(false);
        }
    });
}
