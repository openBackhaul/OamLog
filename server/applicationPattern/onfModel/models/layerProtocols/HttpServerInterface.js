/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a HttpServerInterface layer protocol.<br>
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
class HttpServerInterface extends layerProtocol {

    static HttpServerInterfacePac = class HttpServerInterfacePac {
        static layerProtocolName = layerProtocol.layerProtocolNameEnum.HTTP_SERVER;
        httpServerInterfaceCapability;
        static HttpServerInterfaceCapability = class HttpServerInterfaceCapability {
            applicationName;
            releaseNumber;
            applicationPurpose;
            dataUpdatePeriod;
            ownerName;
            ownerEmailAddress;
            releaseList;
            Release = class Release {
                releaseNumber;
                releaseDate;
                changes;
                
                /**
                 * constructor 
                 * @param {string} releaseNumber release number of the application.
                 * @param {string} releaseDate release date of the application.
                 * @param {string} changes changes provided in the application.
                 */
                constructor(releaseNumber, releaseDate, changes) {
                    this.releaseNumber = releaseNumber;
                    this.releaseDate = releaseDate;
                    this.changes = changes;
                }
            };

            /**
             * constructor 
             * @param {string} applicationName name of the current application.
             * @param {string} releaseNumber release number of the current application.
             * @param {string} applicationPurpose purpose of the current application.
             * @param {string} dataUpdatePeriod data update period can be 24hr, 1hr, manual or realtime.
             * @param {string} ownerName name of the application owner.
             * @param {string} ownerEmailAddress email address of the application owner.
             * @param {string} releaseList release list of the application along with its history.
             */
            constructor(applicationName, releaseNumber, applicationPurpose, dataUpdatePeriod, ownerName, ownerEmailAddress, releaseList) {
                this.applicationName = applicationName;
                this.releaseNumber = releaseNumber;
                this.applicationPurpose = applicationPurpose;
                this.dataUpdatePeriod = dataUpdatePeriod;
                this.ownerName = ownerName;
                this.ownerEmailAddress = ownerEmailAddress;
                this.releaseList = releaseList;
            }
        };

        /**
         * constructor 
         * @param {string} applicationName name of the current application.
         * @param {string} releaseNumber release number of the current application.
         * @param {string} applicationPurpose purpose of the current application.
         * @param {string} dataUpdatePeriod data update period can be 24hr, 1hr, manual or realtime.
         * @param {string} ownerName name of the application owner.
         * @param {string} ownerEmailAddress email address of the application owner.
         * @param {string} releaseList release list of the application along with its history.
         */
        constructor(applicationName, releaseNumber, applicationPurpose, dataUpdatePeriod, ownerName, ownerEmailAddress, releaseList) {
            this.httpServerInterfaceCapability = new HttpServerInterfacePac.HttpServerInterfaceCapability(applicationName, releaseNumber, applicationPurpose, dataUpdatePeriod, ownerName, ownerEmailAddress, releaseList);
        }
    }

    /**
     * constructor 
     * @param {string} applicationName name of the current application.
     * @param {string} releaseNumber release number of the current application.
     * @param {string} applicationPurpose purpose of the current application.
     * @param {string} dataUpdatePeriod data update period can be 24hr, 1hr, manual or realtime.
     * @param {string} ownerName name of the application owner.
     * @param {string} ownerEmailAddress email address of the application owner.
     * @param {string} releaseList release list of the application along with its history.
     */
    constructor(applicationName, releaseNumber, applicationPurpose, dataUpdatePeriod, ownerName, ownerEmailAddress, releaseList) {
        super(0, HttpServerInterface.HttpServerInterfacePac.layerProtocolName);
        this["http-server-interface-1-0:http-server-interface-pac"] = new HttpServerInterface.HttpServerInterfacePac(applicationName, releaseNumber, applicationPurpose, dataUpdatePeriod, ownerName, ownerEmailAddress, releaseList);
    }

    /**
     * @description This function returns the http server capability.<br>
     * @returns {promise} returns the capability of the http server.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the http-server-interface ltp instance by using the method getLogicalTerminationPointByProtocol() in core-model<br>
     * <b>step 2 :</b> Get the capability class from the http-server-instance<br>
     **/
    static getHttpServerCapability() {
        return new Promise(async function (resolve, reject) {
            let httpServerCapability = undefined;
            try {
                let httpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.HTTP_SERVER);
                let httpServerLogicalTerminationPointInstance = httpServerLogicalTerminationPointInstanceList[0];
                let httpServerLayerProtocol = httpServerLogicalTerminationPointInstance["layer-protocol"][0];
                httpServerCapability = httpServerLayerProtocol["http-server-interface-1-0:http-server-interface-pac"]["http-server-interface-capability"];
                resolve(httpServerCapability);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the name of the current application.<br>
     * @returns {promise} returns the name of current application.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the http-server-interface ltp instance by using the method getLogicalTerminationPointByProtocol() in core-model<br>
     * <b>step 2 :</b> Get the application name from the http-server-instance capability <br>
     **/
    static getApplicationName() {
        return new Promise(async function (resolve, reject) {
            let httpServerApplicationName = undefined;
            try {
                let httpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.HTTP_SERVER);
                let httpServerLogicalTerminationPointInstance = httpServerLogicalTerminationPointInstanceList[0];
                let httpServerLayerProtocol = httpServerLogicalTerminationPointInstance["layer-protocol"][0];
                httpServerApplicationName = httpServerLayerProtocol["http-server-interface-1-0:http-server-interface-pac"]["http-server-interface-capability"]["application-name"];
                resolve(httpServerApplicationName);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the release number of the current application.<br>
     * @returns {promise} returns release number of current application.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the http-server-interface ltp instance by using the method getLogicalTerminationPointByProtocol() in core-model<br>
     * <b>step 2 :</b> Get the release number from the http-server-instance capability<br>
     **/
    static getReleaseNumber() {
        return new Promise(async function (resolve, reject) {
            let httpServerReleaseNumber = undefined;
            try {
                let httpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.HTTP_SERVER);
                let httpServerLogicalTerminationPointInstance = httpServerLogicalTerminationPointInstanceList[0];
                let httpServerLayerProtocol = httpServerLogicalTerminationPointInstance["layer-protocol"][0];
                httpServerReleaseNumber = httpServerLayerProtocol["http-server-interface-1-0:http-server-interface-pac"]["http-server-interface-capability"]["release-number"];
                resolve(httpServerReleaseNumber);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the list of releases for the application.<br>
     * @returns {promise} returns the release list of the application.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the http-server-interface ltp instance by using the method getLogicalTerminationPointByProtocol() in core-model<br>
     * <b>step 2 :</b> Get the release list from the http-server-instance capability<br>
     **/
    static getReleaseList() {
        return new Promise(async function (resolve, reject) {
            let httpServerReleaseList = undefined;
            try {
                let httpServerLogicalTerminationPointInstanceList = await coreModel.getLogicalTerminationPointListByProtocol(layerProtocol.layerProtocolNameEnum.HTTP_SERVER);
                let httpServerLogicalTerminationPointInstance = httpServerLogicalTerminationPointInstanceList[0];
                let httpServerLayerProtocol = httpServerLogicalTerminationPointInstance["layer-protocol"][0];
                httpServerReleaseList = httpServerLayerProtocol["http-server-interface-1-0:http-server-interface-pac"]["http-server-interface-capability"]["release-list"];
                resolve(httpServerReleaseList);
            } catch (error) {
                resolve(undefined);
            }
        });
    }
}
module.exports = HttpServerInterface;