'use strict';

const LogicalTerminationPointConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput');
const LogicalTerminationPointService = require('onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices');
const ForwardingConfigurationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructConfigurationServices');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const prepareForwardingConfiguration = require('./individualServices/PrepareForwardingConfiguration');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const LogicalTerminationPointServiceOfUtility = require("onf-core-model-ap-bs/basicServices/utility/LogicalTerminationPoint")
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const ConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/ConfigurationStatus');
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const individualServicesOperationsMapping = require('./individualServices/individualServicesOperationsMapping');
const softwareUpgrade = require('./individualServices/SoftwareUpgrade');
const { getIndexAliasAsync, createResultArray, elasticsearchService } = require('onf-core-model-ap/applicationPattern/services/ElasticsearchService');
const LogicalTerminationPointConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationStatus');
const TcpObject = require('onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject');
const prepareALTForwardingAutomation = require('onf-core-model-ap-bs/basicServices/services/PrepareALTForwardingAutomation');
const RegardApplication = require('./individualServices/RegardApplication');

const NEW_RELEASE_FORWARDING_NAME = 'PromptForBequeathingDataCausesTransferOfListOfApplications';
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

/**
 * Initiates process of embedding a new release
 *
 * body V1_bequeathyourdataanddie_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.bequeathYourDataAndDie = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["new-application-name"];
      let releaseNumber = body["new-application-release"];
      let protocol = body["new-application-protocol"];
      let address = body["new-application-address"];
      let port = body["new-application-port"];
      let httpClientUuidList = await LogicalTerminationPointServiceOfUtility.resolveHttpTcpAndOperationClientUuidOfNewRelease()

      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/
      let newReleaseHttpClientLtpUuid = httpClientUuidList.httpClientUuid;
      let newReleaseTcpClientUuid = httpClientUuidList.tcpClientUuid;
      let currentNewReleaseApplicationName = await httpClientInterface.getApplicationNameAsync(newReleaseHttpClientLtpUuid);
      let currentNewReleaseNumber = await httpClientInterface.getReleaseNumberAsync(newReleaseHttpClientLtpUuid);
      let currentNewReleaseRemoteAddress = await tcpClientInterface.getRemoteAddressAsync(newReleaseTcpClientUuid);
      let currentNewReleaseRemoteProtocol = await tcpClientInterface.getRemoteProtocolAsync(newReleaseTcpClientUuid);
      let currentNewReleaseRemotePort = await tcpClientInterface.getRemotePortAsync(newReleaseTcpClientUuid);
      let update = {};
      let logicalTerminationPointConfigurationStatus = {};
      if (newReleaseHttpClientLtpUuid != undefined) {

        if (releaseNumber != currentNewReleaseNumber) {
          update.isReleaseUpdated = await httpClientInterface.setReleaseNumberAsync(newReleaseHttpClientLtpUuid, releaseNumber);
        }
        if (applicationName != currentNewReleaseApplicationName) {
          update.isApplicationNameUpdated = await httpClientInterface.setApplicationNameAsync(newReleaseHttpClientLtpUuid, applicationName);
        }

        if (protocol != currentNewReleaseRemoteProtocol) {
          update.isProtocolUpdated = await tcpClientInterface.setRemoteProtocolAsync(newReleaseTcpClientUuid, protocol);
        }
        if (JSON.stringify(address) != JSON.stringify(currentNewReleaseRemoteAddress)) {
          update.isAddressUpdated = await tcpClientInterface.setRemoteAddressAsync(newReleaseTcpClientUuid, address);
        }
        if (port != currentNewReleaseRemotePort) {
          update.isPortUpdated = await tcpClientInterface.setRemotePortAsync(newReleaseTcpClientUuid, port);
        }

        let tcpClientConfigurationStatus = new ConfigurationStatus(
          newReleaseTcpClientUuid,
          '',
          (update.isProtocolUpdated || update.isAddressUpdated || update.isPortUpdated)
        );
        let httpClientConfigurationStatus = new ConfigurationStatus(
          newReleaseHttpClientLtpUuid,
          '',
          (update.isReleaseUpdated || update.isApplicationNameUpdated)
        );
        logicalTerminationPointConfigurationStatus = new LogicalTerminationPointConfigurationStatus(
          false,
          httpClientConfigurationStatus,
          [tcpClientConfigurationStatus]
        );
        let forwardingAutomationInputList;
        if (logicalTerminationPointConfigurationStatus != undefined) {


          /****************************************************************************************
           * Prepare attributes to automate forwarding-construct
           ****************************************************************************************/
          forwardingAutomationInputList = await prepareForwardingAutomation.bequeathYourDataAndDie(
            logicalTerminationPointConfigurationStatus
          );
          ForwardingAutomationService.automateForwardingConstructAsync(
            operationServerName,
            forwardingAutomationInputList,
            user,
            xCorrelator,
            traceIndicator,
            customerJourney
          );
        }
      
      softwareUpgrade.upgradeSoftwareVersion(user, xCorrelator, traceIndicator, customerJourney, forwardingAutomationInputList.length + 1)
        .catch(err => console.log(`upgradeSoftwareVersion failed with error: ${err}`));
    }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}


