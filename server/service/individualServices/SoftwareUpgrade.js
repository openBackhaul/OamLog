/**
 * @file This module provides functionality to migrate the data from the current version to the next version. 
 * @module SoftwareUpgrade
 **/

const LogicalTerminationPointService = require("onf-core-model-ap-bs/basicServices/utility/LogicalTerminationPoint")
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const httpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
var traceIncrementer = 1;

/**
 * This method performs the set of procedure to transfer the data from this version to next version 
 * of the application and bring the new release official
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {Promise} Promise is resolved if the operation succeeded else the Promise is rejected
 * **/
exports.upgradeSoftwareVersion = async function (user, xCorrelator, traceIndicator, customerJourney, _traceIncrementer) {
    if (_traceIncrementer !== 0) {
        traceIncrementer = _traceIncrementer;
    }
    await PromptForBequeathingDataCausesTransferOfListOfApplications(user, xCorrelator, traceIndicator, customerJourney);
    await replaceOldReleaseWithNewRelease(user, xCorrelator, traceIndicator, customerJourney);
}

/**
 * This method performs the set of procedure to replace the old release with the new release
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * The following are the list of forwarding-construct that will be automated to replace the old release with the new release
 * 1. PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement
 * 2. PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease
 */
async function replaceOldReleaseWithNewRelease(user, xCorrelator, traceIndicator, customerJourney) {
    await promptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement(user, xCorrelator, traceIndicator, customerJourney);
    await promptForBequeathingDataCausesRequestForDeregisteringOfOldRelease(user, xCorrelator, traceIndicator, customerJourney);
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesTransferOfListOfApplications
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function PromptForBequeathingDataCausesTransferOfListOfApplications(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result = true;
            let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesTransferOfListOfApplications";

            /***********************************************************************************
             * Preparing requestBody and transfering the data one by one
             ************************************************************************************/

            let requestForOamRequestInformationFCName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
            let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(requestForOamRequestInformationFCName);
            let operationClientUuidList = getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance);

            for (let i = 0; i < operationClientUuidList.length; i++) {
                try {
                    let operationClientUuid = operationClientUuidList[i];
                    let httpClientUuid = (await logicalTerminationPoint.getServerLtpListAsync(operationClientUuid))[0];
                    let tcpClientUuid = (await logicalTerminationPoint.getServerLtpListAsync(httpClientUuid))[0];

                    let applicationName = await httpClientInterface.getApplicationNameAsync(httpClientUuid);
                    let releaseNumber = await httpClientInterface.getReleaseNumberAsync(httpClientUuid);
                    let applicationAddress = await tcpClientInterface.getRemoteAddressAsync(tcpClientUuid);
                    let applicationPort = await tcpClientInterface.getRemotePortAsync(tcpClientUuid);
                    let applicationProtocol = await tcpClientInterface.getRemoteProtocolAsync(tcpClientUuid);
                    /***********************************************************************************
                     * PromptForBequeathingDataCausesTransferOfListOfApplications
                     *   /v1/regard-application
                     ************************************************************************************/
                    let requestBody = {};
                    requestBody.applicationName = applicationName;
                    requestBody.releaseNumber = releaseNumber;
                    requestBody.address = applicationAddress;
                    requestBody.port = applicationPort;
                    requestBody.protocol = applicationProtocol
                    requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                    result = await forwardRequest(
                        forwardingKindNameOfTheBequeathOperation,
                        requestBody,
                        user,
                        xCorrelator,
                        traceIndicator + "." + traceIncrementer++,
                        customerJourney
                    );
                    if (!result) {
                        throw forwardingKindNameOfTheBequeathOperation + " forwarding is not success for the input" + JSON.stringify(requestBody);
                    }

                } catch (error) {
                    console.log(error);
                    throw "operation is not success";
                }
            }
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement<br>
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function promptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result = true;
            let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement";

            /***********************************************************************************
             * Preparing requestBody 
             ************************************************************************************/
            try {

                let newHttpClientUuid = await LogicalTerminationPointService.resolveHttpTcpAndOperationClientUuidOfNewRelease()
                let newReleaseHttpClientUuid = newHttpClientUuid.httpClientUuid

                let newReleaseTcpClientUuid = (await logicalTerminationPoint.getServerLtpListAsync(newReleaseHttpClientUuid))[0];

                let applicationName = await httpServerInterface.getApplicationNameAsync();
                let oldReleaseNumber = await httpServerInterface.getReleaseNumberAsync();
                let newApplicationName = await httpClientInterface.getApplicationNameAsync(newReleaseHttpClientUuid)
                let newReleaseNumber = await httpClientInterface.getReleaseNumberAsync(newReleaseHttpClientUuid);
                let applicationAddress = await tcpClientInterface.getRemoteAddressAsync(newReleaseTcpClientUuid);
                let applicationPort = await tcpClientInterface.getRemotePortAsync(newReleaseTcpClientUuid);
                let applicationProtocol = await tcpClientInterface.getRemoteProtocolAsync(newReleaseTcpClientUuid);

                /***********************************************************************************
                 * PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement
                 *   /v1/relay-server-replacement
                 ************************************************************************************/
                let requestBody = {};
                requestBody.currentApplicationName = applicationName;
                requestBody.currentReleaseNumber = oldReleaseNumber;
                requestBody.futureReleaseNumber = newReleaseNumber;
                requestBody.futureApplicationName = newApplicationName;
                requestBody.futureAddress = applicationAddress;
                requestBody.futurePort = applicationPort;
                requestBody.futureProtocol = applicationProtocol;
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                result = await forwardRequest(
                    forwardingKindNameOfTheBequeathOperation,
                    requestBody,
                    user,
                    xCorrelator,
                    traceIndicator + "." + traceIncrementer++,
                    customerJourney
                );
                if (!result) {
                    throw forwardingKindNameOfTheBequeathOperation + "forwarding is not success for the input" + JSON.stringify(requestBody);
                }

            } catch (error) {
                console.log(error);
                throw "operation is not success";
            }

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease<br>
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function promptForBequeathingDataCausesRequestForDeregisteringOfOldRelease(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result = true;
            let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease";

            /***********************************************************************************
             * Preparing requestBody 
             ************************************************************************************/
            try {
                let newHttpClientUuid = await LogicalTerminationPointService.resolveHttpTcpAndOperationClientUuidOfNewRelease()
                let newReleaseHttpClientUuid = newHttpClientUuid.httpClientUuid
                let oldApplicationName = await httpServerInterface.getApplicationNameAsync();
                let oldReleaseNumber = await httpServerInterface.getReleaseNumberAsync();
                let newReleaseNumber = await httpClientInterface.getReleaseNumberAsync(newReleaseHttpClientUuid);
                if (oldReleaseNumber != newReleaseNumber) {
                    /***********************************************************************************
                     * PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement
                     *   /v1/relay-server-replacement
                     ************************************************************************************/
                    let requestBody = {};
                    requestBody.applicationName = oldApplicationName;
                    requestBody.releaseNumber = oldReleaseNumber;
                    requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                    result = await forwardRequest(
                        forwardingKindNameOfTheBequeathOperation,
                        requestBody,
                        user,
                        xCorrelator,
                        traceIndicator + "." + traceIncrementer++,
                        customerJourney
                    );
                    if (!result) {
                        throw forwardingKindNameOfTheBequeathOperation + "forwarding is not success for the input" + JSON.stringify(requestBody);
                    }
                }
            } catch (error) {
                console.log(error);
                throw "operation is not success";
            }

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


/****************************************************************************************
 * Functions utilized by individual services
 ****************************************************************************************/
function getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance) {
    let fcPortOutputLogicalTerminationPointList = [];
    let fcPortList = forwardingConstructInstance[
        onfAttributes.FORWARDING_CONSTRUCT.FC_PORT];
    for (let i = 0; i < fcPortList.length; i++) {
        let fcPort = fcPortList[i];
        let fcPortPortDirection = fcPort[onfAttributes.FC_PORT.PORT_DIRECTION];
        if (fcPortPortDirection == FcPort.portDirectionEnum.OUTPUT) {
            let fclogicalTerminationPoint = fcPort[onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
            fcPortOutputLogicalTerminationPointList.push(fclogicalTerminationPoint);
        }
    }
    return fcPortOutputLogicalTerminationPointList;
}

/**
 * @description This function automates the forwarding construct by calling the appropriate call back operations based on the fcPort input and output directions.
 * @param {String} operationServerUuid operation server uuid of the request url
 * @param {list}   attributeList list of attributes required during forwarding construct automation(to send in the request body)
 * @param {String} user user who initiates this request
 * @param {string} originator originator of the request
 * @param {string} xCorrelator flow id of this request
 * @param {string} traceIndicator trace indicator of the request
 * @param {string} customerJourney customer journey of the request
 **/
function forwardRequest(forwardingKindName, attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
            let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
            let result = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                attributeList,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
