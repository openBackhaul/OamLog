const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const prepareALTForwardingAutomation = require('onf-core-model-ap-bs/basicServices/services/PrepareALTForwardingAutomation');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const IntegerProfile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const ForwardingProcessingInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/ForwardingProcessingInput');
const ForwardingConstructProcessingService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructProcessingServices');

var traceIndicatorIncrementer = 1;
exports.regardApplication = function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney, _traceIndicatorIncrementer) {
    return new Promise(async function (resolve, reject) {
        try {
            if (_traceIndicatorIncrementer !== 0) {
                traceIndicatorIncrementer = _traceIndicatorIncrementer;
            }
            const result = await CreateLinkForInquiringOamRecords(applicationName, releaseNumber, user, 
                xCorrelator, traceIndicator, customerJourney)
            if(!result.data['client-successfully-added'] || result.status != 200){
                resolve(result);
            }
            else{
                let forwardingKindName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
                let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
                let clientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
                let operationName = OperationClientInterface.getOperationNameAsync(clientUuid);
                let httpClientUuid = await HttpClientInterface.getHttpClientUuidAsync(applicationName, releaseNumber);
                let operationClientUuid = await OperationClientInterface.getOperationClientUuidAsync(httpClientUuid, operationName);
                let isOperationKeyUpdated = await isOperationKeyUpdatedOrNot(operationClientUuid);
                if(!isOperationKeyUpdated){
                    resolve(
                        { 
                            "successfully-connected": false,
                            "reason-of-failure": "OL_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                        }
                    );
                }else{
                    const result = await RequestForInquiringOamRecords(user, xCorrelator, traceIndicator, customerJourney)
                    
                    if(!result.data['client-successfully-added'] || result.status != 200){
                        resolve(result);
                    }
                    else{
                        
                        let attempts = 1;
                        let maximumNumberOfAttemptsToCreateLink = await IntegerProfile.getIntegerValueForTheIntegerProfileNameAsync("maximumNumberOfAttemptsToCreateLink");
                        for(let i=0; i < maximumNumberOfAttemptsToCreateLink; i++){
                            const result = await CreateLinkForReceivingOamRecords(applicationName, releaseNumber, user, 
                                xCorrelator, traceIndicator, customerJourney)
                            if((attempts<=maximumNumberOfAttemptsToCreateLink) 
                                && (result.data['client-successfully-added'] == false) 
                                && ((result.data['reason-of-failure'] == "ALT_SERVING_APPLICATION_NAME_UNKNOWN") 
                                || (result.data['reason-of-failure'] == "ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN")))
                            {
                                attempts = attempts+1;
                            }else{
                                if(!result.data['client-successfully-added'] || result.status != 200){
                                    resolve(result);
                                    break;
                                }else{
                                    forwardingKindName = "OamRequestCausesLoggingRequest";
                                    forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
                                    operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
                                    let newOperationKeyUpdated = await isOperationKeyUpdatedOrNot(operationClientUuid);
                                    if(!newOperationKeyUpdated){
                                        resolve(
                                            { 
                                                "successfully-connected": false,
                                                "reason-of-failure": "OL_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                                            }
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
            let result;
            try {
                let requestBody = {};
                let forwardingKindName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
                let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
                let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
                let operationName = OperationClientInterface.getOperationNameAsync(operationClientUuid);
                requestBody['serving-application-name'] = applicationName;
                requestBody['serving-application-release-number'] = releaseNumber;
                requestBody['operation-name'] = operationName;
                requestBody['consuming-application-name'] = await HttpServerInterface.getApplicationNameAsync();
                requestBody['consuming-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();    
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                
                let forwardingAutomation = new ForwardingProcessingInput(
                    forwardingKindNameOfInquiringServiceRecords,
                    requestBody
                );
                result = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                    forwardingAutomation,
                    user,
                    xCorrelator,
                    traceIndicator + "." + traceIndicatorIncrementer++,
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

async function RequestForInquiringOamRecords(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            /********************************************************************************************************
             * RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords /v1/redirect-oam-request-information
             ********************************************************************************************************/
            let redirectOamRequestForwardingName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
            let result;
            let redirectOamRequestRequestBody = {};
            try {
                let forwardingKindName = "OamRequestCausesLoggingRequest";
                let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
                let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
                let operationName = OperationClientInterface.getOperationNameAsync(operationClientUuid);
                redirectOamRequestRequestBody['oam-log-application'] = await HttpServerInterface.getApplicationNameAsync();
                redirectOamRequestRequestBody['oam-log-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();
                redirectOamRequestRequestBody['oam-log-operation'] = operationName;
                redirectOamRequestRequestBody['oam-log-address'] = await tcpServerInterface.getLocalAddressForForwarding();
                redirectOamRequestRequestBody['oam-log-port'] = await tcpServerInterface.getLocalPort();
                redirectOamRequestRequestBody['oam-log-protocol'] = await tcpServerInterface.getLocalProtocol();
                redirectOamRequestRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(redirectOamRequestRequestBody);
                
                let forwardingAutomation = new ForwardingProcessingInput(
                    redirectOamRequestForwardingName,
                    redirectOamRequestRequestBody
                );
                result = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                    forwardingAutomation,
                    user,
                    xCorrelator,
                    traceIndicator + "." + traceIndicatorIncrementer++,
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
            let result;
            try {
                let requestBody = {};
                let forwardingKindName = "OamRequestCausesLoggingRequest";
                let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
                let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
                let operationName = OperationClientInterface.getOperationNameAsync(operationClientUuid);
                requestBody['serving-application-name'] = await HttpServerInterface.getApplicationNameAsync();
                requestBody['serving-application-release-number'] = await HttpServerInterface.getReleaseNumberAsync();
                requestBody['operation-name'] = operationName;
                requestBody['consuming-application-name'] = applicationName;
                requestBody['consuming-application-release-number'] = releaseNumber;    
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                
                let forwardingAutomation = new ForwardingProcessingInput(
                    forwardingKindNameOfInquiringServiceRecords,
                    requestBody
                );
                result = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                    forwardingAutomation,
                    user,
                    xCorrelator,
                    traceIndicator + "." + traceIndicatorIncrementer++,
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

function isOperationKeyUpdatedOrNot(operationClientUuid) {
    return new Promise(async function (resolve, reject) {
        try {
            let timestampOfCurrentRequest = new Date();
            OperationClientInterface.turnONNotificationChannel(timestampOfCurrentRequest);
            let waitTime = await IntegerProfile.getIntegerValueForTheIntegerProfileNameAsync("maximumWaitTimeToReceiveOperationKey");
            let result = await OperationClientInterface.waitUntilOperationKeyIsUpdated(operationClientUuid, timestampOfCurrentRequest, waitTime);
            OperationClientInterface.turnOFFNotificationChannel(timestampOfCurrentRequest);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}