/**
 * Removes application from list of targets of subscriptions for OaM requests
 *
 * body V1_disregardapplication_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.disregardApplication = async function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  let applicationName = body["application-name"];
  let applicationReleaseNumber = body["release-number"];

  let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
    applicationName, applicationReleaseNumber, NEW_RELEASE_FORWARDING_NAME
  )
  let ltpConfigurationStatus = await LogicalTerminationPointService.deleteApplicationLtpsAsync(
    httpClientUuid
  );

  let forwardingConfigurationInputList = [];
  let forwardingConstructConfigurationStatus;
  let operationClientConfigurationStatusList = ltpConfigurationStatus.operationClientConfigurationStatusList;

  if (operationClientConfigurationStatusList) {
    forwardingConfigurationInputList = await prepareForwardingConfiguration.disregardApplication(
      operationClientConfigurationStatusList
    );
    forwardingConstructConfigurationStatus = await ForwardingConfigurationService.
      unConfigureForwardingConstructAsync(
        operationServerName,
        forwardingConfigurationInputList
      );
  }
  let forwardingAutomationInputList = await prepareForwardingAutomation.disregardApplication(
    ltpConfigurationStatus,
    forwardingConstructConfigurationStatus
  );
  ForwardingAutomationService.automateForwardingConstructAsync(
    operationServerName,
    forwardingAutomationInputList,
    user,
    xCorrelator,
    traceIndicator,
    customerJourney
  );
}

/**
 * Provides list of applications that are requested to send OaM request notifications
 *
 * returns List
 **/
exports.listApplications = async function () {
  let forwadingName = "RegardApplicationCausesSequenceForInquiringOamRecords.RequestForInquiringOamRecords"
  let applicationList = await LogicalTerminationPointServiceOfUtility.getAllApplicationList(forwadingName);
  return onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(applicationList);
}

/**
 * Provides list of recorded OaM requests
 *
 * returns List
 **/
exports.listRecords = async function (body) {
  let size = body["number-of-records"];
  let from = body["latest-record"];
  let query = {
    match_all: {}
  };
  if (size + from <= 10000) {
    let indexAlias = await getIndexAliasAsync();
    let client = await elasticsearchService.getClient(false);
    const result = await client.search({
      index: indexAlias,
      from: from,
      size: size,
      body: {
        query: query
      }
    });
    const resultArray = createResultArray(result);
    return { "response": resultArray, "took": result.body.took };
  }
  return await elasticsearchService.scroll(from, size, query);
}

/**
 * Provides list of OaM request records belonging to the same application
 *
 * body V1_listrecordsofapplication_body 
 * returns List
 **/
exports.listRecordsOfApplication = async function (body) {
  let size = body["number-of-records"];
  let from = body["latest-match"];
  let desiredApplicationName = body["application-name"];
  let query = {
    match: {
      "application-name": desiredApplicationName
    }
  };
  if (size + from <= 10000) {
    let indexAlias = await getIndexAliasAsync();
    let client = await elasticsearchService.getClient(false);
    const result = await client.search({
      index: indexAlias,
      from: from,
      size: size,
      body: {
        query: query
      }
    });
    const resultArray = createResultArray(result);
    return { "response": resultArray, "took": result.body.took };
  }
  return await elasticsearchService.scroll(from, size, query);
}


/**
 * Records an OaM request
 *
 * body OamRequestRecord 
 * no response value expected for this operation
 **/
exports.recordOamRequest = async function (body) {
  let indexAlias = await getIndexAliasAsync();
  let client = await elasticsearchService.getClient(false);
  let startTime = process.hrtime();
  let result = await client.index({
    index: indexAlias,
    body: body
  });
  let backendTime = process.hrtime(startTime);
  if (result.body.result == 'created' || result.body.result == 'updated') {
    return { "took": backendTime[0] * 1000 + backendTime[1] / 1000000 };
  }
}


/**
 * Adds to the list of applications
 *
 * body V1_regardapplication_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.regardApplication = async function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  return new Promise(async function (resolve, reject) {
    try {
      let applicationName = body["application-name"];
      let releaseNumber = body["release-number"];
      let tcpServerList = [new TcpObject(body["protocol"], body["address"], body["port"])];
      let oamRequestOperation = "/v1/redirect-oam-request-information";
      let operationNamesByAttributes = new Map();
      operationNamesByAttributes.set("redirect-oam-request-information", oamRequestOperation);
      await lock.acquire("Register application", async () => {
        let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
          applicationName, releaseNumber, NEW_RELEASE_FORWARDING_NAME
        )
        let ltpConfigurationInput = new LogicalTerminationPointConfigurationInput(
          httpClientUuid,
          applicationName,
          releaseNumber,
          tcpServerList,
          operationServerName,
          operationNamesByAttributes,
          individualServicesOperationsMapping.individualServicesOperationsMapping
        );
        let ltpConfigurationStatus = await LogicalTerminationPointService.createOrUpdateApplicationLtpsAsync(
          ltpConfigurationInput
        );
        
        let forwardingConfigurationInputList = [];
        let forwardingConstructConfigurationStatus;
        let operationClientConfigurationStatusList = ltpConfigurationStatus.operationClientConfigurationStatusList;

        if (operationClientConfigurationStatusList) {
          forwardingConfigurationInputList = await prepareForwardingConfiguration.regardApplication(
            operationClientConfigurationStatusList,
            oamRequestOperation
          );
          forwardingConstructConfigurationStatus = await ForwardingConfigurationService.
            configureForwardingConstructAsync(
              operationServerName,
              forwardingConfigurationInputList
            );
        }

        /***********************************************************************************
         * forwardings for application layer topology
         ************************************************************************************/
        let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
          ltpConfigurationStatus,
          forwardingConstructConfigurationStatus
        );

        await ForwardingAutomationService.automateForwardingConstructAsync(
          operationServerName,
          applicationLayerTopologyForwardingInputList,
          user,
          xCorrelator,
          traceIndicator,
          customerJourney
        );
      });

      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
      let result = await RegardApplication.regardApplication(
        applicationName,
        releaseNumber,
        user,
        xCorrelator,
        traceIndicator,
        customerJourney,
        applicationLayerTopologyForwardingInputList.length + 1
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}


/****************************************************************************************
 * Functions utilized by individual services
 ****************************************************************************************/




