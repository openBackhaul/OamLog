/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a tcpServerInterface layer protocol.<br>
 * This class is a sub class for LayerProtocol <br>
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.08.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 **/

'use strict';
const layerProtocol = require('../LayerProtocol');
const coreModel = require('../CoreModel');

/** 
 * @extends layerProtocol
 */
class TcpServerInterface extends layerProtocol {
    static TcpServerInterfacePac = class TcpServerInterfacePac {
        static layerProtocolName = layerProtocol.layerProtocolNameEnum.TCP_SERVER;
        tcpServerInterfaceConfiguration;
        static TcpServerInterfaceConfiguration = class TcpServerInterfaceConfiguration {
            static LocalAddress = class LocalAddress {
                ipv4Address;

                /**
                 * constructor 
                 * @param {string} ipv4Address tcp ipaddress where the application is hosted <br>
                 */
                constructor(ipv4Address) {
                    this.ipv4Address = ipv4Address;
                }
            };
            localAddress;
            localPort;

            /**
             * constructor 
             * @param {string} localAddress tcp server ipaddress where the application is hosted <br>
             * @param {string} localPort tcp server port where the application is running <br>
             */
            constructor(localAddress, localPort) {
                this.localAddress = new TcpServerInterfaceConfiguration.LocalAddress(localAddress);
                this.localPort = localPort;
            }
        };

        /**
         * constructor 
         * @param {string} localAddress tcp server ipaddress where the application is hosted <br>
         * @param {string} localPort tcp server port where the application is running <br>
         */
        constructor(localAddress, localPort) {
            this.tcpServerInterfaceConfiguration = new TcpServerInterfacePac.TcpServerInterfaceConfiguration(localAddress, localPort);
        }
    }

    /**
     * constructor 
     * @param {string} localAddress tcp server ipaddress where the application is hosted <br>
     * @param {string} localPort tcp server port where the application is running <br>
     */
    constructor(localAddress, localPort) {
        super(0, TcpServerInterface.TcpServerInterfacePac.layerProtocolName);
        this["tcp-server-interface-1-0:tcp-server-interface-pac"] = new TcpServerInterface.TcpServerInterfacePac(localAddress, localPort);
    }

    /**
     * @description This function returns the IpV4 address of the current application.<br>
     * @returns {promise} returns ip address of the current application.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the tcp server ltp instance by using the method getLogicalTerminationPointByProtocol<br>
     * <b>step 2 :</b> Get the ip v4 address from the tcp server instance configuration pac<br>
     **/
    static getLocalAddress() {
        return new Promise(async function (resolve, reject) {
            let tcpServerIpV4Address = undefined;
            try {
                let tcpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.TCP_SERVER);
                let tcpServerLogicalTerminationPointInstance = tcpServerLogicalTerminationPointInstanceList[0];
                tcpServerIpV4Address = tcpServerLogicalTerminationPointInstance["layer-protocol"][0]["tcp-server-interface-1-0:tcp-server-interface-pac"]
                    ["tcp-server-interface-configuration"]["local-address"]["ipv-4-address"];
                resolve(tcpServerIpV4Address);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the port where the current application is running.<br>
     * @returns {promise} returns the port where the current application is running.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the tcp server ltp instance by using the method getLogicalTerminationPointByProtocol<br>
     * <b>step 2 :</b> Get the port from the tcp server instance configuration pac<br>
     **/
    static getLocalPort() {
        return new Promise(async function (resolve, reject) {
            let tcpServerPort = undefined;
            try {
                let tcpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.TCP_SERVER);
                let tcpServerLogicalTerminationPointInstance = tcpServerLogicalTerminationPointInstanceList[0];
                tcpServerPort = tcpServerLogicalTerminationPointInstance["layer-protocol"][0]["tcp-server-interface-1-0:tcp-server-interface-pac"]
                    ["tcp-server-interface-configuration"]["local-port"];
                resolve(tcpServerPort);
            } catch (error) {
                resolve(undefined);
            }
        });
    }
}
module.exports = TcpServerInterface;