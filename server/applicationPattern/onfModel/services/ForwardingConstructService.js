/**
 * @file This class provides a stub for onf core-model.  
 * This class consolidates the technology specific extensions.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const forwardingConstruct = require('../models/ForwardingConstruct');
const eventDispatcher = require("../../callbacks/eventDispatcher.js");
const operationClientInterface = require('../models/layerprotocols/OperationClientInterface');
const httpClientInterface = require('../models/layerprotocols/HttpClientInterface.js');
const logicalTerminationPoint = require('../models/LogicalTerminationPoint.js');
const forwardingDomain = require('../models/ForwardingDomain.js');

class ForwardingConstructInformation {
    uuid;
    forwardingName;
    forwardingKind;
    /**
     * constructor 
     * @param {string} uuid instance of the httpClientUuidInformation<br>
     * @param {string} forwardingName operation name that is available in the client.<br>
     * @param {string} forwardingKind this flag provides the information whether the operation name is already available .<br>
     * This constructor will instantiate the operationClientUuidInformation class
     */
    constructor(uuid, forwardingName, forwardingKind) {
        this.uuid = uuid;
        this.forwardingName = forwardingName;
        this.forwardingKind = forwardingKind;
    }
}

/**
 * @description This function configures the forwarding construct based on the provided new operation client information and automates the already existing forwarding construct.
 * @param {String} isCreate whether we have to create fcports or delete fcports will be decided based on this flag<br>
 * @param {String} operationServerUuid operation server uuid of the request url<br>
 * @param {String} forwardingConstructConfigurationList list of operation uuid along with the forwarding name that needs to be modified<br>
 * @param {list}   attributeList list of attributes required during forwarding construct automation(to send in the request body)<br>
 * @param {String} user user who initiates this request<br>
 * @param {string} xCorrelator flow id of this request<br>
 * @param {string} traceIndicator trace indicator of the request<br>
 * @param {string} customerJourney customer journey of the request<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> configures the forwarding construct by calling the method ConfigureForwardingConstruct()<br>
 * <b>step 2 :</b> automates the forwarding construct by using the method automateForwardingConstruct()<br>
 **/
