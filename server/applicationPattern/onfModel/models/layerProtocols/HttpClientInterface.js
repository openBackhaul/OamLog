/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a HttpClientInterface layer protocol.<br>
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
const fileOperation = require('../../../databaseDriver/JSONDriver.js');
const releaeNumberAttributePath = "/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/release-number";

/** 
 * @extends layerProtocol
 */
class HttpClientInterface extends layerProtocol {
    /**
     * HttpClientInterfacePac class holds the following properties,<br>
     * 1. layerProtocolName - The value of this parameter will be http-client-interface-1-0:LAYER_PROTOCOL_NAME_TYPE_HTTP_LAYER always<br>
     * 2. HttpClientInterfaceCapability - which is a class that holds the name of the client application and release number<br>
     */
    static HttpClientInterfacePac = class HttpClientInterfacePac {
        static layerProtocolName = layerProtocol.layerProtocolNameEnum.HTTP_CLIENT;
        httpClientInterfaceCapability;
        httpClientInterfaceConfiguration;

        static HttpClientInterfaceCapability = class HttpClientInterfaceCapability {
            applicationName;
            /**
             * constructor 
             * @param {string} applicationName name of the client application.
             * This constructor will instantiate the httpClientInterfaceCapability class
             */
            constructor(applicationName) {
                this.applicationName = applicationName;
            }
        };

        static HttpClientInterfaceConfiguration = class HttpClientInterfaceConfiguration {
            releaseNumber;
            /**
             * constructor 
             * @param {string} releaseNumber release number of the client application.
             * This constructor will instantiate the httpClientInterfaceConfiguration class
             */
            constructor(releaseNumber) {
                this.releaseNumber = releaseNumber;
            }
        };

        /**
         * constructor 
         * @param {string} applicationName name of the client application.
         * @param {string} releaseNumber release number of the client application.
         * This constructor will instantiate the HttpClientInterfacePac class
         */
        constructor(applicationName, releaseNumber) {
            this.httpClientInterfaceCapability = new HttpClientInterfacePac.HttpClientInterfaceCapability(applicationName);
            this.httpClientInterfaceConfiguration = new HttpClientInterfacePac.HttpClientInterfaceConfiguration(releaseNumber);
        }
    }

    /**
     * constructor 
     * @param {string} applicationName name of the client application.
     * @param {string} releaseNumber release number of the client application.
     * This constructor will instantiate the HttpClientInterface class
     */
    constructor(applicationName, releaseNumber) {
        super(0, HttpClientInterface.HttpClientInterfacePac.layerProtocolName);
        this["http-client-interface-1-0:http-client-interface-pac"] = new HttpClientInterface.HttpClientInterfacePac(applicationName, releaseNumber);
    }

