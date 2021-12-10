/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a operationClientInterface layer protocol.<br>
 * This class is a sub class for LayerProtocol <br>
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.08.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 **/

'use strict';
const coreModel = require('../CoreModel');
const layerProtocol = require('../LayerProtocol');
const logicalTerminationPoint = require('../LogicalTerminationPoint');
const tcpClientInterface = require('./TcpClientInterface');
const fileOperation = require('../../../databaseDriver/JSONDriver.js');
const operationNameUrl = "/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/operation-client-interface-1-0:operation-client-interface-pac/operation-client-interface-configuration/operation-name";
const operationKeyAttributePath = "/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/operation-client-interface-1-0:operation-client-interface-pac/operation-client-interface-configuration/operation-key";

/** 
 * This class provides functionality to instantiate a OperationClientInterfacePac instance and also to generate json object for the corresponding instance.
 * @extends layerProtocol
 */
class OperationClientInterface extends layerProtocol {

    static OperationClientInterfacePac = class OperationClientInterfacePac {
        operationClientInterfaceConfiguration;
        operationClientInterfaceStatus;

        /**
         * constructor 
         * @param {string} operationName name of the operation<br>
         */
        constructor(operationName) {
            this.operationClientInterfaceConfiguration = new OperationClientInterfacePac.OperationClientInterfaceConfiguration(operationName, OperationClientInterfacePac.defaultOperationKey);
            this.operationClientInterfaceStatus = new OperationClientInterfacePac.OperationClientInterfaceStatus(OperationClientInterfacePac.defaultOperationState, OperationClientInterfacePac.defaultLifeCycleState);
        }

        static OperationClientInterfaceConfiguration = class OperationClientInterfaceConfiguration {

            operationName;
            operationKey;

            /**
             * constructor 
             * @param {string} operationName name of the operation<br>
             * @param {string} operationKey ket of the operation<br>
             */
            constructor(operationName, operationKey) {
                this.operationName = operationName;
                this.operationKey = operationKey;
            }
        };

        static OperationClientInterfaceStatus = class OperationClientInterfaceStatus {
            operationState;
            lifeCycleState;

            static operationStateEnum = {
                AVAILABLE: "operation-client-interface-1-0:OPERATIONAL_STATE_TYPE_AVAILABLE",
                UNAVAILABLE: "operation-client-interface-1-0:OPERATIONAL_STATE_TYPE_UNAVAILABLE",
                NOT_YET_DEFINED: "operation-client-interface-1-0:OPERATIONAL_STATE_TYPE_NOT_YET_DEFINED"
            };
            static lifeCycleStateEnum = {
                EXPERIMENTAL: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_EXPERIMENTAL",
                OPERATIONAL: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_OPERATIONAL",
                DEPRICATED: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_DEPRICATED",
                OBSOLETE: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_OBSOLETE",
                UNKNOWN: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_UNKNOWN",
                NOT_YET_DEFINED: "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_NOT_YET_DEFINED"
            };

            /**
             * constructor 
             * @param {string} operationState operation state of the operation client<br>
             * @param {string} lifeCycleState life cycle state of the operation client<br>
             */
            constructor(operationState, lifeCycleState) {
                this.operationState = operationState;
                this.lifeCycleState = lifeCycleState;
            }
        };

        static layerProtocolName = layerProtocol.layerProtocolNameEnum.OPERATION_CLIENT;
        static defaultOperationKey = "Operation key not yet provided.";
        static defaultOperationState = OperationClientInterfacePac.OperationClientInterfaceStatus.operationStateEnum.NOT_YET_DEFINED;
        static defaultLifeCycleState = OperationClientInterfacePac.OperationClientInterfaceStatus.lifeCycleStateEnum.NOT_YET_DEFINED;

    }



    /**
     * constructor 
     * @param {string} operationName operation name of the client that needs to be called back.
     */
    constructor(operationName) {
        super(0, OperationClientInterface.OperationClientInterfacePac.layerProtocolName);
        this["operation-client-interface-1-0:operation-client-interface-pac"] = new OperationClientInterface.OperationClientInterfacePac(operationName);
    }

