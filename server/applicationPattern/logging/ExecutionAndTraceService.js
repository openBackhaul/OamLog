/**
 * <p>This class provides functionality to log the Service request to the Execution and Trace Log application in the framework.
 * A rest call will be initiated from this application to the Execution and Trace log application to report the transaction happend in the service layer.</p>  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       05.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module ExecutionAndTraceLog
 **/

 const forwardingConstruct = require('../onfModel/models/ForwardingConstruct');
 const operationClientInterface = require('../onfModel/models/layerprotocols/OperationClientInterface');
 const requestHeader = require('../rest/client/RequestHeader');
 const requestBuilder = require('../rest/client/RequestBuilder');
 const onfAttributeFormatter = require('../onfModel/utility/OnfAttributeFormatter');
 const moment = require('moment');
const HttpServerInterface = require('../onfModel/models/layerProtocols/HttpServerInterface');
 
 
 /**
  * This function formulates the response body with the required attributes that needs to be sent to the Execution and Trace Log application<br>
  * @param {string} xCorrelator correlation tag of the current execution<br>
  * @param {string} traceIndicator sequence number of the execution<br>
  * @param {string} userName name of the user who is accessed the service<br>
  * @param {string} originator originator of the request<br>
  * @param {string} operationName name of the called service<br>
  * @param {string} responseCode response code of the rest call execution<br>
  * @param {string} requestBody  request body<br>
  * @param {string} responseBody  response body<br>
  * @returns {object} return the formulated responseBody<br>
  */
exports.recordServiceRequest = function(xCorrelator, traceIndicator, userName, originator,
    operationName,responseCode,requestBody, responseBody) {
     return new Promise(async function (resolve, reject) {
         try {
             let operationClientUuid = await getOperationClientToLogServiceRequest();
             let serviceName = await operationClientInterface.getOperationName(operationClientUuid);
             let ipAddressAndPort = await operationClientInterface.getTcpIpAddressAndPortForTheOperationClient(operationClientUuid);
             let operationKey = await operationClientInterface.getOperationKey(operationClientUuid);
             let timestamp = moment().format();
             let applicationName = await HttpServerInterface.getApplicationName();
             let applicationReleaseNumber = await HttpServerInterface.getReleaseNumber();
             let httpRequestHeader = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(new requestHeader(userName, applicationName, "", "", "unknown", operationKey));
             let stringifiedRequestBody = JSON.stringify(requestBody);
             let stringifiedResponseBody = JSON.stringify(responseBody);
             let httpRequestBody = formulateResponseBody(xCorrelator, traceIndicator, userName, originator, applicationName, applicationReleaseNumber,
                operationName,responseCode,timestamp,stringifiedRequestBody, stringifiedResponseBody);
             let response = await requestBuilder.BuildAndTriggerRestRequest(ipAddressAndPort, serviceName, "POST", httpRequestHeader, httpRequestBody);
             if (response !== undefined && response.status === 200) {
                 resolve(true);
             }
             resolve(false);
         } catch (error) {
             console.log(error);
             resolve(false);
         }
     });
 }
 
 /**
  * This function formulates the response body with the required attributes that needs to be sent to the Execution and Trace Log application<br>
  * @param {string} xCorrelator correlation tag of the current execution<br>
  * @param {string} traceIndicator sequence number of the execution<br>
  * @param {string} userName name of the user who is accessed the service<br>
  * @param {string} originator originator of the request<br>
  * @param {string} applicationName name of the calling application<br>
  * @param {string} applicationReleaseNumber release number of the calling application<br>
  * @param {string} operationName name of the called service<br>
  * @param {string} responseCode response code of the rest call execution<br>
  * @param {string} timestamp timestamp of the execution<br>
  * @param {string} stringifiedBody stringified request body<br>
  * @param {string} stringifiedResponse stringified response body<br>
  * @returns {object} return the formulated responseBody<br>
  */
 function formulateResponseBody(xCorrelator, traceIndicator, userName, originator, applicationName, applicationReleaseNumber,
    operationName,responseCode,timestamp,stringifiedBody, stringifiedResponse) {
     let httpRequestBody = {};
     try {
         httpRequestBody = {
            "x-correlator": xCorrelator,
            "trace-indicator": traceIndicator,
            "user": userName,
            "originator": originator,
            "application-name": applicationName,
            "application-release-number": applicationReleaseNumber,
            "operation-name": operationName,
            "response-code": responseCode,
            "timestamp": timestamp,
            "stringified-body": stringifiedBody,
            "stringified-response": stringifiedResponse
         };
         return httpRequestBody;
     } catch (error) {
         return httpRequestBody;
     }
 }
 
 /**
  * This function returns the operation client uuid of the service that needs to be called to log the service requests<br>
  * @returns {string} return the uuid of the operation client of the service that needs to be addressed to log the service request<br>
  * This method performs the following step,<br>
  * step 1: extract the forwarding-construct ServiceRequestCausesLoggingRequest<br>
  * step 2: get the output fc-port from the forwarding-construct<br>
  */
 async function getOperationClientToLogServiceRequest() {
     return new Promise(async function (resolve, reject) {
         try {
             let operationClientUuid = undefined;
             let operationClientUuidList = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheForwardingName("ServiceRequestCausesLoggingRequest");
             if (operationClientUuidList != undefined) {
                 operationClientUuid = operationClientUuidList[0];
             }
             resolve(operationClientUuid);
         } catch (error) {
             reject(undefined);
         }
     });
 } 
 