    /**
     * @description This function returns the application name for the http client uuid<br>
     * @param {String} httpClientUuid uuid of the http-client-interface <br>
     * @returns {promise} returns the application name<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> get the application name from the http-client interface capability <br>
     **/
    static getApplicationName(httpClientUuid) {
        return new Promise(async function (resolve, reject) {
            let httpClientApplicationName;
            try {
                let httpLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(httpClientUuid);
                httpClientApplicationName = httpLogicalTerminationPointInstance["layer-protocol"][0]
                    ["http-client-interface-1-0:http-client-interface-pac"]["http-client-interface-capability"]["application-name"];
                resolve(httpClientApplicationName);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the release number for the http client uuid<br>
     * @param {String} httpClientUuid uuid of the http-client-interface <br>
     * @returns {promise} returns the release number<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> Get the release number from the http-client interface configuration<br>
     **/
    static getReleaseNumber(httpClientUuid) {
        return new Promise(async function (resolve, reject) {
            let httpClientReleaseNumber;
            try {
                let httpLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(httpClientUuid);
                httpClientReleaseNumber = httpLogicalTerminationPointInstance["layer-protocol"][0]
                    ["http-client-interface-1-0:http-client-interface-pac"]["http-client-interface-configuration"]["release-number"];
                resolve(httpClientReleaseNumber);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function sets the release number for the http client uuid<br>
     * @param {String} httpClientUuid uuid of the http-client-interface <br>
     * @param {String} newReleaseNumber new release number of the http-client-interface <br>
     * @returns {promise} returns true if the value is set<br>
      * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the path to point to the release-number for the provided logical-termination-point<br>
     * <b>step 2 :</b> set the new release number<br>
     **/
     static setReleaseNumber(httpClientUuid,newReleaseNumber) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            try {
                let setReleaseNumberUrl = releaeNumberAttributePath.replace("{uuid}",httpClientUuid);
                isUpdated = await fileOperation.writeToDatabase(setReleaseNumberUrl, newReleaseNumber, false);
                resolve(isUpdated);
            } catch (error) {
                resolve(isUpdated);
            }
        });
    }

    /**
     * @description This function returns the next available uuid for the http-client-interface.<br>
     * @returns {promise} returns the next free uuid instance that can be used for the http-client-interface ltp creation.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> use the method getUuidListForTheProtocol() to get all the uuids for the provided layer-protocol-name <br>
     * <b>step 2 :</b> Sort the uuid list in ascending order<br>
     * <b>step 3 :</b> Get the last index of the array and add 10 <br>
     **/
     static generateNextUuid() {
        return new Promise(async function (resolve, reject) {
            try {
                let newUuid;
                let uuidList = await logicalTerminationPoint.getUuidListForTheProtocol(layerProtocol.layerProtocolNameEnum.HTTP_CLIENT);
                if (uuidList != undefined) {
                    uuidList.sort();
                    let lastUuid = uuidList[uuidList.length - 1];
                    let uuidPrefix = lastUuid.substring(0, lastUuid.lastIndexOf("-") + 1);
                    let uuidNumber = lastUuid.substring(lastUuid.lastIndexOf("-") + 1, lastUuid.length);
                    newUuid = uuidPrefix + (parseInt(uuidNumber) + 10);
                }
                resolve(newUuid);
            } catch (error) {
                reject(undefined);
            }
        });
    } 

    /**
     * @description This function returns the uuid of the http-client-interface for the application-name and release-number.<br>
     * @param {String} applicationName name of the application.<br>
     * @param {String} releaseNumber release number of the application.<br>
     * @returns {promise} returns http logical-termination-point uuid or undefined incase if there is no match found.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance list for the layer protocol http-client-interface-1-0:LAYER_PROTOCOL_NAME_TYPE_HTTP_LAYER<br>
     * <b>step 2 :</b> Iterate through the list and filter the uuids for the required applicationName and releaseNumber<br>
     **/
    static getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, releaseNumber) {
        return new Promise(async function (resolve, reject) {
            let httpClientUuid = undefined;
            try {
                let httpLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.HTTP_CLIENT);
                if (httpLogicalTerminationPointInstanceList != undefined) {
                    for (let i = 0; i < httpLogicalTerminationPointInstanceList.length; i++) {
                        let httpLogicalTerminationPointInstance = httpLogicalTerminationPointInstanceList[i];
                        let httpClientInterfacePac = httpLogicalTerminationPointInstance["layer-protocol"][0]["http-client-interface-1-0:http-client-interface-pac"];
                        if (httpClientInterfacePac != undefined) {
                            let httpClientApplicationName = httpClientInterfacePac["http-client-interface-capability"]["application-name"];
                            let httpClientReleaseName = httpClientInterfacePac["http-client-interface-configuration"]["release-number"];
                            if (httpClientApplicationName != undefined && httpClientApplicationName == applicationName &&
                                httpClientReleaseName != undefined && httpClientReleaseName == releaseNumber) {
                                httpClientUuid = httpLogicalTerminationPointInstance["uuid"];
                            }
                        }
                    }
                }
                resolve(httpClientUuid);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function creates a new http-client-interface and update the created instance to the logical-termination-point list<br>
     * @param {String} httpClientUuid http client unique identifier for the new application.<br>
     * @param {String} operationClientUuidList associated services for the application.<br>
     * @param {String} tcpClientUuid tcp client uuid that provides information about the ip address and port number of the application<br>
     * @param {String} applicationName name of the application.<br>
     * @param {String} releaseNumber release number of the application.<br>
     * @returns {promise} returns true if the http-client interface is created<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> creates a new httpClientInterface layer protocol instance<br>
     * <b>step 2 :</b> With the created httpclientInterface layer protocol instance , create a new logical termination point instance<br>
     * <b>step 3 :</b> Add the created logical termination point to the logical termination point using the method addAnInstanceToTheLogicalTerminationPointList in core model<br>
     **/
    static createHttpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, operationClientUuidList, tcpClientUuid, applicationName, releaseNumber) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let httpLayerProtocol = new HttpClientInterface(applicationName, releaseNumber);
                let httpLogicalTerminationPoint = new logicalTerminationPoint(httpClientUuid, logicalTerminationPoint.ltpDirectionEnum.SINK, operationClientUuidList, [tcpClientUuid], [httpLayerProtocol]);
                isCreated = await coreModel.addALogicalTerminationPointToTheLogicalTerminationPointList(httpLogicalTerminationPoint);
                resolve(isCreated);
            } catch (error) {
                reject(isCreated);
            }
        });
    }

}

module.exports = HttpClientInterface;