exports.configureAndAutomateForwardingConstruct = function (isCreate, serviceType, operationServerUuid, forwardingConstructConfigurationList,
    attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            await ConfigureForwardingConstruct(operationServerUuid, forwardingConstructConfigurationList);
            automateForwardingConstruct(serviceType, operationServerUuid, attributeList, user, xCorrelator, traceIndicator, customerJourney);
            resolve();
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function removes the configured operation clients in the forwarding construct based on the provided operation client information and automates the forwarding construct.
 * @param {String} serviceType service type can be basic or individual<br>
 * @param {String} operationServerUuid operation server uuid of the request url<br>
 * @param {String} operationClientUuidLists list of operation client uuids that needs to be deleted<br>
 * @param {list}   attributeList list of attributes required during forwarding construct automation(to send in the request body)<br>
 * @param {String} user user who initiates this request<br>
 * @param {string} xCorrelator flow id of this request<br>
 * @param {string} traceIndicator trace indicator of the request<br>
 * @param {string} customerJourney customer journey of the request<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> removes the configured forwarding construct by calling the method unConfigureForwardingConstruct()<br>
 * <b>step 2 :</b> automates the forwarding construct by using the method automateForwardingConstruct()<br>
 **/
exports.unConfigureAndAutomateForwardingConstruct = function (serviceType, operationServerUuid, operationClientUuidLists,
    attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            await unConfigureForwardingConstruct(operationServerUuid, operationClientUuidLists);
            automateForwardingConstruct(serviceType, operationServerUuid, attributeList, user, xCorrelator, traceIndicator, customerJourney);
            resolve();
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function automates the forwarding construct by calling the appropriate call back operations based on the fcPort input and output directions.
 * @param {String} operationServerUuid operation server uuid of the request url<br>
 * @param {list}   attributeList list of attributes required during forwarding construct automation(to send in the request body)<br>
 * @param {String} user user who initiates this request<br>
 * @param {string} originator originator of the request<br>
 * @param {string} xCorrelator flow id of this request<br>
 * @param {string} traceIndicator trace indicator of the request<br>
 * @param {string} customerJourney customer journey of the request<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the fcPort output list for the given operation server uuid<br>
 * <b>step 2 :</b> gather information that needs to be dispatched as rest calls to appropriate rest servers<br>
 * <b>step 3 :</b> call the method dispatchEvent() to dispatch the rest requests <br>
 **/
function automateForwardingConstruct(serviceType, operationServerUuid,
    attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let FcPortOutputDirectionLogicalTerminationPointList = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheFcPortInputDirection(operationServerUuid);
            for (let i = 0; i < FcPortOutputDirectionLogicalTerminationPointList.length; i++) {
                let operationClientUuid = FcPortOutputDirectionLogicalTerminationPointList[i];
                let httpClientUuid = (await logicalTerminationPoint.getServerLtpList(operationClientUuid))[0];
                let clientApplicationName = await httpClientInterface.getApplicationName(httpClientUuid);
                let operationKey = await operationClientInterface.getOperationKey(operationClientUuid);
                let operationName = await operationClientInterface.getOperationName(operationClientUuid);
                let remoteIpAndPort = await operationClientInterface.getTcpIpAddressAndPortForTheOperationClient(operationClientUuid);
                let newTraceIndicator = traceIndicator + "." + (i + 1);
                await eventDispatcher.dispatchEvent(serviceType, remoteIpAndPort, clientApplicationName, operationName, operationKey,
                    attributeList, user, xCorrelator, newTraceIndicator, customerJourney);
            }
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function configures the forwarding construct based on the fcPort management directions for the provided forwardingConstructConfigurationList.<br>
 * @param {String} operationServerUuid operation server uuid of the request url<br>
 * @param {list}   forwardingConstructConfigurationList it consistes of the forwardingConstructName and the operationClientUuid that needs to be added as a fcPort<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the fcPort output list for the given operation server uuid<br>
 * <b>step 2 :</b> gather information that needs to be dispatched as rest calls to appropriate rest servers<br>
 * <b>step 3 :</b> call the method dispatchEvent() to dispatch the rest requests <br>
 **/
function ConfigureForwardingConstruct(operationServerUuid, forwardingConstructConfigurationList) {
    return new Promise(async function (resolve, reject) {
        try {
            //get the forwarding construct uuid for which it is management port
            let forwardingConstructInformationList = await instantiateForwardingConstructInformationListForManagementFcPort(operationServerUuid);
            for (let j = 0; j < forwardingConstructConfigurationList.length; j++) {
                let inputForwardingConstructName = forwardingConstructConfigurationList[j]["forwardingName"];
                let operationClientUuid = forwardingConstructConfigurationList[j]["OperationClientUuid"];
                for (let i = 0; i < forwardingConstructInformationList.length; i++) {
                    let forwardingConstructUuid = forwardingConstructInformationList[i].uuid;
                    let forwardingConstructName = forwardingConstructInformationList[i].forwardingName;
                    let forwardingConstructKind = forwardingConstructInformationList[i].forwardingKind;
                    if (inputForwardingConstructName == forwardingConstructName) {
                        let isFcPortExists = await forwardingConstruct.isFcPortExists(forwardingConstructUuid, operationClientUuid);
                        if (forwardingConstructKind.includes("INVARIANT_PROCESS_SNIPPET")) {
                            if (!isFcPortExists) {
                                let fcPortOutputUuid = await forwardingConstruct.getFcPortOutputDirectionLogicalTerminationPointListForTheUuid(forwardingConstructUuid);
                                let fcPortLocalId = await forwardingConstruct.getFcPortLocalId(forwardingConstructUuid, fcPortOutputUuid[0]);
                                await forwardingConstruct.modifyFcPortLogicalTerminationPointUuid(forwardingConstructUuid, fcPortLocalId, operationClientUuid);
                            }
                        } else {
                            if (!isFcPortExists) {
                                let nextLocalId = await forwardingConstruct.generateNextFcPortLocalId(forwardingConstructUuid);
                                await forwardingConstruct.addFcPort(forwardingConstructUuid, nextLocalId,
                                    forwardingConstruct.FcPort.portDirectionEnum.OUTPUT, operationClientUuid);
                            }
                        }
                    }
                }
            }
            resolve();
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function removes the fc-port from the forwarding construct based on the fcPort management directions for the provided operationServerUuid.<br>
 * @param {String} operationServerUuid operation server uuid of the request url<br>
 * @param {list}   operationClientUuidLists it consistes of the operationClientUuid that needs to be deleted from the fcPort<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the fcPort output list for the given operation server uuid<br>
 * <b>step 2 :</b> check if any fcPort matches any entry in the operationClientUuidList<br>
 * <b>step 3 :</b> if fcPort exists, perform step 4 to 6 <br>
 * <b>step 4 :</b> Find the forwardingKind of the forwardingConstruct <br>
 * <b>step 5 :</b> If the forwardingKind is of type INVARIANT_PROCESS_SNIPPET , then modify the logical-termination-point to -1<br>
 * <b>step 6 :</b> If the forwardingKind is not of type INVARIANT_PROCESS_SNIPPET , then delete the fc-port from the fc-port list <br> 
 **/
function unConfigureForwardingConstruct(operationServerUuid, operationClientUuidLists) {
    return new Promise(async function (resolve, reject) {
        try {
            //get the forwarding construct uuid for which it is management port
            let forwardingConstructInformationList = await instantiateForwardingConstructInformationListForManagementFcPort(operationServerUuid);
            for (let j = 0; j < operationClientUuidLists.length; j++) {
                let operationClientUuid = operationClientUuidLists[j];
                for (let i = 0; i < forwardingConstructInformationList.length; i++) {
                    let forwardingConstructUuid = forwardingConstructInformationList[i].uuid;
                    let forwardingConstructKind = forwardingConstructInformationList[i].forwardingKind;
                    let isFcPortExists = await forwardingConstruct.isFcPortExists(forwardingConstructUuid, operationClientUuid);
                    if (isFcPortExists) {
                        let localIdOfFcPort = await forwardingConstruct.getFcPortLocalId(forwardingConstructUuid,operationClientUuid);
                        if (forwardingConstructKind.includes("INVARIANT_PROCESS_SNIPPET")) {
                            await forwardingConstruct.modifyFcPortLogicalTerminationPointUuid(forwardingConstructUuid,localIdOfFcPort,"-1");
                        } else {
                            await forwardingConstruct.deleteFcPort(forwardingConstructUuid,localIdOfFcPort);
                        }
                    }
                }
            }
            resolve();
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function initiates the forwarding construct information for the management fcport(logical-termination-point == operationServerUuid)<br>
 * @param {String} operationServerUuid operation server uuid of the request url which can be match to the fc-port/logical-termination-point for the management direction<br>
 * @return {Promise}  forwardingConstructConfigurationList that provides information about the fcPort instances that needs to be created and modified<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the forwardingConstruct Management Instance List<br>
 * <b>step 2 :</b> for each management fcport , create forwardingconstructinformation<br>
 **/
function instantiateForwardingConstructInformationListForManagementFcPort(operationServerUuid) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructInformationList = [];
        try {
            //get the forwarding construct uuid for which it is management port
            let forwardingConstructManagementInstanceList = await forwardingDomain.getForwardingConstructListForTheFcPortManagementDirection(operationServerUuid);
            for (let i = 0; i < forwardingConstructManagementInstanceList.length; i++) {
                let forwardingConstructManagementInstance = forwardingConstructManagementInstanceList[i];
                let uuid = forwardingConstructManagementInstance["uuid"];
                let nameList = forwardingConstructManagementInstance["name"];
                let forwardingName;
                let forwardingKind;
                for (let j = 0; j < nameList.length; j++) {
                    if (nameList[j]["value-name"] == "ForwardingKind") {
                        forwardingKind = nameList[j]["name"];
                    } else if (nameList[j]["value-name"] == "ForwardingName") {
                        forwardingName = nameList[j]["name"];
                    }
                }
                let forwardingConstructInformation = new ForwardingConstructInformation(uuid, forwardingName, forwardingKind)
                forwardingConstructInformationList.push(forwardingConstructInformation);
            }
            resolve(forwardingConstructInformationList);
        } catch (error) {
            reject(forwardingConstructInformationList);
        }
    });
}