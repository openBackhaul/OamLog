/**
 * @file This module provides classes and functionality to manipulate the logical termination point
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const coreModel = require('../models/CoreModel.js');
const httpClientInterface = require('../models/layerprotocols/HttpClientInterface.js');
const operationClientInterface = require('../models/layerprotocols/OperationClientInterface.js');
const tcpClientInterface = require('../models/layerprotocols/TcpClientInterface.js');
const logicalTerminationPoint = require('../models/LogicalTerminationPoint.js');

/** 
 * This class holds the linked client(operation/http/tcp) logical-termination-point instances as a single object.<br> 
 * The information in this class will be further to create corresponding new client interfaces.
 * property @operationClientInformationList provides the uuid, operationName, whether the operation already exists or a new version 
 * property @httpClientInformation provides the uuid, applicationName, whether the application already exists or a new version
 * property @tcpClientInformation provides the uuid, remoteAddress, port, whether the tcp client of the application already exists or a new version
 */
class InstanceGroupInformation {
    operationClientInformationList = [];
    httpClientInformation;
    tcpClientInformation;

    /**
     * constructor 
     * @param {string} httpClientInformation instance of the httpClientInformation<br>
     * @param {string} tcpClientInformation instance of the tcpClientInformation<br>
     * @param {string} operationClientInformationList list of the operationClientInformation<br>
     */
    constructor(httpClientInformation, tcpClientInformation, operationClientInformationList) {
        this.httpClientInformation = httpClientInformation;
        this.tcpClientInformation = tcpClientInformation;
        this.operationClientInformationList = operationClientInformationList;
    }
    static operationClientInformation = class operationClientInformation {
        uuid;
        operationName;
        isExists;
        isNewVersion;

        /**
         * constructor 
         * @param {string} uuid operation cient unique identifier.<br>
         * @param {string} operationName operation name of the client.<br>
         * @param {string} isExists this flag provides the information whether the operation name is already available .<br>
         * @param {string} isNewVersion this flag provides the information whether the operation name is already available with a different version.<br>
         */
        constructor(uuid, operationName, isExists, isNewVersion) {
            this.uuid = uuid;
            this.operationName = operationName;
            this.isExists = isExists;
            this.isNewVersion = isNewVersion;
        }
    };

    static httpClientInformation = class httpClientInformation {
        uuid;
        applicationName;
        releaseNumber;
        isExists;

        /**
         * constructor 
         * @param {string} uuid operation cient unique identifier.<br>
         * @param {string} applicationName name of the client application.<br>
         * @param {string} releaseNumber release number of the client application<br>
         * @param {string} isExists this flag provides the information whether the application name with the same release already exist.<br>
         * This constructor will instantiate the httpClientInformation class
         */
        constructor(uuid, applicationName, releaseNumber, isExists) {
            this.uuid = uuid;
            this.applicationName = applicationName;
            this.releaseNumber = releaseNumber;
            this.isExists = isExists;
        }
    };

    static tcpClientInformation = class tcpClientInformation {
        uuid;
        ipv4Address;
        port;
        isExists;
        isNewVersion;

        /**
         * constructor 
         * @param {string} uuid operation cient unique identifier.<br>
         * @param {string} ipv4Address ip address of the client application.<br>
         * @param {string} port port where the client application is running<br>
         * @param {string} isExists this flag provides the information whether the tcp client already exist .<br>
         * @param {string} isNewVersion this flag provides whether the tcp server of the application name with the same release already exist.<br>
         * This constructor will instantiate the tcpClientInformation class
         */
        constructor(uuid, ipv4Address, port, isExists, isNewVersion) {
            this.uuid = uuid;
            this.ipv4Address = ipv4Address;
            this.port = port;
            this.isExists = isExists;
            this.isNewVersion = isNewVersion;
        }
    };
}

/******************************************************************************************************************************************
 * Funtions to manipulate the logical-termination-point
 ******************************************************************************************************************************************/

/**
 * @description This function creates the InstanceGroupInformation for the provided input.
 * @param {String} applicationName name of the client application<br>
 * @param {String} releaseNumber release of the client application<br>
 * @param {String} ipv4Address ip address of the client application<br>
 * @param {String} port port of the client application<br>
 * @param {array} operationList list of operation client that needs to be created<br>
 * @return {object} InstanceGroupInformationInstance , returns the generated instance group information<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the http-client uuid of the application and release number <br>
 * <b>step 2 :</b> If the application already exists , then call the instantiateInstanceGroupInformationForAnExistingApplication() method to proceed further<br>
 * <b>step 3 :</b> If the application is new , then call the instantiateInstanceGroupInformationForANewApplication() method to proceed further<br>
 **/
