/**
 * <p>This class provides functionality to log the OAM request to the OAM Log application in the framework.
 * A rest call will be initiated from this application to the OAM Log application to report the transaction happend in the OAM layer.</p>  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       05.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module OAMLog
 **/

const forwardingConstruct = require('../onfModel/models/ForwardingConstruct');
const operationClientInterface = require('../onfModel/models/layerprotocols/OperationClientInterface');
const httpServerInterface = require('../OnfModel/models/layerprotocols/HttpServerInterface');
const requestHeader = require('../rest/client/RequestHeader');
const requestBuilder = require('../rest/client/RequestBuilder');
const onfAttributeFormatter = require('../onfModel/utility/OnfAttributeFormatter');
const authorizationCodeDecoder = require('../security/AuthorizationDecoder');
const moment = require('moment');

/**
 * This function recods the OAM request to the OAM lof application<br>
 * @param {string} oamPath oam path that is accessed during the request<br>
 * @param {string} requestBody incase if it is a put request, then the request body of the request<br>
 * @param {string} responseCode response code of the rest call execution<br>
 * @param {string} authorizationCode authorization code used to access the oam layer. This will then decoded to findout the username<br>
 * @param {string} method HTTP method of the OAM layer call. It can be PUT,GET<br>
 * @returns {boolean} returns true if the operation is successful<br>
 * This method performs the following step,<br>
 * step 1: Get the operation client of the OAM log application that needs to be executed to log the OAM request <br>
 * 2. If user value is empty , then the value from originator will be copied<br>
 * 3. If xCorrelator is empty , then a new X-correlator string will be created by using the method xCorrelatorGenerator<br>
 * 4. If the customerJourney is empty , then the value "unknown value" will be added<br>
 * 5. If trace-indicator value is empty , then the value will be assigned to 1<br>
 */
exports.recordOamRequest = function (oamPath, requestBody, responseCode, authorizationCode, method) {
    return new Promise(async function (resolve, reject) {
        try {
            let operationClientUuid = await getOperationClientToLogOamRequest();
            let serviceName = await operationClientInterface.getOperationName(operationClientUuid);
            let ipAddressAndPort = await operationClientInterface.getTcpIpAddressAndPortForTheOperationClient(operationClientUuid);
            let operationKey = await operationClientInterface.getOperationKey(operationClientUuid);
            let applicationName = await httpServerInterface.getApplicationName();
            let timestamp = moment().format();
            let userName = authorizationCodeDecoder.decodeAuthorizationCodeAndExtractUserName(authorizationCode);
            let stringifiedBody = JSON.stringify(requestBody);
            let httpRequestHeader = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(new requestHeader(userName, applicationName, "", "", "unknown", operationKey));
            let httpRequestBody = formulateResponseBody(method, oamPath, stringifiedBody, responseCode, userName, timestamp);
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
 * This function formulates the response body with the required attributes that needs to be sent to the OAMLog application<br>
 * @param {string} method HTTP method of the OAM layer call. It can be PUT,GET<br>
 * @param {string} oamPath oam path that is accessed during the request<br>
 * @param {string} stringifiedBody incase if it is a put request, then the request body of the request<br>
 * @param {string} responseCode response code of the rest call execution<br>
 * @param {string} userName name of the user who accessed the OAM layer<br>
 * @param {string} timeStamp timestamp of the execution<br>
 * @returns {object} return the formulated responseBody<br>
 */
function formulateResponseBody(method, oamPath, stringifiedBody, responseCode, userName, timeStamp) {
    let httpRequestBody = {};
    try {
        httpRequestBody = {
            "application-name": "RegistryOffice",
            "method": method,
            "resource": oamPath,
            "stringified-body": stringifiedBody,
            "response-code": responseCode,
            "Authorization": userName,
            "timestamp": timeStamp
        };
        return httpRequestBody;
    } catch (error) {
        return httpRequestBody;
    }
}

/**
 * This function returns the operation client uuid of the service that needs to be called to log the OAM requests<br>
 * @returns {string} return the uuid of the operation client of the service that needs to be addressed to log the OAM request<br>
 * This method performs the following step,<br>
 * step 1: extract the forwarding-construct OamRequestCausesLoggingRequest<br>
 * step 2: get the output fc-port from the forwarding-construct<br>
 */
async function getOperationClientToLogOamRequest() {
    return new Promise(async function (resolve, reject) {
        try {
            let operationClientUuid = undefined;
            let operationClientUuidList = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheForwardingName("OamRequestCausesLoggingRequest");
            if (operationClientUuidList != undefined) {
                operationClientUuid = operationClientUuidList[0];
            }
            resolve(operationClientUuid);
        } catch (error) {
            reject(undefined);
        }
    });
}