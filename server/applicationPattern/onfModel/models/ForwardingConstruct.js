/**
 * @file The ForwardingConstruct class(FC) represents enabled constrained potential for forwarding between two or more FcPorts at a particular specific layerProtocol.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';
const fileOperation = require('../../databaseDriver/JSONDriver.js');
const onfAttributeFormatter = require('../utility/OnfAttributeFormatter.js');
const forwardingDomain = require('./ForwardingDomain.js');
const logicalTerminationPoint = require('./LogicalTerminationPoint');
const httpClientInterface = require('./layerProtocols/HttpClientInterface');
const fcPortLogicalTerminationPointPath = "/core-model-1-4:control-construct/forwarding-domain=ol-0-0-1-op-fd-0000/forwarding-construct={fcUuid}/fc-port={fcPortLocalId}/logical-termination-point";
const fcPortPath = "/core-model-1-4:control-construct/forwarding-domain=ol-0-0-1-op-fd-0000/forwarding-construct={fcUuid}/fc-port";

class ForwardingConstruct {

    uuid;
    nameList; //array of keyvalue pair  
    fcPortList;

    static name = class name {
        valueName;
        name;
        static forwardingConstructKindEnum = {
            INVARIANT_PROCESS_SNIPPET: "core-model-1-4:FORWARDING_KIND_TYPE_INVARIANT_PROCESS_SNIPPET",
            SUBSCRIPTION: "core-model-1-4:FORWARDING_KIND_TYPE_SUBSCRIPTION",
            PROCESS_SNIPPET: "core-model-1-4:FORWARDING_KIND_TYPE_PROCESS_SNIPPET"
        }
        /**
         * constructor 
         * @param {object} valueName input for the "value-name" entry.
         * @param {object} name input for the "name" entry.
         */
        constructor(valueName, name) {
            this.valueName = valueName;
            this.name = name;
        }
    }

    static FcPort = class FcPort {
        localId;
        portDirection;
        logicalTerminationPoint;
        static portDirectionEnum = {
            MANAGEMENT: "core-model-1-4:PORT_DIRECTION_TYPE_MANAGEMENT",
            INPUT: "core-model-1-4:PORT_DIRECTION_TYPE_INPUT",
            OUTPUT: "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT"
        }
        /**
         * constructor 
         * @param {object} localId local identifier of the fc-port.
         * @param {object} portDirection port-direction of the fc-port.It can be INPUT,OUTPUT or MANAGEMENT.
         * @param {object} logicalTerminationPoint uuid of the operation-client/server-interface logical-termination-point.
         */
        constructor(localId, portDirection, logicalTerminationPoint) {
            this.localId = localId;
            this.portDirection = portDirection;
            this.logicalTerminationPoint = logicalTerminationPoint;
        }
    }

    /**
     * @constructor 
     * @param {String} uuid unified resource identifier for the forwarding-construct.
     * @param {String} name name list that holds the forwardingName and forwardingKind details.
     * @param {String} fcPort fcPort instance.
     **/
    constructor(uuid, name, fcPort) {
        this.uuid = uuid;
        this.nameList = nameList;
        this.fcPortList = fcPortList;
    }

    /**
     * @description This function returns the forwarding-construct/name/value-name=ForwardingName instance for the given forwarding construct uuid<br>
     * @param {string} forwardingConstructUuid forwarding-construct uuid<br>
     * @returns {promise} returns ForwardingName of the matched forwarding-construct<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding construct list from the method getForwardingConstructList() from forwarding-domain class<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the uuid<br>
     * <b>step 3 :</b> If the uuid is equal to the input uuid then get the ForwardingName information and return<br>
     **/
    static async getForwardingNameForTheUuid(forwardingConstructUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingName;
                let entireForwardingConstructList = await forwardingDomain.getForwardingConstructList();
                if (entireForwardingConstructList != undefined) {
                    for (let i = 0; i < entireForwardingConstructList.length; i++) {
                        let forwardingConstructList = entireForwardingConstructList[i];
                        for (let j = 0; j < forwardingConstructList.length; j++) {
                            let forwardingConstructInstance = forwardingConstructList[j];
                            let uuid = forwardingConstructInstance["uuid"];
                            if (uuid == forwardingConstructUuid) {
                                let forwardingConstructNameList = forwardingConstructInstance["name"];
                                for (let k = 0; k < forwardingConstructNameList.length; k++) {
                                    if (forwardingConstructNameList[k]["value-name"] == "ForwardingName") {
                                        forwardingName = forwardingConstructNameList[k]["name"];
                                    }
                                }
                            }
                        }
                    }
                }
                resolve(forwardingName);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the forwarding-construct/name/value-name=ForwardingKind instance for the given forwarding construct uuid<br>
     * @param {string} forwardingConstructUuid forwarding-construct uuid<br>
     * @returns {promise} returns ForwardingKind of the matched forwarding-construct<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding construct list from the method getForwardingConstructList() from forwarding-domain class<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the uuid<br>
     * <b>step 3 :</b> If the uuid is equal to the input uuid then get the ForwardingKind information and return<br>
     **/
    static async getForwardingKindForTheUuid(forwardingConstructUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingKind;
                let entireForwardingConstructList = await forwardingDomain.getForwardingConstructList();
                if (entireForwardingConstructList != undefined) {
                    for (let i = 0; i < entireForwardingConstructList.length; i++) {
                        let forwardingConstructList = entireForwardingConstructList[i];
                        for (let j = 0; j < forwardingConstructList.length; j++) {
                            let forwardingConstructInstance = forwardingConstructList[j];
                            let uuid = forwardingConstructInstance["uuid"];
                            if (uuid == forwardingConstructUuid) {
                                let forwardingConstructNameList = forwardingConstructInstance["name"];
                                for (let k = 0; k < forwardingConstructNameList.length; k++) {
                                    if (forwardingConstructNameList[k]["value-name"] == "ForwardingKind") {
                                        forwardingKind = forwardingConstructNameList[k]["name"];
                                    }
                                }
                            }
                        }
                    }
                }
                resolve(forwardingKind);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * This function returns the logical-termination-point(uuid) list of the fc-port in the output direction for the forwardingName<br>
     * @param {string} forwardingConstructName forwarding construct name as in forwarding-domain/forwarding-construct/name/value-name<br>
     * @returns {Promise} return the logical-termination-point(uuid) list of the fc-port in the output direction for the forwardingName<br>
     * This method performs the following step,<br>
     * step 1: get the forwarding-construct instance from the method getForwardingConstructForTheFCName() in forwardingDomain<br>
     * step 2: get the output fc-port from the forwarding-construct<br>
     * step 3: return the fc-port uuid lists<br>
     */
    static async getFcPortOutputDirectionLogicalTerminationPointListForTheForwardingName(forwardingConstructName) {
        return new Promise(async function (resolve, reject) {
            try {
                let fcPortLogicalTerminationPointList = [];
                let forwardingConstruct = await forwardingDomain.getForwardingConstructForTheFCName(forwardingConstructName);
                let fcPortList = forwardingConstruct["fc-port"];
                for (let i = 0; i < fcPortList.length; i++) {
                    let fcPortDirection = fcPortList[i]["port-direction"];
                    if (fcPortDirection != undefined && fcPortDirection == ForwardingConstruct.FcPort.portDirectionEnum.OUTPUT) {
                        let logicalTerminationPoint = fcPortList[i]["logical-termination-point"];
                        fcPortLogicalTerminationPointList.push(logicalTerminationPoint);
                    }
                }
                resolve(fcPortLogicalTerminationPointList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * This function returns the logical-termination-point(uuid) list of the fc-port in the output direction for the input fcport<br>
     * @param {string} fcPortLogicalTerminationPoint logical-termination-point of the fc-port input direction<br>
     * @param {string} context if we want to filter the output fc-port for a specific application(for example to perform /embed-yourself only for the specific application)<br>
     * @returns {Promise} return the logical-termination-point(uuid) list of the fc-port in the output direction for the input fcport<br>
     * This method performs the following step,<br>
     * step 1: get the forwarding-construct instance from the method getForwardingConstructList() in forwardingDomain<br>
     * step 2: get the output fc-port from the forwarding-construct for the provided fcPortLogicalTerminationPoint input direction<br>
     * step 3: return the FcPortOutputDirectionLogicalTerminationPointList<br>
     * Note : This method will explicitly remove the ServiceRequestCausesLoggingRequest as it will be handled by a separate process.
     */
    static async getFcPortOutputDirectionLogicalTerminationPointListForTheFcPortInputDirection(fcPortLogicalTerminationPoint, context) {
        return new Promise(async function (resolve, reject) {
            try {
                let FcPortOutputDirectionLogicalTerminationPointList = [];
                let entireForwardingConstructList = await forwardingDomain.getForwardingConstructList();
                if (entireForwardingConstructList != undefined) {
                    for (let i = 0; i < entireForwardingConstructList.length; i++) {
                        let forwardingConstructList = entireForwardingConstructList[i];
                        for (let j = 0; j < forwardingConstructList.length; j++) {
                            let forwardingConstructInstance = forwardingConstructList[j];
                            let forwardingConstructKind = await ForwardingConstruct.getForwardingKindForTheUuid(forwardingConstructInstance["uuid"]);
                            let forwardingConstructName = await ForwardingConstruct.getForwardingNameForTheUuid(forwardingConstructInstance["uuid"]);
                            let fcPortList = forwardingConstructInstance["fc-port"];
                            for (let k = 0; k < fcPortList.length; k++) {
                                if (fcPortList[k]["port-direction"] == ForwardingConstruct.FcPort.portDirectionEnum.INPUT && fcPortList[k]["logical-termination-point"] == fcPortLogicalTerminationPoint && forwardingConstructName != "ServiceRequestCausesLoggingRequest") {
                                    if (forwardingConstructKind.includes("TYPE_PROCESS_SNIPPET")) {
                                        for (let l = 0; l < fcPortList.length; l++) {
                                            if (fcPortList[l]["port-direction"] == ForwardingConstruct.FcPort.portDirectionEnum.OUTPUT) {
                                                let serverLtpList = await logicalTerminationPoint.getServerLtpList(fcPortList[l]["logical-termination-point"]);
                                                let applicationName = await httpClientInterface.getApplicationName(serverLtpList[0]);
                                                if (context == undefined) {
                                                    FcPortOutputDirectionLogicalTerminationPointList.push(fcPortList[l]["logical-termination-point"]);
                                                } else if (context != undefined && applicationName == context) {
                                                    FcPortOutputDirectionLogicalTerminationPointList.push(fcPortList[l]["logical-termination-point"]);
                                                }
                                            }
                                        }
                                    } else {
                                        for (let l = 0; l < fcPortList.length; l++) {
                                            if (fcPortList[l]["port-direction"] == ForwardingConstruct.FcPort.portDirectionEnum.OUTPUT) {
                                                FcPortOutputDirectionLogicalTerminationPointList.push(fcPortList[l]["logical-termination-point"]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                resolve(FcPortOutputDirectionLogicalTerminationPointList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * This function returns the logical-termination-point(uuid) list of the fc-port in the output direction for the forwarding-construct uuid<br>
     * @param {string} forwardingConstructUuid forwarding-construct uuid<br>
     * @returns {Promise} return the logical-termination-point(uuid) list of the fc-port in the output direction for the forwarding-construct uuid<br>
     * This method performs the following step,<br>
     * step 1: get the forwarding-construct instance from the method getForwardingConstructList() in forwardingDomain<br>
     * step 2: get the output fc-port from the forwarding-construct<br>
     * step 3: return the fc-port uuid lists<br>
     */
    static async getFcPortOutputDirectionLogicalTerminationPointListForTheUuid(forwardingConstructUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let FcPortOutputDirectionLogicalTerminationPointList = [];
                let forwardingConstructList = await forwardingDomain.getForwardingConstructList();
                for (let i = 0; i < forwardingConstructList.length; i++) {
                    let forwardingConstruct = forwardingConstructList[i];
                    for (let j = 0; j < forwardingConstruct.length; j++) {
                        let forwardingConstructInstance = forwardingConstruct[j];
                        if (forwardingConstructInstance["uuid"] == forwardingConstructUuid) {
                            let fcPortList = forwardingConstructInstance["fc-port"];
                            for (let k = 0; k < fcPortList.length; k++) {
                                if (fcPortList[k]["port-direction"] == ForwardingConstruct.FcPort.portDirectionEnum.OUTPUT) {
                                    FcPortOutputDirectionLogicalTerminationPointList.push(fcPortList[k]["logical-termination-point"]);
                                }
                            }
                        }
                    }
                }
                resolve(FcPortOutputDirectionLogicalTerminationPointList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the next available uuid for the fc-port based on the provided forwarding-construct uuid.<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @returns {promise} returns the next free uuid instance that can be used for the fc-port creation.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> use the method getForwardingConstructForTheUuid() in forwarding-domain to get forwarding-construct instance <br>
     * <b>step 2 :</b> get the fc-port list and gather all the local-uuid in a list <br>
     * <b>step 3 :</b> Sort the list in ascending order<br>
     * <b>step 4 :</b> Get the last index of the array and add 1<br>
     **/
    static generateNextFcPortLocalId(forwardingConstructUuid) {
        return new Promise(async function (resolve, reject) {
            let nextFcPortUuid = "000";
            try {
                let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheUuid(forwardingConstructUuid);
                let fcPortList = forwardingConstructInstance["fc-port"];
                let fcPortLocalIdList = [];
                for (let i = 0; i < fcPortList.length; i++) {
                    let localId = fcPortList[i]["local-id"];
                    fcPortLocalIdList.push(localId);
                }
                if (fcPortLocalIdList.length > 0) {
                    fcPortLocalIdList.sort();
                    let lastUuid = fcPortLocalIdList[fcPortLocalIdList.length - 1];
                    nextFcPortUuid = parseInt(lastUuid) + 1;
                }
                resolve(nextFcPortUuid);
            } catch (error) {
                reject(nextFcPortUuid);
            }
        });
    }

    /**
     * @description This function updates the logical-termination-point attribute fo the fc-port<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @param {String} fcPortLocalId local-id of the fc-port<br>
     * @param {String} fcPortNewLogicalTerminationPoint new logical-termination-point that needs to be updated<br>
     * @returns {promise} returns true if the value is updated<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the url to point out the logical-termination-point attribute of the fc-port using the url syntax fcPortLogicalTerminationPointPath<br>
     * <b>step 2 :</b> write the new value to the JSON database file by using the method writeToDatabase() <br>
     **/
    static modifyFcPortLogicalTerminationPointUuid(forwardingConstructUuid, fcPortLocalId, fcPortNewLogicalTerminationPoint) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let fcPortLogicalTerminationPointResource = fcPortLogicalTerminationPointPath.replace("{fcUuid}", forwardingConstructUuid).replace("{fcPortLocalId}", fcPortLocalId);
                isCreated = await fileOperation.writeToDatabase(fcPortLogicalTerminationPointResource, fcPortNewLogicalTerminationPoint, false);
                resolve(isCreated);
            } catch (error) {
                reject();
            }
        });
    }

    /**
     * @description This function returns true if a fc-port is already available for the provided logical-termination-point of a operation(client/server)Uuid<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @param {String} operationUuid logical-termination-point of a operation(client/server)Uuid<br>
     * @returns {promise} returns true if a fc-port is already available<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the forwarding construct instance for the provided uuid by using the method getForwardingConstructForTheUuid() in forwarding-domain<br>
     * <b>step 2 :</b> get the fc-port list, iterate through the list and check if any logical-termination-point is holding the operationUuid <br>
     **/
    static isFcPortExists(forwardingConstructUuid, operationUuid) {
        return new Promise(async function (resolve, reject) {
            let isExists = false;
            try {
                let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheUuid(forwardingConstructUuid);
                let fcPortList = forwardingConstructInstance["fc-port"];
                for (let i = 0; i < fcPortList.length; i++) {
                    let logicalTerminationPoint = fcPortList[i]["logical-termination-point"];
                    if (logicalTerminationPoint == operationUuid) {
                        isExists = true;
                    }
                }
                resolve(isExists);
            } catch (error) {
                reject(isExists);
            }
        });
    }

    /**
     * @description This function returns the fc-port local-id for the provided logical-termination-point of a operation(client/server)Uuid<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @param {String} operationUuid logical-termination-point of a operation(client/server)Uuid<br>
     * @returns {promise} returns the fc-port local-id<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the forwarding construct instance for the provided uuid by using the method getForwardingConstructForTheUuid() in forwarding-domain<br>
     * <b>step 2 :</b> get the fc-port list, iterate through the list and get the local-id of the fc-port whose logical-termination-point is holding the operationUuid <br>
     **/
    static getFcPortLocalId(forwardingConstructUuid, operationUuid) {
        return new Promise(async function (resolve, reject) {
            let localId;
            try {
                let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheUuid(forwardingConstructUuid);
                let fcPortList = forwardingConstructInstance["fc-port"];
                for (let i = 0; i < fcPortList.length; i++) {
                    let logicalTerminationPoint = fcPortList[i]["logical-termination-point"];
                    if (logicalTerminationPoint == operationUuid) {
                        localId = fcPortList[i]["local-id"];;
                    }
                }
                resolve(localId);
            } catch (error) {
                reject(localId);
            }
        });
    }

    /**
     * @description This function adds an Fc port to the forwarding-construct<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @param {String} fcPort fc-port instance that needs to be added to the forwarding-construct<br>
     * @returns {promise} returns true if the fc-port is added to the list<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Construct the fcPortResourcePath for the provided forwarding-construct uuid<br>
     * <b>step 2 :</b> add the fc-port to the fc-port list in the database file using the writeToDatabase() method <br>
     **/
    static addFcPort(forwardingConstructUuid, fcPortLocalId, fcPortDirection, fcPortLogicalTermincationPoint) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let fcPort = new ForwardingConstruct.FcPort(fcPortLocalId, fcPortDirection, fcPortLogicalTermincationPoint);
                let fcPortResourcePath = fcPortPath.replace("{fcUuid}", forwardingConstructUuid);
                onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(fcPort);
                isCreated = await fileOperation.writeToDatabase(fcPortResourcePath, fcPort, true);
                resolve(isCreated);
            } catch (error) {
                reject(false);
            }
        });
    }

    /**
     * @description This function adds an Fc port to the forwarding-construct<br>
     * @param {String} forwardingConstructUuid uuid of the forwarding-construct<br>
     * @param {String} fcPortLocalId fc-port local id<br>
     * @returns {promise} returns true if the fc-port is added to the list<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Construct the fcPortResourcePath for the provided forwarding-construct uuid<br>
     * <b>step 2 :</b> add the fc-port to the fc-port list in the database file using the writeToDatabase() method <br>
     **/
     static deleteFcPort(forwardingConstructUuid, fcPortLocalId) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let fcPortResourcePath = fcPortPath.replace("{fcUuid}", forwardingConstructUuid) + "=" + fcPortLocalId;
                isCreated = await fileOperation.deletefromDatabase(fcPortResourcePath, true);
                resolve(isCreated);
            } catch (error) {
                reject(false);
            }
        });
    }

}

module.exports = ForwardingConstruct;