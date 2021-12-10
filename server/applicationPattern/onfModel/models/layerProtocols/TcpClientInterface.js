/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a tcpClientInterface layer protocol.<br>
 * This class is a sub class for LayerProtocol <br>
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.08.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 **/

'use strict';
const layerProtocol = require('../LayerProtocol');
const coreModel = require('../CoreModel');
const logicalTerminationPoint = require('../LogicalTerminationPoint');
const fileOperation = require('../../../databaseDriver/JSONDriver.js');
const tcpIpAddressUrl = "/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/tcp-client-interface-1-0:tcp-client-interface-pac/tcp-client-interface-configuration/remote-address/ip-address/ipv-4-address";
const tcpPortUrl = "/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/tcp-client-interface-1-0:tcp-client-interface-pac/tcp-client-interface-configuration/remote-port";

/** 
 * @extends layerProtocol
 */
class TcpClientInterface extends layerProtocol {

    static TcpClientInterfacePac = class TcpClientInterfacePac {
        tcpClientInterfaceConfiguration;
        static layerProtocolName = layerProtocol.layerProtocolNameEnum.TCP_CLIENT;
        static TcpClientInterfaceConfiguration = class TcpClientInterfaceConfiguration {
            remoteAddress;
            remotePort;
            static RemoteAddress = class RemoteAddress {
                ipAddress;
                static IpAddress = class IpAddress {
                    ipv4Address;

                    /**
                     * constructor 
                     * @param {string} ipv4Address tcp ipaddress where the application is hosted <br>
                     */
                    constructor(ipv4Address) {
                        this.ipv4Address = ipv4Address;
                    }
                }

                /**
                 * constructor 
                 * @param {string} ipAddress tcp ipaddress where the application is hosted <br>
                 */
                constructor(ipAddress) {
                    this.ipAddress = new RemoteAddress.IpAddress(ipAddress);
                }
            };

            /**
             * constructor 
             * @param {string} remoteAddress tcp ipaddress where the application is hosted <br>
             * @param {string} remotePort tcp port where the application is running <br>
             */
            constructor(remoteAddress, remotePort) {
                this.remoteAddress = new TcpClientInterfaceConfiguration.RemoteAddress(remoteAddress);
                this.remotePort = remotePort;
            }
        };

        /**
         * constructor 
         * @param {string} remoteAddress tcp ipaddress where the application is hosted <br>
         * @param {string} remotePort tcp port where the application is running <br>
         */
        constructor(remoteAddress, remotePort) {
            this.tcpClientInterfaceConfiguration = new TcpClientInterfacePac.TcpClientInterfaceConfiguration(remoteAddress, remotePort);
        }
    };

    /**
     * constructor 
     * @param {string} remoteAddress tcp ipaddress where the application is hosted <br>
     * @param {string} remotePort tcp port where the application is running <br>
     */
    constructor(remoteAddress, remotePort) {
        super(0, TcpClientInterface.TcpClientInterfacePac.layerProtocolName);
        this["tcp-client-interface-1-0:tcp-client-interface-pac"] = new TcpClientInterface.TcpClientInterfacePac(remoteAddress, remotePort);
    }