    /**
     * @description This function returns the operation name of the operation client.<br>
     * @param {String} operationClientUuid uuid of the operation client<br>
     * @returns {promise} returns the operation name<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> Iterate through the object and get the operation name from the configuration<br>
     **/
    static getOperationName(operationClientUuid) {
        return new Promise(async function (resolve, reject) {
            let operationName = undefined;
            try {
                let operationLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(operationClientUuid);
                operationName = operationLogicalTerminationPointInstance["layer-protocol"][0]["operation-client-interface-1-0:operation-client-interface-pac"]
                    ["operation-client-interface-configuration"]["operation-name"];
                resolve(operationName);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the operation key of the operation client.<br>
     * @param {String} operationClientUuid uuid of the operation client<br>
     * @returns {promise} returns the operation key<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> Iterate through the object and get the operation key from the configuration<br>
     **/
    static getOperationKey(operationClientUuid) {
        return new Promise(async function (resolve, reject) {
            let operationKey = undefined;
            try {
                let operationLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(operationClientUuid);
                operationKey = operationLogicalTerminationPointInstance["layer-protocol"][0]["operation-client-interface-1-0:operation-client-interface-pac"]
                    ["operation-client-interface-configuration"]["operation-key"];
                resolve(operationKey);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function sets the operation key of the operation client.<br>
     * @param {String} operationClientUuid uuid of the operation client<br>
     * @param {String} operationKey operation key that needs to be updated<br>
     * @returns {promise} returns true if the operaiton is successful<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the path to point to the operation key for the provided logical-termination-point<br>
     * <b>step 2 :</b> set the new operation key<br>
     **/
    static setOperationKey(operationClientUuid, operationKey) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            try {
                let setOperationKeyUrl = operationKeyAttributePath.replace("{uuid}", operationClientUuid);
                isUpdated = await fileOperation.writeToDatabase(setOperationKeyUrl, operationKey, false);
                resolve(isUpdated);
            } catch (error) {
                resolve(isUpdated);
            }
        });
    }

    /**
     * @description This function returns the tcp ip address and port where the application that provides the operation-client operation is running<br>
     * @param {String} operationClientUuid uuid of the operation<br>
     * @returns {promise} returns the tcp ip address and port where the application that provides the operation-client operation is running.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the associated http-client uuid(from server-ltp of operation-client interface)<br>
     * <b>step 2 :</b> Get the associated tcp-client uuid(from server-ltp of http-client interface)<br>
     * <b>step 3 :</b> Get the ip address and port in the format "<ipaddress>:<port>" of the tcp-client interface<br>
     **/
    static getTcpIpAddressAndPortForTheOperationClient(operationClientUuid) {
        return new Promise(async function (resolve, reject) {
            let IpAddressAndPort;
            try {
                let httpUuidList = await logicalTerminationPoint.getServerLtpList(operationClientUuid);
                let tcpUuidList = await logicalTerminationPoint.getServerLtpList(httpUuidList[0]);
                IpAddressAndPort = await tcpClientInterface.getTcpIpAddressAndPort(tcpUuidList[0]);
                resolve(IpAddressAndPort);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the operation client uuid information for the given http-client uuid and operation name<br>
     * @param {String} httpClientUuid uuid of the http-client<br>
     * @param {String} operationName name of the operation<br>
     * @returns {promise} returns the operation client uuid for the operation name<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the existing operaiton client list for the given http client uuid <br>
     * <b>step 2 :</b> find the operation client uuid for the operation name by iterating through each operation client<br>
     * <b>step 3 :</b> return the uuid for which the operation name is matched<br>
     **/
    static getOperationClientUuidForTheOperationName(httpClientUuid, operationName) {
        return new Promise(async function (resolve, reject) {
            let operationClientUuid;
            try {
                let existingOperationClientUuidList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);
                for (let i = 0; i < existingOperationClientUuidList.length; i++) {
                    let existingOperationName = await OperationClientInterface.getOperationName(existingOperationClientUuidList[i]);
                    if (operationName == existingOperationName) {
                        operationClientUuid = existingOperationClientUuidList[i];
                    }
                }
                resolve(operationClientUuid);
            } catch (error) {
                resolve(operationClientUuid);
            }
        });
    }

    /**
     * @description This function returns the operation client uuid information for the given http-client uuid and operation name<br>
     * @param {String} httpClientUuid uuid of the http-client<br>
     * @param {String} operationName name of the operation<br>
     * @returns {promise} returns the operation client uuid for the operation name<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the existing operaiton client list for the given http client uuid <br>
     * <b>step 2 :</b> find the operation client uuid for the operation name by iterating through each operation client<br>
     * <b>step 3 :</b> return the uuid for which the operation name is matched<br>
     **/
     static getOperationClientUuidThatContainsTheOperationName(httpClientUuid, operationName) {
        return new Promise(async function (resolve, reject) {
            let operationClientUuid;
            try {
                let existingOperationClientUuidList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);
                for (let i = 0; i < existingOperationClientUuidList.length; i++) {
                    let existingOperationName = await OperationClientInterface.getOperationName(existingOperationClientUuidList[i]);
                    if (existingOperationName.includes(operationName)) {
                        operationClientUuid = existingOperationClientUuidList[i];
                    }
                }
                resolve(operationClientUuid);
            } catch (error) {
                resolve(operationClientUuid);
            }
        });
    }

    /**
     * @description This function generates the operation client uuid for the given http client uuid and operation name<br>
     * @param {String} httpClientUuid uuid of the http client logical termination point.<br>
     * @param {String} operationName operation name of the operaiton client<br>
     * @returns {promise} returns the operation client uuid generated for the given http uuid.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the list of client LTPs mapped for the http client interface<br>
     * <b>step 2 :</b> check each operation client's operation name to check whether the operation is already available or not<br>
     * <b>step 3 :</b> If the operation name is already available , then the uuid of that operaiton client will be returned<br>
     * <b>step 4 :</b> If the operation name is not available already , then a new uuid will be generated by adding 1 to the last operation uuid in the client ltp list<br>
     **/
    static generateNextUuid(httpClientUuid, operationName) {
        return new Promise(async function (resolve, reject) {
            let operationClientUuid = undefined;
            try {
                let clientLtpList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);
                if (clientLtpList == undefined) {
                    resolve(httpClientUuid.replace("http", "op"))
                }
                if (clientLtpList.length == 0) {
                    resolve(httpClientUuid.replace("http", "op"))
                }
                for (let i = 0; i < clientLtpList.length; i++) {
                    let operationClientUuidIfExist = await OperationClientInterface.getOperationName(clientLtpList[i]);
                    if (operationClientUuidIfExist == operationName) {
                        operationClientUuid = operationClientUuidIfExist;
                    }
                }
                if (operationClientUuid == undefined) {
                    clientLtpList.sort();
                    let lastUuid = clientLtpList[clientLtpList.length - 1];
                    let uuidPrefix = lastUuid.substring(0, lastUuid.lastIndexOf("-") + 1);
                    let uuidNumber = lastUuid.substring(lastUuid.lastIndexOf("-") + 1, lastUuid.length);
                    operationClientUuid = uuidPrefix + (parseInt(uuidNumber) + 1);
                }
                resolve(operationClientUuid);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function creates a new http-client-interface and update the created instance to the logical-termination-point list<br>
     * @param {String} httpClientUuid http-client unique identifier for the new application in which the operation exists.<br>
     * @param {String} operationClientUuid operation-client uuid for the new operaiton<br>
     * @param {String} operationName name of the operation<br>
     * @returns {promise} returns true if the operaiton-client interface is created<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> creates a new operationClientInterface layer protocol instance<br>
     * <b>step 2 :</b> With the created operationclientInterface layer protocol instance , create a new logical termination point instance<br>
     * <b>step 3 :</b> Add the created logical termination point to the logical termination point using the method addAnInstanceToTheLogicalTerminationPointList in core model<br>
     **/
    static createOperationClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, operationClientUuid, operationName) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let operationLayerProtocol = new OperationClientInterface(operationName);
                let operationLogicalTerminationPoint = new logicalTerminationPoint(operationClientUuid, logicalTerminationPoint.ltpDirectionEnum.SINK, [], [httpClientUuid], [operationLayerProtocol]);
                let isCreated = await coreModel.addALogicalTerminationPointToTheLogicalTerminationPointList(operationLogicalTerminationPoint);
                if (isCreated) {
                    await logicalTerminationPoint.setClientLtpList(httpClientUuid, [operationClientUuid]);
                }
                resolve(isCreated);
            } catch (error) {
                reject(isCreated);
            }
        });
    }

    /**
     * @description This function modifies the operation name for the provided operation client uuid.<br>
     * @param {String} operationClientUuid uuid of the operation-client.<br>
     * @param {String} operationName name of the operation.<br>
     * @returns {promise} returns true if the value is updated or return false.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the url path to point out the operation-name of the correct operation-client instance<br>
     * <b>step 2 :</b> update the new value by calling the writeToDatabase() in the JSONDriver<br>
     **/
    static setOperationNameForTheUuid(operationClientUuid, operationName) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            try {
                let urlToUpdateOperationName = operationNameUrl.replace("{uuid}", operationClientUuid);
                let isUpdated = await fileOperation.writeToDatabase(urlToUpdateOperationName, operationName, false);
                resolve(isUpdated);
            } catch (error) {
                reject(isUpdated);
            }
        });
    }

}
module.exports = OperationClientInterface;