const forwardingConstructAutomationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/AutomationInput');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const prepareALTForwardingAutomation = require('onf-core-model-ap-bs/basicServices/services/PrepareALTForwardingAutomation');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const IntegerProfile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');

exports.regardApplication = function (logicalTerminationPointconfigurationStatus,
    forwardingConstructConfigurationStatus, applicationName, releaseNumber, operationServerName,
    user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            const result = await CreateLinkForInquiringOamRecords(applicationName, releaseNumber, user, 
                xCorrelator, traceIndicator, customerJourney)
            if(!result['client-successfully-added'] || result.code != 200){
                resolve(result);
            }
            else{
                let operationName = '/v1/redirect-service-request-information';
                let httpClientUuid = await HttpClientInterface.getHttpClientUuidAsync(applicationName, releaseNumber);
                let operationClientUuid = await OperationClientInterface.getOperationClientUuidAsync(httpClientUuid, operationName);
                let timestampOfCurrentRequest = new Date();
                OperationClientInterface.turnONNotificationChannel(timestampOfCurrentRequest);
                let waitTime = await IntegerProfile.getIntegerValueForTheIntegerProfileNameAsync("maximumWaitTimeToReceiveOperationKey");
                let isOperationKeyUpdated = await OperationClientInterface.waitUntilOperationKeyIsUpdated(operationClientUuid, timestampOfCurrentRequest, waitTime);
                OperationClientInterface.turnOFFNotificationChannel(timestampOfCurrentRequest);
                if(!isOperationKeyUpdated){
                    resolve(
                        { 'successfully-connected': false }
                    );
                }else{
                    const result = await RequestForInquiringOamRecords(logicalTerminationPointconfigurationStatus, forwardingConstructConfigurationStatus, 
                        applicationName, releaseNumber, operationServerName, user, xCorrelator, traceIndicator, customerJourney)
                    
                    if(!result['client-successfully-added'] || result.code != 200){
                        resolve(result);
                    }
                    else{
                        
                        let attempts = 1;
                        let maximumNumberOfAttemptsToCreateLink = await IntegerProfile.getIntegerValueForTheIntegerProfileNameAsync("maximumNumberOfAttemptsToCreateLink");
                        for(let i=0; i < maximumNumberOfAttemptsToCreateLink; i++){
                            const result = await CreateLinkForReceivingOamRecords(applicationName, releaseNumber, user, 
                                xCorrelator, traceIndicator, customerJourney)
                            if((attempts<=maximumNumberOfAttemptsToCreateLink) 
                                && (result['client-successfully-added'] == false) 
                                && ((result['reason-of-failure'] == "ALT_SERVING_APPLICATION_NAME_UNKNOWN") 
                                || (result['reason-of-failure'] == "ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN")))
                            {
                                attempts = attempts+1;
                            }else{
                                if(!result['client-successfully-added'] || result.code != 200){
                                    resolve(result);
                                }else{
                                    if(!isOperationKeyUpdated){
                                        resolve(
                                            { 'successfully-connected': false }
                                        );
                                        break;
                                    }
                                    else{
                                        resolve(
                                            { 'successfully-connected': true }
                                        );
                                        break;
                                    }
                                }
                            }  
                        }
                        
                    }
                }
                
            }
                     
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Prepare attributes and automate RegardApplicationCausesSequenceForInquiringOamRecords.CreateLinkForInquiringOamRecords<br>
 * @param {String} applicationName from {$request.body#application-name}
 * @param {String} releaseNumber from {$request.body#release-number}
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {Promise} if operation success then promise resolved with client-successfully-added: boolean, reason-of-failure: string else promise reject
 */
async function CreateLinkForInquiringOamRecords(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let forwardingKindNameOfInquiringServiceRecords = "RegardApplicationCausesSequenceForInquiringOamRecords.CreateLinkForInquiringOamRecords";
            try {
                let requestBody = {};
                requestBody['serving-application-name'] = applicationName;
                requestBody['serving-application-release-number'] = releaseNumber;
                requestBody['operation-name'] = "/v1/redirect-service-request-information";
                requestBody['consuming-application-name'] = await HttpServerInterface.getApplicationNameAsync();
                requestBody['consuming-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();    
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                result = await forwardRequest(
                    forwardingKindNameOfInquiringServiceRecords,
                    requestBody,
                    user,
                    xCorrelator,
                    traceIndicator,
                    customerJourney
                );
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

async function RequestForInquiringOamRecords(logicalTerminationPointconfigurationStatus, forwardingConstructConfigurationStatus, applicationName, releaseNumber, 
    operationServerName, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {
            /********************************************************************************************************
             * RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords /v1/redirect-oam-request-information
             ********************************************************************************************************/
            let redirectOamRequestForwardingName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
            let redirectOamRequestContext = applicationName + releaseNumber;
            let redirectOamRequestRequestBody = {};
            redirectOamRequestRequestBody['oam-log-application'] = await HttpServerInterface.getApplicationNameAsync();
            redirectOamRequestRequestBody['oam-log-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();
            redirectOamRequestRequestBody['oam-log-operation'] = "/v1/record-oam-request";
            redirectOamRequestRequestBody['oam-log-address'] = await tcpServerInterface.getLocalAddressForForwarding();
            redirectOamRequestRequestBody['oam-log-port'] = await tcpServerInterface.getLocalPort();
            redirectOamRequestRequestBody['oam-log-protocol'] = await tcpServerInterface.getLocalProtocol();
            redirectOamRequestRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(redirectOamRequestRequestBody);
            let forwardingAutomation = new forwardingConstructAutomationInput(
                redirectOamRequestForwardingName,
                redirectOamRequestRequestBody,
                redirectOamRequestContext
            );
            forwardingConstructAutomationList.push(forwardingAutomation);

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                forwardingConstructConfigurationStatus
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            const result = await ForwardingAutomationService.automateForwardingConstructAsync(
                operationServerName,
                forwardingConstructAutomationList,
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

/**
 * Prepare attributes and automate RegardApplicationCausesSequenceForInquiringServiceRecords.CreateLinkForSendingServiceRecords<br>
 * @param {String} applicationName from {$request.body#application-name}
 * @param {String} releaseNumber from {$request.body#release-number}
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {Promise} if operation success then promise resolved with client-successfully-added: boolean, reason-of-failure: string else promise reject
 */
async function CreateLinkForReceivingOamRecords(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let forwardingKindNameOfInquiringServiceRecords = "RegardApplicationCausesSequenceForInquiringOamRecords.CreateLinkForReceivingOamRecords";
            try {
                let requestBody = {};
                requestBody['serving-application-name'] = await HttpServerInterface.getApplicationNameAsync();
                requestBody['serving-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();
                requestBody['operation-name'] = "/v1/record-service-request";
                requestBody['consuming-application-name'] = applicationName;
                requestBody['consuming-application-release-number'] = releaseNumber;    
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                result = await forwardRequest(
                    forwardingKindNameOfInquiringServiceRecords,
                    requestBody,
                    user,
                    xCorrelator,
                    traceIndicator,
                    customerJourney
                );
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

exports.disregardApplication = function (logicalTerminationPointconfigurationStatus, forwardingConstructConfigurationStatus) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTUnConfigureForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                forwardingConstructConfigurationStatus
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.bequeathYourDataAndDie = function (logicalTerminationPointconfigurationStatus) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                undefined
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.OAMLayerRequest = function (uuid) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputForOamRequestAsync(
                uuid
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * @description This function automates the forwarding construct by calling the appropriate call back operations based on the fcPort input and output directions.
 * @param {String} forwardingKindName
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
