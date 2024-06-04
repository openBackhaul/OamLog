const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const IntegerProfile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const ForwardingProcessingInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/ForwardingProcessingInput');
const ForwardingConstructProcessingService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructProcessingServices');

var traceIndicatorIncrementer;
/**
 * This method performs the set of callback to RegardApplicationCausesSequenceForInquiringOamRecords
 * @param {String} applicationName from {$request.body#application-name}
 * @param {String} releaseNumber from {$request.body#release-number}
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {Promise} promise resolved if-successful then successfully-connected-true or if-unsuccessful successfully-connected-false else promise reject
 * The following are the list of forwarding that will be automated to redirect the RegardApplicationCausesSequenceForInquiringOamRecords
 * 1. CreateLinkForInquiringOamRecords
 * 2. RequestForInquiringOamRecords
 * 3. CreateLinkForReceivingOamRecords
 */
exports.regardApplication = function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney, _traceIndicatorIncrementer) {
    return new Promise(async function (resolve, reject) {
        try {
            if (_traceIndicatorIncrementer !== 0) {
                traceIndicatorIncrementer = _traceIndicatorIncrementer;
            }
            const result = await CreateLinkForInquiringOamRecords(applicationName, releaseNumber, user, 
                xCorrelator, traceIndicator, customerJourney)
            if(!result['data']['client-successfully-added'] || result['status'] != 200){
                resolve(
                    { 
                        "successfully-connected": false,
                        "reason-of-failure": `OL_${result['data']['reason-of-failure']}`
                    }
                );
            }
            else{
                let forwardingKindName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords";
                let operationClientUuid = await getConsequentOperationClientUuid(forwardingKindName, applicationName, releaseNumber);
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
                    
                    if(result['status'] != 204){
                        resolve(
                            { 
                                "successfully-connected": false,
                                "reason-of-failure": `OL_${result['data']['reason-of-failure']}`
                            }
                        );
                    }
                    else{
                        
                        let attempts = 1;
                        let maximumNumberOfAttemptsToCreateLink = await IntegerProfile.getIntegerValueForTheIntegerProfileNameAsync("maximumNumberOfAttemptsToCreateLink");
                        for(let i=0; i < maximumNumberOfAttemptsToCreateLink; i++){
                            const result = await CreateLinkForReceivingOamRecords(applicationName, releaseNumber, user, 
                                xCorrelator, traceIndicator, customerJourney)
                            if((attempts<=maximumNumberOfAttemptsToCreateLink) 
                                && (result['data']['client-successfully-added'] == false) 
                                && ((result['data']['reason-of-failure'] == "ALT_SERVING_APPLICATION_NAME_UNKNOWN") 
                                || (result['data']['reason-of-failure'] == "ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN")))
                            {
                                attempts = attempts+1;
                            }else{
                                if(!result['data']['client-successfully-added'] || result['status'] != 200){
                                    resolve(
                                        { 
                                            "successfully-connected": false,
                                            "reason-of-failure": `OL_${result['data']['reason-of-failure']}`
                                        }
                                    );
                                    break;
                                }else{
                                    // forwardingKindName = "OamRequestCausesLoggingRequest";
                                    // let servingApplication = await HttpServerInterface.getApplicationNameAsync();
                                    // let servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
                                    // operationClientUuid = await getConsequentOperationClientUuid(forwardingKindName, servingApplication, servingApplicationReleaseNumber);
                                    // isOperationKeyUpdated = await isOperationKeyUpdatedOrNot(operationClientUuid);
                                    if(!isOperationKeyUpdated){
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
                                            { 
                                                "successfully-connected": true 
                                            }
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
                let operationClientUuid = await getConsequentOperationClientUuid(forwardingKindName, applicationName, releaseNumber);
                let operationName = await OperationClientInterface.getOperationNameAsync(operationClientUuid);
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
                let OAMLogApplication = await HttpServerInterface.getApplicationNameAsync();
                let OAMLogApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
                let operationClientUuid = await getConsequentOperationClientUuid(forwardingKindName, OAMLogApplication, OAMLogApplicationReleaseNumber);
                let operationName = await OperationClientInterface.getOperationNameAsync(operationClientUuid);
                redirectOamRequestRequestBody['oam-log-application'] = OAMLogApplication;
                redirectOamRequestRequestBody['oam-log-application-release-number'] = OAMLogApplicationReleaseNumber;
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
                let servingApplication = await HttpServerInterface.getApplicationNameAsync();
                let servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
                let operationClientUuid = await getConsequentOperationClientUuid(forwardingKindName, servingApplication, servingApplicationReleaseNumber);
                let operationName = await OperationClientInterface.getOperationNameAsync(operationClientUuid);
                requestBody['serving-application-name'] = servingApplication;
                requestBody['serving-application-release-number'] = servingApplicationReleaseNumber;
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

async function getConsequentOperationClientUuid(forwardingName, applicationName, releaseNumber) {
    let forwardingConstruct = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(
        forwardingName);
    let fcPortList = forwardingConstruct["fc-port"];
    for (let fcPort of fcPortList) {
        let fcPortDirection = fcPort["port-direction"];
        if (fcPortDirection == FcPort.portDirectionEnum.OUTPUT) {
            let fcLogicalTerminationPoint = fcPort["logical-termination-point"];
            let serverLtpList = await LogicalTerminationPoint.getServerLtpListAsync(fcLogicalTerminationPoint);
            let httpClientUuid = serverLtpList[0];
            let applicationNameOfClient = await HttpClientInterface.getApplicationNameAsync(httpClientUuid);
            let releaseNumberOfClient = await HttpClientInterface.getReleaseNumberAsync(httpClientUuid);
            if (applicationNameOfClient == applicationName && releaseNumberOfClient == releaseNumber) {
                return fcLogicalTerminationPoint;
            }
        }
    }
    return undefined;
}