function instantiateInstanceGroupInformation(applicationName, releaseNumber, ipv4Address, port, operationList) {
    return new Promise(async function (resolve, reject) {
        let InstanceGroupInformationInstance;
        try {
            let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, releaseNumber);
            if (httpClientUuid == undefined) {
                InstanceGroupInformationInstance = await instantiateInstanceGroupInformationForANewApplication(applicationName, releaseNumber, ipv4Address, port, operationList);
            } else {
                InstanceGroupInformationInstance = await instantiateInstanceGroupInformationForAnExistingApplication(applicationName, releaseNumber, ipv4Address, port, operationList, httpClientUuid);
            }
            resolve(InstanceGroupInformationInstance);
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function creates the InstanceGroupInformation for an entire new application.
 * @param {String} applicationName name of the client application , one of the input to create a http client instance<br>
 * @param {String} releaseNumber release of the client application , one of the input to create a http client instance<br>
 * @param {String} ipv4Address ip address of the client application , one of the input to create a tcp client instance<br>
 * @param {String} port port of the client application , one of the input to create a tcp client instance<br>
 * @param {array}  operationList list of operation client that needs to be created<br>
 * @return {object} instanceGroupInformation contains the created client uuid information
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> generate the next http client uuid<br>
 * <b>step 2 :</b> generate the tcp client for the http client<br>
 * <b>step 3 :</b> generate the next operation client uuid list for the number of operations in the operationList<br>
 * <b>step 5 :</b> create the instance group information<br>
 **/
function instantiateInstanceGroupInformationForANewApplication(applicationName, releaseNumber, ipv4Address, port, operationList) {
    return new Promise(async function (resolve, reject) {
        try {
            let httpClientUuid = await httpClientInterface.generateNextUuid();
            let httpClientInformationInstance = new InstanceGroupInformation.httpClientInformation(httpClientUuid, applicationName, releaseNumber, false);
            let tcpCientUuid = tcpClientInterface.generateNextUuid(httpClientUuid);
            let tcpClientInformationInstance = new InstanceGroupInformation.tcpClientInformation(tcpCientUuid, ipv4Address, port, false, false);
            let operationClientInformationList = [];
            if (operationList != undefined) {
                operationClientInformationList = await instantiateOperationClientInformationListForANewApplication(operationList, httpClientUuid);
            }
            let InstanceGroupInformationInstance = new InstanceGroupInformation(httpClientInformationInstance, tcpClientInformationInstance, operationClientInformationList);
            resolve(InstanceGroupInformationInstance);
        } catch (error) {
            reject();
        }

    });
}

/**
 * @description This function creates the InstanceGroupInformation for an existing application.
 * @param {String} applicationName name of the client application<br>
 * @param {String} releaseNumber release of the client application<br>
 * @param {String} ipv4Address ip address of the client application<br>
 * @param {String} port port of the client application<br>
 * @param {String} httpClientUuid http-client uuid of the existing application<br>
 * @param {array} operationList list of operation client that needs to be created<br>
 * @return {object} operationClientUuidInformationInstance , returns the generated operation client infomations<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> generate httpClientInformationInstance for the existing  http client application <br>
 * <b>step 2 :</b> generate tcpClientInformationInstance for the existing  tcp client application<br>
 * <b>step 3 :</b> generate operationClientInformationInstance for the operation client application<br>
 **/
function instantiateInstanceGroupInformationForAnExistingApplication(applicationName, releaseNumber, ipv4Address, port, operationList, httpClientUuid) {
    return new Promise(async function (resolve, reject) {
        try {
            let InstanceGroupInformationInstance;
            let httpClientInformationInstance = new InstanceGroupInformation.httpClientInformation(httpClientUuid, applicationName, releaseNumber, true);
            let tcpClientInformationInstance = await instantiateTcpClientInformation(httpClientUuid, ipv4Address, port);
            let operationClientInformationList = await instantiateOperationClientInformationForAnExistingHttpClient(httpClientUuid, operationList);
            InstanceGroupInformationInstance = new InstanceGroupInformation(httpClientInformationInstance, tcpClientInformationInstance, operationClientInformationList);
            resolve(InstanceGroupInformationInstance);
        } catch (error) {
            reject();
        }

    });
}

/**
 * @description This function creates a instance for the class TcpClientInformation for the given input<br>
 * @param {String} httpClientUuid uuid of the http client instance<br>
 * @param {String} ipv4Address ip address of the client application , one of the input to create a tcp client instance<br>
 * @param {String} port port of the client application , one of the input to create a tcp client instance<br>
 * @return {object} tcpClientInformationInstance , returns the generated tcp client infomations<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> Check if the tcp client instance already exists ? <br>
 * <b>step 2 :</b> If the tcp instance doesnt exists , then create a new instance<br>
 **/
function instantiateTcpClientInformation(httpClientUuid, ipv4Address, port) {
    return new Promise(async function (resolve, reject) {
        try {
            let tcpClientUuidList = await logicalTerminationPoint.getServerLtpList(httpClientUuid);
            let tcpClientUuid;
            let tcpClientInformationInstance;
            let isExists = false;
            let isNewVersion = false;
            if (tcpClientUuidList == undefined) {
                tcpClientUuid = tcpClientInterface.generateNextUuid(httpClientUuid);
            } else {
                isExists = true;
                for (let i = 0; i < tcpClientUuidList.length; i++) {
                    tcpClientUuid = tcpClientUuidList[i];
                }
                let domainName = await tcpClientInterface.getTcpIpAddressAndPort(tcpClientUuid);
                if (domainName != (ipv4Address + ":" + port)) {
                    isNewVersion = true;
                }
            }
            tcpClientInformationInstance = new InstanceGroupInformation.tcpClientInformation(tcpClientUuid, ipv4Address, port, isExists, isNewVersion)
            resolve(tcpClientInformationInstance);
        } catch (error) {
            reject();
        }

    });
}

/**
 * @description This function creates a instance for the class OperationClientInformation for an existing HttpClient instance.
 * @param {String} httpClientUuid uuid of the http client instance<br>
 * @param {String} operationList list of operation for which we have to generate logical termination point<br>
 * @return {object} operationClientUuidInformationInstance , returns the generated operation client infomations<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> Check if the operation client instance already exists ? <br>
 * <b>step 2 :</b> If the operation client instance doesnt exists , then create a new instance<br>
 **/
function instantiateOperationClientInformationForAnExistingHttpClient(httpClientUuid, operationList) {
    return new Promise(async function (resolve, reject) {
        try {
            let operationClientInformationList = [];
            let existingOperationClientUuidList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);
            if (existingOperationClientUuidList == undefined || existingOperationClientUuidList.length == 0) {
                if (operationList != undefined) {
                    operationClientInformationList = await instantiateOperationClientInformationListForANewApplication(operationList, httpClientUuid);
                }
            } else {
                let newOperationList = [];
                for (let i = 0; i < operationList.length; i++) {
                    let operationName = operationList[i];
                    let isExists = false;
                    let isNewVersion = false;
                    let nextOperationClientUuid = undefined;
                    for (let j = 0; j < existingOperationClientUuidList.length; j++) {
                        let operationClientUuid = existingOperationClientUuidList[j];
                        let existingOperationName = await operationClientInterface.getOperationName(operationClientUuid);
                        let existingOperationNameVersion = existingOperationName.split("/")[1];
                        existingOperationName = existingOperationName.split("/")[2];
                        let newOperationNameVersion = operationName.split("/")[1];
                        let newOperationName = operationName.split("/")[2];
                        if (existingOperationName == newOperationName) {
                            isExists = true;
                            nextOperationClientUuid = operationClientUuid;
                            if (existingOperationNameVersion != newOperationNameVersion) {
                                isNewVersion = true;
                            }
                        }
                    }
                    if (nextOperationClientUuid != undefined) {
                        let operationClientInformation = new InstanceGroupInformation.operationClientInformation(nextOperationClientUuid,
                            operationName, isExists, isNewVersion);
                        operationClientInformationList.push(operationClientInformation);
                    } else {
                        newOperationList.push(operationName);
                    }
                }
                if (newOperationList.length > 0) {
                    let newoperationClientUuidInformationList = await instantiateOperationClientInformationListForANewApplication(newOperationList, httpClientUuid);
                    for (let i = 0; i < newoperationClientUuidInformationList.length; i++) {
                        operationClientInformationList.push(newoperationClientUuidInformationList[i]);
                    }
                }
            }
            resolve(operationClientInformationList);
        } catch (error) {
            reject();
        }

    });
}



/**
 * @description This function creates the operation client instanc information based on the received input.
 * @param {String} operationList list of operation name<br>
 * @param {String} httpClientUuid uuid of http-client<br>
 * @return {Promise} operatonClientInformationList
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the next available operation client uuid for the http client instance <br>
 * <b>step 2 :</b> for each operation name , create a operationClient information instance<br>
 **/

function instantiateOperationClientInformationListForANewApplication(operationList, httpClientUuid) {
    return new Promise(async function (resolve, reject) {
        try {
            let operationClientInformationList = [];
            if (operationList != undefined) {
                let nextOperationUuid = await operationClientInterface.generateNextUuid(httpClientUuid,"");
                for (let i = 0; i < operationList.length; i++) {
                    let uuidPrefix = nextOperationUuid.substring(0, nextOperationUuid.lastIndexOf("-") + 1);
                    let uuidNumber = nextOperationUuid.substring(nextOperationUuid.lastIndexOf("-") + 1, nextOperationUuid.length);
                    let newUuid = uuidPrefix + (parseInt(uuidNumber) + i);
                    let operationClientInformation = new InstanceGroupInformation.operationClientInformation(newUuid,
                        operationList[i], false, false);
                    operationClientInformationList.push(operationClientInformation);
                }
            }
            resolve(operationClientInformationList);
        } catch (error) {
            reject();
        }

    });
}

/**
 * @description This function creates the tcp,http,operation client instances(if it doesnt exist) and link them together.
 * @param {String} applicationName name of the client application<br>
 * @param {String} releaseNumber release of the client application<br>
 * @param {String} ipv4Address ip address of the client application<br>
 * @param {String} port port of the client application<br>
 * @param {array} operationList list of operation client that needs to be created<br>
 * @return {object} operationClientUuidInformationInstance , returns the generated operation client infomations<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> generate httpClientInformationInstance for the existing  http client application <br>
 * <b>step 2 :</b> generate tcpClientInformationInstance for the existing  tcp client application<br>
 * <b>step 3 :</b> generate operationClientInformationInstance for the operation client application<br>
 **/
exports.createLogicalTerminationPointInstanceGroup = function (applicationName, releaseNumber, ipv4Address, port, operationList) {
    return new Promise(async function (resolve, reject) {
        try {
            let logicalTerminationPointInstanceInformations = await instantiateInstanceGroupInformation(applicationName, releaseNumber, ipv4Address, port, operationList);
            let httpClientInformation = logicalTerminationPointInstanceInformations.httpClientInformation;
            let tcpClientInformation = logicalTerminationPointInstanceInformations.tcpClientInformation;
            let operationClientInformationList = logicalTerminationPointInstanceInformations.operationClientInformationList;
            let httpClientUuid = httpClientInformation.uuid;
            let tcpClientUuid = tcpClientInformation.uuid;
            let operationClientUuidList = [];
            for (let i = 0; i < operationClientInformationList.length; i++) {
                operationClientUuidList.push(operationClientInformationList[i].uuid);
            }
            if (httpClientInformation.isExists == true) {
                if (tcpClientInformation.isExists == false) {
                    await tcpClientInterface.createTcpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, tcpClientUuid, ipv4Address, port);
                } else if (tcpClientInformation.isExists == true && tcpClientInformation.isNewVersion == true) {
                    await tcpClientInterface.setTcpRemoteAddressAndPortForTheUuid(tcpClientInformation.uuid, ipv4Address, port);
                }
                if (operationClientInformationList.length > 0) {
                    for (let i = 0; i < operationClientInformationList.length; i++) {
                        let operationClientInformation = operationClientInformationList[i];
                        if (operationClientInformation.isExists == true) {
                            if (operationClientInformation.isNewVersion == true) {
                                operationClientInterface.setOperationNameForTheUuid(operationClientInformation.uuid, operationClientInformation.operationName);
                            }
                        } else {
                            await operationClientInterface.createOperationClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid,
                                operationClientInformation.uuid, operationClientInformation.operationName);
                        }
                    }
                }
            } else {
                let isCreated = await httpClientInterface.createHttpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid,
                    operationClientUuidList, tcpClientUuid, applicationName, releaseNumber);
                if (isCreated) {
                    await tcpClientInterface.createTcpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, tcpClientUuid, ipv4Address, port);
                    if (operationClientInformationList.length > 0) {
                        for (let i = 0; i < operationClientInformationList.length; i++) {
                            let operationClientInformation = operationClientInformationList[i];
                            await operationClientInterface.createOperationClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid,
                                operationClientInformation.uuid, operationClientInformation.operationName);
                        }
                    }
                }
            }
            resolve(operationClientInformationList);
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function creates the tcp,http,operation client instances(if it doesnt exist) and link them together.
 * @param {String} applicationName name of the client application<br>
 * @param {String} releaseNumber release of the client application<br>
 * @param {String} ipv4Address ip address of the client application<br>
 * @param {String} port port of the client application<br>
 * @param {array} operationList list of operation client that needs to be created<br>
 * @return {object} operationClientUuidInformationInstance , returns the generated operation client infomations<br>
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> generate httpClientInformationInstance for the existing  http client application <br>
 * <b>step 2 :</b> generate tcpClientInformationInstance for the existing  tcp client application<br>
 * <b>step 3 :</b> generate operationClientInformationInstance for the operation client application<br>
 **/
 exports.updateLogicalTerminationPointInstanceGroup = function (applicationName, releaseNumber, ipv4Address, port, operationList) {
    return new Promise(async function (resolve, reject) {
        try {
            let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, releaseNumber);
            let operationClientInformationList = [];
            if (httpClientUuid != undefined) {
                let logicalTerminationPointInstanceInformations = await instantiateInstanceGroupInformationForAnExistingApplication(applicationName, releaseNumber, ipv4Address, port, operationList, httpClientUuid);
                let httpClientInformation = logicalTerminationPointInstanceInformations.httpClientInformation;
                let tcpClientInformation = logicalTerminationPointInstanceInformations.tcpClientInformation;
                operationClientInformationList = logicalTerminationPointInstanceInformations.operationClientInformationList;
                let tcpClientUuid = tcpClientInformation.uuid;
                let operationClientUuidList = [];
                for (let i = 0; i < operationClientInformationList.length; i++) {
                    operationClientUuidList.push(operationClientInformationList[i].uuid);
                }
                if (httpClientInformation.isExists == true) {
                    if (tcpClientInformation.isExists == false) {
                        await tcpClientInterface.createTcpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, tcpClientUuid, ipv4Address, port);
                    } else if (tcpClientInformation.isExists == true && tcpClientInformation.isNewVersion == true) {
                        await tcpClientInterface.setTcpRemoteAddressAndPortForTheUuid(tcpClientInformation.uuid, ipv4Address, port);
                    }
                    if (operationClientInformationList.length > 0) {
                        for (let i = 0; i < operationClientInformationList.length; i++) {
                            let operationClientInformation = operationClientInformationList[i];
                            if (operationClientInformation.isExists == true) {
                                if (operationClientInformation.isNewVersion == true) {
                                    await operationClientInterface.setOperationNameForTheUuid(operationClientInformation.uuid, operationClientInformation.operationName);
                                }
                            } else {
                                await operationClientInterface.createOperationClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid,
                                    operationClientInformation.uuid, operationClientInformation.operationName);
                            }
                        }
                    }
                }
            }
            resolve(operationClientInformationList);
        } catch (error) {
            reject();
        }
    });
}

