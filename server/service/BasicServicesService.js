'use strict';
const operationServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const httpServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const tcpServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const forwardingConstructService = require('../applicationPattern/onfModel/services/ForwardingConstructService');
const logicalTerminationPointService = require('../applicationPattern/onfModel/services/LogicalTerminationPointService');
const consequentAction = require('../applicationPattern/rest/server/responseBody/ConsequentAction');
const responseValue = require('../applicationPattern/rest/server/responseBody/ResponseValue');
const onfAttributeFormatter = require('../applicationPattern/onfModel/utility/OnfAttributeFormatter');
const fileOperation = require('../applicationPattern/databaseDriver/JSONDriver.js');
const layerProtocol = require('../applicationPattern/onfModel/models/LayerProtocol');
const operationClientInterface = require('../applicationPattern/onfModel/models/layerprotocols/OperationClientInterface');
const httpClientInterface = require('../applicationPattern/onfModel/models/layerprotocols/HttpClientInterface');
const logicalTerminationPoint = require('../applicationPattern/OnfModel/models/LogicalTerminationPoint');
const tcpClientInterface = require('../applicationPattern/OnfModel/models/layerprotocols/TcpClientInterface');
const forwardingDomain = require('../applicationPattern/OnfModel/models/ForwardingDomain');
const forwardingConstruct = require('../applicationPattern/onfModel/models/ForwardingConstruct');

const serviceType = "Basic";
const protocol = "http";
const applicationPrefix = "ol";