    /**
     * @description This function returns the tcp ip address and port(in the format <ipaddress>:<port>) where the application is running .<br>
     * @param {String} tcpClientUuid uuid of the tcp client<br>
     * @returns {promise} returns tcp ip address and port<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get remote address by using the method getTcpIpAddress()<br>
     * <b>step 2 :</b> get remote port by using the method getTcpPort() <br>
     * <b>step 3 :</b> formulate the ipAddress and port of the application <br>
     **/
    static getTcpIpAddressAndPort(tcpClientUuid) {
        return new Promise(async function (resolve, reject) {
            let tcpIpAddressAndPort;
            try {
                let tcpClientIpV4Address = await TcpClientInterface.getRemoteAddress(tcpClientUuid);
                let tcpClientPort = await TcpClientInterface.getRemotePort(tcpClientUuid);
                tcpIpAddressAndPort = tcpClientIpV4Address + ":" + tcpClientPort;
                resolve(tcpIpAddressAndPort);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the tcp ip address where the application is running .<br>
     * @param {String} tcpClientUuid uuid of the tcp client<br>
     * @returns {promise} returns tcp ip address<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> get the remote-address<br>
     **/
    static getRemoteAddress(tcpClientUuid) {
        return new Promise(async function (resolve, reject) {
            let tcpClientIpV4Address;
            try {
                let tcpLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(tcpClientUuid);
                tcpClientIpV4Address = tcpLogicalTerminationPointInstance["layer-protocol"][0]["tcp-client-interface-1-0:tcp-client-interface-pac"]
                    ["tcp-client-interface-configuration"]["remote-address"]["ip-address"]["ipv-4-address"];
                resolve(tcpClientIpV4Address);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the tcp port where the application is running .<br>
     * @param {String} tcpClientUuid uuid of the tcp client<br>
     * @returns {promise} returns tcp port<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the logical-termination-point instance for the uuid using the method getLogicalTerminationPointForTheUuid() in core-model<br>
     * <b>step 2 :</b> get the remote-port<br>
     **/
    static getRemotePort(tcpClientUuid) {
        return new Promise(async function (resolve, reject) {
            let tcpClientPort = undefined;
            try {
                let tcpLogicalTerminationPointInstance = await coreModel.getLogicalTerminationPointForTheUuid(tcpClientUuid);
                tcpClientPort = tcpLogicalTerminationPointInstance["layer-protocol"][0]["tcp-client-interface-1-0:tcp-client-interface-pac"]
                    ["tcp-client-interface-configuration"]["remote-port"];
                resolve(tcpClientPort);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function generates the tcp-client uuid for the given http-client uuid<br>
     * @param {String} httpClientUuid uuid of the http-client-interface logical-termination-point.<br>
     * @returns {promise} returns the tcp-client uuid generated for the given http-client uuid.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> replace the string "http" with "tcp" in the httpClientUuid<br>
     * <b>step 2 :</b> return the new tcp uuid<br>
     **/
     static generateNextUuid(httpClientUuid) {
        let tcpClientUuid;
        try {
            tcpClientUuid = httpClientUuid.replace("http", "tcp");
            return tcpClientUuid;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * @description This function creates a new http-client-interface and update the created instance to the logical-termination-point list<br>
     * @param {String} httpClientUuid http-client uuid for the application for which we are going to create the tcp-client-interface<br>
     * @param {String} tcpClientUuid tcp-client uuid to create the new tcp-client instance<br>
     * @param {String} ipv4Address ipaddress where the application is hosted<br>
     * @param {String} port port where the application is running<br>
     * @returns {promise} returns true if the tcp-client interface is created<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> creates a new tcpClientInterface layer protocol instance<br>
     * <b>step 2 :</b> With the created tcpclientInterface layer protocol instance , create a new logical termination point instance<br>
     * <b>step 3 :</b> Add the created logical termination point to the logical termination point using the method addAnInstanceToTheLogicalTerminationPointList in core model<br>
     **/
    static createTcpClientInterfaceAndAddtoLogicalTerminationPoint(httpClientUuid, tcpClientUuid, ipv4Address, port) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                let tcpLayerProtocol = new TcpClientInterface(ipv4Address, port);
                let tcpLogicalTerminationPoint = new logicalTerminationPoint(tcpClientUuid, logicalTerminationPoint.ltpDirectionEnum.SINK, [httpClientUuid], [], [tcpLayerProtocol]);
                isCreated = await coreModel.addALogicalTerminationPointToTheLogicalTerminationPointList(tcpLogicalTerminationPoint);
                resolve(isCreated);
            } catch (error) {
                reject(isCreated);
            }
        });
    }

    /**
     * @description This function modifies the tcp-client remote-address and remote-port for the provided tcp client uuid.<br>
     * @param {String} tcpClientUuid uuid of the tcp-client.<br>
     * @param {String} remoteAddress remoteAddress that needs to be modified<br>
     * @param {String} remotePort remotePort that needs to be modified<br>
     * @returns {promise} returns true if the value is updated or return false.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the url path to point out the remote-address and remote-port of the correct tcp-client instance<br>
     * <b>step 2 :</b> update the new value by calling the writeToDatabase() in the JSONDriver<br>
     **/
    static setTcpRemoteAddressAndPortForTheUuid(tcpClientUuid, remoteAddress, remotePort) {
        return new Promise(async function (resolve, reject) {
            let isTcpIpV4AddressUpdated = false;
            let isTcpPortAddressUpdated = false;
            try {
                let urlToUpdateTcpIpV4Address = tcpIpAddressUrl.replace("{uuid}", tcpClientUuid);
                let urlToUpdateTcpPort = tcpPortUrl.replace("{uuid}", tcpClientUuid);
                isTcpIpV4AddressUpdated = await fileOperation.writeToDatabase(urlToUpdateTcpIpV4Address, remoteAddress, false);
                isTcpPortAddressUpdated = await fileOperation.writeToDatabase(urlToUpdateTcpPort, remotePort, false);
                resolve(isTcpIpV4AddressUpdated && isTcpPortAddressUpdated);
            } catch (error) {
                reject(isTcpIpV4AddressUpdated && isTcpPortAddressUpdated);
            }
        });
    }
}
module.exports = TcpClientInterface;