/**
 * <p>This class provides functionality to authenticate a OAM layer request by getting an approval from the Administrator administration.</p>  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       05.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module AuthorizingService
 **/

const forwardingConstruct = require('../OnfModel/models/ForwardingConstruct');
const operationClientInterface = require('../OnfModel/models/layerprotocols/OperationClientInterface');
const httpServerInterface = require('../OnfModel/models/layerprotocols/HttpServerInterface');
const requestHeader = require('../rest/client/RequestHeader');
const restRequestBuilder = require('../rest/client/RequestBuilder');
const onfAttributeFormatter = require('../onfModel/utility/OnfAttributeFormatter');
const authorizationCodeDecoder = require('./AuthorizationDecoder');

/**
 * This function authorizes the user credentials<br>
 * @param {string} authorizationCode authorization code received from the header<br>
 * @param {string} method is the https method name<br>
 * @returns {boolean} return the authorization result<br>
 * This method performs the following step,<br>
 * step 1: extract the <br>
 * 2. If user value is empty , then the value from originator will be copied<br>
 * 3. If xCorrelator is empty , then a new X-correlator string will be created by using the method xCorrelatorGenerator<br>
 * 4. If the customerJourney is empty , then the value "unknown value" will be added<br>
 * 5. If trace-indicator value is empty , then the value will be assigned to 1<br>
 */
exports.isAuthorized = function(authorizationCode, method) {
    return new Promise(async function (resolve, reject) {
        let isAuthorized = false;
        try {
            let operationClientUuid = await getOperationClientToAuthenticateTheRequest();
            let serviceName = await operationClientInterface.getOperationName(operationClientUuid);
            let ipAddressAndPort = await operationClientInterface.getTcpIpAddressAndPortForTheOperationClient(operationClientUuid);
            let operationKey = await operationClientInterface.getOperationKey(operationClientUuid);
            let userName = authorizationCodeDecoder.decodeAuthorizationCodeAndExtractUserName(authorizationCode);
            let applicationName = await httpServerInterface.getApplicationName();
            let applicationReleaseNumber = await httpServerInterface.getReleaseNumber();
            let httpRequestHeader = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(new requestHeader(userName, applicationName, "", "", "unknown", operationKey));
            let httpRequestBody = formulateResponseBody(applicationName,applicationReleaseNumber, authorizationCode, method)
            let response = await restRequestBuilder.BuildAndTriggerRestRequest(ipAddressAndPort, serviceName, "POST", httpRequestHeader, httpRequestBody);
            if (response !== undefined && response.status === 200) {
                let responseBody = response.data;
                if (responseBody["oam-request-is-approved"] == true) {
                    isAuthorized = true;
                }
            }
            resolve(isAuthorized);
        } catch (error) {
            console.log(error);
            resolve(isAuthorized);
        }
    });
}

/**
 * This function formulates the response body with the required attributes that needs to be sent to the Administrator Administration application<br>
 * @param {string} applicationName name of the application<br>
 * @param {string} releaseNumber release number of the application<br>
 * @param {string} authorizationCode authorization code to access the OAM layer<br>
 * @param {string} method HTTP method of the OAM layer call. It can be PUT,GET<br>
 * @returns {object} return the formulated responseBody<br>
 */
 function formulateResponseBody(applicationName, releaseNumber, authorizationCode, method) {
    let httpRequestBody = {};
    try {
        httpRequestBody = {
            "application-name": applicationName,
            "release-number": releaseNumber,
            "Authorization": authorizationCode,
            "method": method
        };
        return httpRequestBody;
    } catch (error) {
        return httpRequestBody;
    }
}

/**
 * This function returns the operation client uuid of the service that needs to be called to authenticate the OAM requests<br>
 * @returns {string} return the uuid of the operation client of the service that needs to be addressed to authenticate the OAM request<br>
 * This method performs the following step,<br>
 * step 1: extract the forwarding-construct OamRequestCausesInquiryForAuthentication<br>
 * step 2: get the output fc-port from the forwarding-construct<br>
 */
 async function getOperationClientToAuthenticateTheRequest() {
    return new Promise(async function (resolve, reject) {
        try {
            let operationClientUuid = undefined;
            let operationClientUuidList = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheForwardingName("OamRequestCausesInquiryForAuthentication");
            if (operationClientUuidList != undefined) {
                operationClientUuid = operationClientUuidList[0];
            }
            resolve(operationClientUuid);
        } catch (error) {
            reject(undefined);
        }
    });
}
