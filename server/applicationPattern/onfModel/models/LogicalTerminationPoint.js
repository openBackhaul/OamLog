/**
 * @file The LogicalTerminationPoint (LTP) class encapsulates the termination and adaptation functions of one or more technology specific layers represented by instances of LayerProtocol.<br>
 * his class provides a stub to instantiate and generate a JSONObject for a LogicalTerminationPoint.  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.08.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/
'use strict';
const fileOperation = require('../../databaseDriver/JSONDriver.js');
const layerProtocol = require('./LayerProtocol.js');
const coreModel = require('./CoreModel');
const logicalTerminationPointPath = "/core-model-1-4:control-construct/logical-termination-point";
const clientLtpUrl = "/core-model-1-4:control-construct/logical-termination-point={uuid}/client-ltp";

class LogicalTerminationPoint {

    uuid;
    ltpDirection;
    clientLtp;
    serverLtp;
    layerProtocol;

    static ltpDirectionEnum = {
        SINK: "core-model-1-4:TERMINATION_DIRECTION_SINK",
        SOURCE: "core-model-1-4:TERMINATION_DIRECTION_SOURCE"
    }


    /**
     * @constructor 
     * @param {String} uuid unified resource identifier for the httpClient.
     * @param {String} ltpDirection direction of the LTP , it will SINK for clients and SOURCE for servers.
     * @param {String} clientLtp client LTPs ((operation-client/server) associated with this http-client/server , ((http-client/server) associated with this tcp-client/server)).
     * @param {String} serverLtp server LTPs ((tcp-client/server) associated with this http-client/server , ((http-client/server) associated with this operation-client/server)).
     * @param {String} layerProtocol an instance of the LayerProtocol class.
     **/

    constructor(uuid, ltpDirection, clientLtp, serverLtp, layerProtocol) {
        this.uuid = uuid;
        this.ltpDirection = ltpDirection;
        this.clientLtp = clientLtp;
        this.serverLtp = serverLtp;
        this.layerProtocol = layerProtocol;
    }

    /**
     * @description This function returns the server-ltp list for the given logical-termination-point uuid<br>
     * @param {String} uuid uuid of the logical-termination-point.<br>
     * @returns {promise} returns the server-ltp list of the LTP.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the logical-termination-point instance<br>
     * <b>step 2 :</b> return the server-ltp list<br>
     **/
    static getServerLtpList(Uuid) {
        return new Promise(async function (resolve, reject) {
            let serverLtpList;
            try {
                let logicalterminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(Uuid);
                if (logicalterminationPointInstance != undefined) {
                serverLtpList = logicalterminationPointInstance["server-ltp"];
                }
                resolve(serverLtpList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the client-ltp list for the given logical-termination-point uuid<br>
     * @param {String} uuid uuid of the logical-termination-point.<br>
     * @returns {promise} returns the client-ltp list of the LTP.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the logical-termination-point instance<br>
     * <b>step 2 :</b> return the client-ltp list<br>
     **/
    static getClientLtpList(Uuid) {
        return new Promise(async function (resolve, reject) {
            let clientLtpList;
            try {
                let logicalterminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(Uuid);
                if (logicalterminationPointInstance != undefined) {
                clientLtpList = logicalterminationPointInstance["client-ltp"];
                }
                resolve(clientLtpList);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function modifies the client-ltp list for the given logical-termination-point uuid<br>
     * @param {String} uuid uuid of the logical-termination-point.<br>
     * @returns {promise} returns true if the value is updated otherwise false<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the logical-termination-point instance<br>
     * <b>step 2 :</b> update the client-ltp list with the new value<br>
     **/
    static setClientLtpList(Uuid, clientUuidList) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            let existingClientUuidList = await LogicalTerminationPoint.getClientLtpList(Uuid);
            try {
                for (let i = 0; i < clientUuidList.length; i++) {
                    let isClientAlreadyExist = false;
                    let clientUuid = clientUuidList[i];
                    if (existingClientUuidList != undefined && existingClientUuidList.indexOf(clientUuid) > -1) {
                        isClientAlreadyExist = true;
                    }
                    if (!isClientAlreadyExist) {
                        let clientLtpUrlToBeUpdated = clientLtpUrl.replace("{uuid}", Uuid);
                        isUpdated = await fileOperation.writeToDatabase(clientLtpUrlToBeUpdated, clientUuid, true);
                    }
                }
                resolve(isUpdated);
            } catch (error) {
                reject(isUpdated);
            }
        });
    }

    /**
     * @description This function modifies the client-ltp list for the given logical-termination-point uuid<br>
     * @param {String} uuid uuid of the logical-termination-point.<br>
     * @returns {promise} returns true if the value is updated otherwise false<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the logical-termination-point instance<br>
     * <b>step 2 :</b> update the client-ltp list with the new value<br>
     **/
    static setClientLtpList(Uuid, clientUuidList) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            let existingClientUuidList = await LogicalTerminationPoint.getClientLtpList(Uuid);
            try {
                for (let i = 0; i < clientUuidList.length; i++) {
                    let isClientAlreadyExist = false;
                    let clientUuid = clientUuidList[i];
                    if (existingClientUuidList != undefined && existingClientUuidList.indexOf(clientUuid) > -1) {
                        isClientAlreadyExist = true;
                    }
                    if (!isClientAlreadyExist) {
                        let clientLtpUrlToBeUpdated = clientLtpUrl.replace("{uuid}", Uuid);
                        isUpdated = await fileOperation.writeToDatabase(clientLtpUrlToBeUpdated, clientUuid, true);
                    }
                }
                resolve(isUpdated);
            } catch (error) {
                reject(isUpdated);
            }
        });
    }

    /**
     * @description This function returns the list of logical-termination-point uuid for the provided layer-protocol-name.<br>
     * @param {String} layerProtocolName protocol name of the layer.<br>
     * @returns {promise} returns logical-termination-point uuid List.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point list from the control construct using the logicalTerminationPointPath<br>
     * <b>step 2 :</b> Iterate through the list and filter the uuids for the required layerProtocolName<br>
     **/
    static async getUuidListForTheProtocol(layerProtocolName) {
        return new Promise(async function (resolve, reject) {
            let filteredLogicalTerminationPointUuidList = [];
            try {
                let logicalTerminationPointList = await fileOperation.readFromDatabase(logicalTerminationPointPath);
                if (logicalTerminationPointList != undefined) {
                    for (let i = 0; i < logicalTerminationPointList.length; i++) {
                        let layerProtocol = logicalTerminationPointList[i]["layer-protocol"];
                        if (layerProtocol != undefined) {
                            let layerProtocolNameValue = layerProtocol[0]["layer-protocol-name"];
                            if (layerProtocolNameValue != undefined && layerProtocolNameValue == layerProtocolName) {
                                filteredLogicalTerminationPointUuidList.push(logicalTerminationPointList[i]["uuid"]);
                            }
                        }
                    }
                }
                resolve(filteredLogicalTerminationPointUuidList);
            } catch (error) {
                resolve(undefined);
            }
        });
    }       
}
module.exports = LogicalTerminationPoint;