/**
 * @description This function deletes the tcp,http,operation client for the provided application and release number.
 * @param {String} applicationName name of the client application<br>
 * @param {String} releaseNumber release of the client application<br>
 * @returns {Promise} OperationClientLists associated to the application
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get the httpClientUuid for the application name and release number <br>
 * <b>step 2 :</b> get the server ltp list of the http-client to get the tcp-client uuid<br>
 * <b>step 3 :</b> get the client ltp list of the http-client to get the operaiton-client uuid list<br>
 * <b>step 4 :</b> delete the uuid list one by one by using the method deleteALogicalTerminationPointFromTheLogicalTerminationPointList in coremodel<br>
 **/
exports.deleteLogicalTerminationPointInstanceGroup = function (applicationName, releaseNumber) {
    return new Promise(async function (resolve, reject) {        
        try {
            let uuidList = [];
            let httpClientUuid = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, releaseNumber)
            uuidList.push(httpClientUuid);
            uuidList.push((await logicalTerminationPoint.getServerLtpList(httpClientUuid))[0]);
            let operationClientUuidList = await logicalTerminationPoint.getClientLtpList(httpClientUuid);
            for (let i = 0; i < operationClientUuidList.length; i++) {
                uuidList.push(operationClientUuidList[i]);
            }
            for (let i = 0; i < uuidList.length; i++) {
                await coreModel.deleteALogicalTerminationPointFromTheLogicalTerminationPointList(uuidList[i]);
            }
            resolve(operationClientUuidList);
        } catch (error) {
            reject();
        }
    });
}