/**
 *@description Embed yourself into the MBH SDN application layer
 *
 *@param {String} body V1_embedyourself_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.embedYourself = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["registry-office-application"];
      let releaseNumber = body["registry-office-application-release-number"];
      let applicationAddress = body["registry-office-address"];
      let applicationPort = body["registry-office-port"];
      let replayServerReplacementOperation = body["relay-server-replacement-operation"];
      let deregisterOperation = body["deregistration-operation"];
      let replayOperationUpdateOperation = body["relay-operation-update-operation"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [replayServerReplacementOperation, deregisterOperation, replayOperationUpdateOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let deregisterApplicationOperationClientUuid;
        let replayServerReplacementOperationClientUuid;
        let replayOperationUpdateOperationClientUuid;
        for (let i = 0; i < createdOperationInstanceInformationList.length; i++) {
          let operationClientInstance = createdOperationInstanceInformationList[i];
          if (operationClientInstance.operationName.includes(deregisterOperation)) {
            deregisterApplicationOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName.includes(replayServerReplacementOperation)) {
            replayServerReplacementOperationClientUuid = operationClientInstance.uuid;
          } else {
            replayOperationUpdateOperationClientUuid = operationClientInstance.uuid;
          }
        }
        forwardingConstructConfigurationList = [{
            "forwardingName": "PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease",
            "OperationClientUuid": deregisterApplicationOperationClientUuid
          },
          {
            "forwardingName": "PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement",
            "OperationClientUuid": replayServerReplacementOperationClientUuid
          },
          {
            "forwardingName": "PromptingNewReleaseForUpdatingServerCausesRequestForBroadcastingInfoAboutBackwardCompatibleUpdateOfOperation",
            "OperationClientUuid": replayOperationUpdateOperationClientUuid
          }
        ];

        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let attributeList = [{
            "name": "new-application-name",
            "value": applicationName
          },
          {
            "name": "new-application-release",
            "value": releaseNumber
          },
          {
            "name": "new-application-address",
            "value": applicationAddress
          },
          {
            "name": "new-application-port",
            "value": applicationPort
          }
        ]
        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList,
          user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Stops sending notifications of a specific subscription
 *
 *@param {String} body V1_endsubscription_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.endSubscription = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * get request body
       ****************************************************************************************/
      let subscriberApplication = body["subscriber-application"];
      let subscriberReleaseNumber = body["subscriber-release-number"];
      let subscription = body["subscription"];

      /******************************************************************************************************************
       * perform bussiness logic (to unsubscribe notifications)
       * =========================================================
       * 1. Finds the http-client-interface for the application and release number
       * 2. Finds the list of operation clients(operationClientList) associated to the http-client-interface
       * 3. Finds the list of forwarding construct that are responsible for the subscription(Management)
       * 4. Finds the list of output fc-ports associated with the forwarding construct
       * 5. For each fc-port , if a match is present in the operationClientList then perform step 6 to 8
       * 6. Find the forwardingKind of the forwardingConstruct
       * 7. If the forwardingKind is of type INVARIANT_PROCESS_SNIPPET , then modify the logical-termination-point to -1
       * 8. If the forwardingKind is not of type INVARIANT_PROCESS_SNIPPET , then delete the fc-port from the fc-port list
       *******************************************************************************************************************/
      let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(subscriberApplication, subscriberReleaseNumber);
      let operationClientList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);

      if (httpClientUuid != undefined) {
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(subscription);
        let forwardingConstructListForTheSubscription = await forwardingDomain.getForwardingConstructListForTheFcPortManagementDirection(operationServerUuid);

        for (let i = 0; i < forwardingConstructListForTheSubscription.length; i++) {
          let forwardingConstructUuid = forwardingConstructListForTheSubscription[i].uuid;
          let forwardingConstructKind = await forwardingConstruct.getForwardingKindForTheUuid(forwardingConstructUuid);
          let fcPortOutputList = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheUuid(forwardingConstructUuid);

          for (let j = 0; j < fcPortOutputList.length; j++) {

            if (operationClientList.includes(fcPortOutputList[j])) {
              let localIdOfFcPort = await forwardingConstruct.getFcPortLocalId(forwardingConstructUuid, fcPortOutputList[j]);

              if (forwardingConstructKind == forwardingConstruct.name.forwardingConstructKindEnum.INVARIANT_PROCESS_SNIPPET) {
                await forwardingConstruct.modifyFcPortLogicalTerminationPointUuid(forwardingConstructUuid, localIdOfFcPort, "-1");
              } else {
                await forwardingConstruct.deleteFcPort(forwardingConstructUuid, localIdOfFcPort);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *@description Returns administrative information
 *
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *@returns inline_response_200_4
 **/
exports.informAboutApplication = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing response body
       ****************************************************************************************/
      let applicationInformation = {};
      let httpServerCapability = await httpServerInterface.getHttpServerCapability();
      Object.entries(httpServerCapability).map(entry => {
        let key = entry[0];
        let value = entry[1];
        if (key != "release-list") {
          applicationInformation[key] = value;
        }
      });

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = applicationInformation;
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *@description Returns administrative information for generic representation
 *
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *@returns inline_response_200_5
 **/
exports.informAboutApplicationInGenericRepresentation = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing consequent-action-list for response body
       ****************************************************************************************/
      let consequentActionList = [];
      let baseUrl = protocol + "://" + await tcpServerInterface.getLocalAddress() + ":" + await tcpServerInterface.getLocalPort();
      let LabelForReleaseHistory = "Release History";
      let LabelForAPIDocumentation = "API Documentation";
      let requestForReleaseHistory = baseUrl + await operationServerInterface.getOperationName(applicationPrefix+"-0-0-1-op-s-2004");
      let requestForAPIDocumentation = baseUrl + "/v1/inform-about-api";
      let consequentActionForReleaseHistory = new consequentAction(LabelForReleaseHistory, requestForReleaseHistory);
      let consequentActionForAPIDocumentation = new consequentAction(LabelForAPIDocumentation, requestForAPIDocumentation);
      consequentActionList.push(consequentActionForReleaseHistory);
      consequentActionList.push(consequentActionForAPIDocumentation);

      /****************************************************************************************
       * Preparing response-value-list for response body
       ****************************************************************************************/
      let responseValueList = [];
      let httpServerCapability = await httpServerInterface.getHttpServerCapability();
      Object.entries(httpServerCapability).map(entry => {
        let key = onfAttributeFormatter.modifyKebabCaseToLowerCamelCase(entry[0]);
        let value = entry[1];
        if (key != "releaseList") {
          let reponseValue = new responseValue(key, value, typeof value);
          responseValueList.push(reponseValue);
        }
      });

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase({
        consequentActionList,
        responseValueList
      });

    } catch (error) {
      console.log(error);
    }

    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });

}


/**
 *@description Returns release history
 *
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *@returns List
 **/
exports.informAboutReleaseHistory = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing response body
       ****************************************************************************************/
      let releaseList = await httpServerInterface.getReleaseList();

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = releaseList;
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *@description Returns release history for generic representation
 *
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *@returns inline_response_200_7
 **/
exports.informAboutReleaseHistoryInGenericRepresentation = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing consequent-action-list for response body
       ****************************************************************************************/
      let consequentActionList = [];

      /****************************************************************************************
       * Preparing response-value-list for response body
       ****************************************************************************************/
      let responseValueList = [];
      let releaseList = await httpServerInterface.getReleaseList();
      for (let i = 0; i < releaseList.length; i++) {
        let release = releaseList[i];
        let releaseNumber = release["release-number"];
        let releaseDateAndChanges = release["release-date"] + " - " + release["changes"];
        let reponseValue = new responseValue(releaseNumber, releaseDateAndChanges, typeof releaseDateAndChanges);
        responseValueList.push(reponseValue);
      }

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase({
        consequentActionList,
        responseValueList
      });
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *@description Receives information about where to ask for approval of OaM requests
 *
 *@param {String} body V1_inquireoamrequestapprovals_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.inquireOamRequestApprovals = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["oam-approval-application"];
      let releaseNumber = body["oam-approval-application-release-number"];
      let applicationAddress = body["oam-approval-address"];
      let applicationPort = body["oam-approval-port"];
      let oamApprovalOperation = body["oam-approval-operation"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [oamApprovalOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let requestOamApprovalUuid = createdOperationInstanceInformationList[0].uuid;
        forwardingConstructConfigurationList = [{
          "forwardingName": "OamRequestCausesInquiryForAuthentication",
          "OperationClientUuid": requestOamApprovalUuid
        }];
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let attributeList = [];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList,
          user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Allows retrieving all interface and internal connection data
 *
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *@returns inline_response_200_3
 **/
exports.listLtpsAndFcs = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing response body
       ****************************************************************************************/
      let forwardingDomainUrl = "/core-model-1-4:control-construct/forwarding-domain";
      let forwardingDomain = {
        "core-model-1-4:control-construct": {
          "forwarding-domain": await fileOperation.readFromDatabase(forwardingDomainUrl)
        }
      };

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = forwardingDomain;
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}



/**
 *@description Offers configuring the client side for sending OaM request information
 *
 *@param {String} body V1_redirectoamrequestinformation_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.redirectOamRequestInformation = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["oam-log-application"];
      let releaseNumber = body["oam-log-application-release-number"];
      let applicationAddress = body["oam-log-address"];
      let applicationPort = body["oam-log-port"];
      let oamLogOperation = body["oam-log-operation"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [oamLogOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let oamLogClientUuid = createdOperationInstanceInformationList[0].uuid;
        forwardingConstructConfigurationList = [{
          "forwardingName": "OamRequestCausesLoggingRequest",
          "OperationClientUuid": oamLogClientUuid
        }];
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let attributeList = [];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Offers configuring the client side for sending service request information
 *
 *@param {String} body V1_redirectservicerequestinformation_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 *no response value expected for this operation
 **/
exports.redirectServiceRequestInformation = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["service-log-application"];
      let releaseNumber = body["service-log-application-release-number"];
      let applicationAddress = body["service-log-address"];
      let applicationPort = body["service-log-port"];
      let serviceLogOperation = body["service-log-operation"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [serviceLogOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let serviceLogClientUuid = createdOperationInstanceInformationList[0].uuid;
        forwardingConstructConfigurationList = [{
          "forwardingName": "ServiceRequestCausesLoggingRequest",
          "OperationClientUuid": serviceLogClientUuid
        }];
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let attributeList = [];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Offers configuring client side for sending information about topology changes
 *
 *@param {String} body V1_redirecttopologychangeinformation_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.redirectTopologyChangeInformation = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["topology-application"];
      let releaseNumber = body["topology-application-release-number"];
      let applicationAddress = body["topology-application-address"];
      let applicationPort = body["topology-application-port"];
      let applicationUpdateTopologyOperation = body["topology-operation-application-update"];
      let ltpUpdateTopologyOperation = body["topology-operation-ltp-update"];
      let ltpDeletionTopologyOperation = body["topology-operation-ltp-deletion"];
      let fcUpdateTopologyOperation = body["topology-operation-fc-update"];
      let fcPortUpdateTopologyOperation = body["topology-operation-fc-port-update"];
      let fcPortDeletionTopologyOperation = body["topology-operation-fc-port-deletion"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [applicationUpdateTopologyOperation, ltpUpdateTopologyOperation, ltpDeletionTopologyOperation,
        fcUpdateTopologyOperation, fcPortUpdateTopologyOperation, fcPortDeletionTopologyOperation
      ];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let applicationUpdateOperationClientUuid;
        let ltpUpdateOperationClientUuid;
        let ltpDeletionOperationClientUuid;
        let fcUpdateOperationClientUuid;
        let fcPortUpdateOperationClientUuid;
        let fcPortDeletionOperationClientUuid;

        for (let i = 0; i < createdOperationInstanceInformationList.length; i++) {
          let operationClientInstance = createdOperationInstanceInformationList[i];
          if (operationClientInstance.operationName == applicationUpdateTopologyOperation) {
            applicationUpdateOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName == ltpUpdateTopologyOperation) {
            ltpUpdateOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName == ltpDeletionTopologyOperation) {
            ltpDeletionOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName == fcUpdateTopologyOperation) {
            fcUpdateOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName == fcPortUpdateTopologyOperation) {
            fcPortUpdateOperationClientUuid = operationClientInstance.uuid;
          } else if (operationClientInstance.operationName == fcPortDeletionTopologyOperation) {
            fcPortDeletionOperationClientUuid = operationClientInstance.uuid;
          }
        }

        forwardingConstructConfigurationList = [{
            "forwardingName": "PromptForBequeathingDataCausesALTbeingRequestedToUpdateTopologyInfoAboutNewApplication",
            "OperationClientUuid": applicationUpdateOperationClientUuid
          },
          {
            "forwardingName": "ServiceRequestCausesLtpUpdateRequest",
            "OperationClientUuid": ltpUpdateOperationClientUuid
          },
          {
            "forwardingName": "OamRequestCausesLtpUpdateRequest",
            "OperationClientUuid": ltpUpdateOperationClientUuid
          },
          {
            "forwardingName": "ServiceRequestCausesLtpDeletionRequest",
            "OperationClientUuid": ltpDeletionOperationClientUuid
          },
          {
            "forwardingName": "OamRequestCausesLtpDeletionRequest",
            "OperationClientUuid": ltpDeletionOperationClientUuid
          },
          {
            "forwardingName": "ServiceRequestCausesFcUpdateRequest",
            "OperationClientUuid": fcUpdateOperationClientUuid
          },
          {
            "forwardingName": "OamRequestCausesFcUpdateRequest",
            "OperationClientUuid": fcUpdateOperationClientUuid
          },
          {
            "forwardingName": "ServiceRequestCausesFcPortUpdateRequest",
            "OperationClientUuid": fcPortUpdateOperationClientUuid
          },
          {
            "forwardingName": "OamRequestCausesFcPortUpdateRequest",
            "OperationClientUuid": fcPortUpdateOperationClientUuid
          },
          {
            "forwardingName": "ServiceRequestCausesFcPortDeletionRequest",
            "OperationClientUuid": fcPortDeletionOperationClientUuid
          },
          {
            "forwardingName": "OamRequestCausesFcPortDeletionRequest",
            "OperationClientUuid": fcPortDeletionOperationClientUuid
          }
        ];
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let attributeList = [];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Initiates registering at the currently active RegistryOffice
 * Shall also automatically execute without receiving any request every time the application starts
 *
 *@param {String} body V1_registeryourself_body  (optional)
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.registerYourself = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {
      let applicationName = body["registry-office-application"];
      let releaseNumber = body["registry-office-application-release-number"];
      let applicationAddress = body["registry-office-address"];
      let applicationPort = body["registry-office-port"];
      let registerApplicationOperation = body["registration-operation"];


      let operationList = [registerApplicationOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.updateLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let forwardingConstructConfigurationList = [];
      if (createdOperationInstanceInformationList.length > 0) {
        let registerApplicationOperationUuid = createdOperationInstanceInformationList[0].uuid;
        forwardingConstructConfigurationList = [{
          "forwardingName": "PromptForRegisteringCausesRegistrationRequest",
          "OperationClientUuid": registerApplicationOperationUuid
        }];
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        let currentApplicationName = await httpServerInterface.getApplicationName();
        let currentApplicationReleaseNumber = await httpServerInterface.getReleaseNumber();
        let currentApplicationAddress = await tcpServerInterface.getLocalAddress();
        let currentApplicationPort = await tcpServerInterface.getLocalPort();
        let embedYourselfOperation = await operationServerInterface.getOperationName(applicationPrefix+"-0-0-1-op-s-0001");
        let updateClientOperation = await operationServerInterface.getOperationName(applicationPrefix+"-0-0-1-op-s-0007");
        let attributeList = [{
            "name": "application-name",
            "value": currentApplicationName
          },
          {
            "name": "application-release-number",
            "value": currentApplicationReleaseNumber
          },
          {
            "name": "application-address",
            "value": currentApplicationAddress
          },
          {
            "name": "application-port",
            "value": currentApplicationPort
          },
          {
            "name": "embedding-operation",
            "value": embedYourselfOperation
          },
          {
            "name": "client-update-operation",
            "value": updateClientOperation
          }
        ];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 *@description Allows updating connection data of a serving application
 *
 *@param {String} body V1_updateclient_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.updateClient = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * get request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let oldApplicationReleaseNumber = body["old-application-release-number"];
      let newApplicationReleaseNumber = body["new-application-release-number"];
      let newApplicationAddress = body["new-application-address"];
      let newApplicationPort = body["new-application-port"];

      /****************************************************************************************
       * perform bussiness logic
       ****************************************************************************************/
      let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, oldApplicationReleaseNumber);
      if (httpClientUuid != undefined) {
        let tcpClientUuid = (await logicalTerminationPoint.getServerLtpList(httpClientUuid))[0];
        if (tcpClientUuid != undefined) {
          await httpClientInterface.setReleaseNumber(httpClientUuid, newApplicationReleaseNumber);
          await tcpClientInterface.setTcpRemoteAddressAndPortForTheUuid(tcpClientUuid, newApplicationAddress, newApplicationPort);

          /****************************************************************************************
           * Prepare attributes to configure forwarding-construct
           ****************************************************************************************/
          let forwardingConstructConfigurationList = [];
          let attributeList = [];

          /****************************************************************************************
           * Configure and automate forwarding construct
           ****************************************************************************************/
          let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
          forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
            forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}



/**
 *@description Allows updating operation clients to redirect to backward compatible services
 *
 *@param {String} body V1_updateoperationclient_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.updateOperationClient = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * get request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let applicationReleaseNumber = body["application-release-number"];
      let oldOperationName = body["old-operation-name"];
      let newOperationName = body["new-operation-name"];

      /****************************************************************************************
       * perform bussiness logic
       ****************************************************************************************/
      let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, applicationReleaseNumber);
      if (httpClientUuid != undefined) {
        let operationClientUuid = await operationClientInterface.getOperationClientUuidForTheOperationName(httpClientUuid,oldOperationName);
        if (operationClientUuid != undefined) {
          await operationClientInterface.setOperationNameForTheUuid(operationClientUuid, newOperationName);

          /****************************************************************************************
           * Prepare attributes to configure forwarding-construct
           ****************************************************************************************/
          let forwardingConstructConfigurationList = [];
          let attributeList = [];

          /****************************************************************************************
           * Configure and automate forwarding construct
           ****************************************************************************************/
          let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
          forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
            forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *@description Allows updating operation key at a server or client
 *
 *@param {String} body V1_updateoperationkey_body 
 *@param {String} user String User identifier from the system starting the service call
 *@param {String} originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 *@param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 *@param {String} traceIndicator String Sequence of request numbers along the flow
 *@param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.updateOperationKey = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * get request body
       ****************************************************************************************/
      let operationUuid = body["operation-uuid"];
      let oldOperationKey = body["old-operation-key"];
      let newOperationKey = body["new-operation-key"];

      /****************************************************************************************
       * perform bussiness logic
       ****************************************************************************************/
      let isLtpUpdated = false;
      let layerProtocolName = await layerProtocol.getLayerProtocolName(operationUuid);
      if (layerProtocolName == layerProtocol.layerProtocolNameEnum.OPERATION_SERVER) {
        if (oldOperationKey == await operationServerInterface.getOperationKey(operationUuid)) {
          isLtpUpdated = await operationServerInterface.setOperationKey(operationUuid, newOperationKey);
        }
      } else {
        if (oldOperationKey == await operationClientInterface.getOperationKey(operationUuid)) {
          isLtpUpdated = await operationClientInterface.setOperationKey(operationUuid, newOperationKey);
        }
      }
      if (isLtpUpdated) {
        /****************************************************************************************
         * Prepare attributes to configure forwarding-construct
         ****************************************************************************************/
        let forwardingConstructConfigurationList = [];
        let attributeList = [];

        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
          forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}