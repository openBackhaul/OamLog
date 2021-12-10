/**
 * @file The ForwardingDomain (FD) class models the component that represents a forwarding capability that provides 
 * the opportunity to enable forwarding (of specific transport characteristic information at one or more protocol layers) between points.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';
const fileOperation = require('../../databaseDriver/JSONDriver.js');
const coreModel = require('./CoreModel.js');

class ForwardingDomain {

    uuid;
    forwardingConstructList;

    /**
     * @constructor 
     * @param {String} uuid unique identifier of the forwarding-domain.
     * @param {String} forwardingConstructList list of forwarding-construct.
     **/
    constructor(uuid, forwardingConstructList) {
        this.uuid = uuid;
        this.forwardingConstructList = forwardingConstructList;
    }

    /**
     * @description This function returns the forwarding-construct instance for the given forwarding-construct uuid<br>
     * @param {string} forwardingConstructUuid forwarding-construct uuid in the forwarding-construct list in the forwarding-domain<br>
     * @returns {promise} returns forwarding-construct instance <br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding-construct list from the method getForwardingConstructList()<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the uuid<br>
     * <b>step 2 :</b> If the uuid is equal to the input uuid then return that instance<br>
     **/
    static async getForwardingConstructForTheUuid(forwardingConstructUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingConstruct;
                let entireForwardingConstructList = await ForwardingDomain.getForwardingConstructList();
                for (let i = 0; i < entireForwardingConstructList.length; i++) {
                    let forwardingConstructList = entireForwardingConstructList[i];
                    for (let j = 0; j < forwardingConstructList.length; j++) {
                        let forwardingConstructInstance = forwardingConstructList[j];
                        let uuid = forwardingConstructInstance["uuid"];
                        if (uuid == forwardingConstructUuid) {
                            forwardingConstruct = forwardingConstructInstance;
                        }
                    }
                }
                resolve(forwardingConstruct);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the entire list of forwarding-construct instances inside all forwarding domain<br>
     * @returns {promise} returns all forwarding-construct instance list.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding-domain list from the method getForwardingDomainList() inside CoreModel class<br>
     * <b>step 2 :</b> Iterate through the list and add all the forwarding-construct to a list and return the list<br>
     **/
    static async getForwardingConstructList() {
        return new Promise(async function (resolve, reject) {
            let forwardingConstructList = [];
            try {
                let ForwardingDomainList = await coreModel.getForwardingDomainList();
                for (let i = 0; i < ForwardingDomainList.length; i++) {
                    let forwardingConstruct = ForwardingDomainList[i]["forwarding-construct"];
                    forwardingConstructList.push(forwardingConstruct);
                }
                resolve(forwardingConstructList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the forwarding-construct instance that matches the forwarding-construct name<br>
     * @param {string} forwardingName forwardingName of the forwarding-construct<br>
     * @returns {promise} returns forwarding-construct instance <br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding-construct list from the method getForwardingConstructList()<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the name/value-name/ForwardingName<br>
     * <b>step 2 :</b> If the forwardingName is equal to the input forwardingConstructName then return that instance<br>
     **/
    static async getForwardingConstructForTheFCName(forwardingName) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingConstruct;
                let entireForwardingConstructList = await ForwardingDomain.getForwardingConstructList();
                for (let i = 0; i < entireForwardingConstructList.length; i++) {
                    let forwardingConstructList = entireForwardingConstructList[i];
                    for (let j = 0; j < forwardingConstructList.length; j++) {
                        let forwardingConstructInstance = forwardingConstructList[j];
                        let nameList = forwardingConstructInstance["name"];
                        for (let k = 0; k < nameList.length; k++) {
                            if (nameList[k]["value-name"] == "ForwardingName" && nameList[k]["name"] == forwardingName) {
                                forwardingConstruct = forwardingConstructInstance;
                            }
                        }
                    }
                }
                resolve(forwardingConstruct);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the forwarding-construct instance list for the fc-port management direction<br>
     * @param {string} FcPortManagementDirectionUuid fc-port management direction logical-termination-point attribute value<br>
     * @returns {promise} returns forwarding-construct instance list <br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding construct list from the method getForwardingConstructList()<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the management direction fc-port's logical-termination-point<br>
     * <b>step 2 :</b> If the management direction fc-port's logical-termination-point is equal to the input uuid then add the instance to the outputList<br>
     **/
     static async getForwardingConstructListForTheFcPortManagementDirection(FcPortManagementDirectionUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingConstructInstanceList = [];
                let entireForwardingConstructList = await ForwardingDomain.getForwardingConstructList();
                if (entireForwardingConstructList != undefined) {
                    for (let i = 0; i < entireForwardingConstructList.length; i++) {
                        let forwardingConstructList = entireForwardingConstructList[i];
                        for (let j = 0; j < forwardingConstructList.length; j++) {
                            let forwardingConstructInstance = forwardingConstructList[j];
                            let fcPortList = forwardingConstructInstance["fc-port"];
                            for (let k = 0; k < fcPortList.length; k++) {
                                if (fcPortList[k]["port-direction"] == "core-model-1-4:PORT_DIRECTION_TYPE_MANAGEMENT" &&
                                    fcPortList[k]["logical-termination-point"] == FcPortManagementDirectionUuid) {
                                    forwardingConstructInstanceList.push(forwardingConstructInstance);
                                }
                            }
                        }

                    }
                }
                resolve(forwardingConstructInstanceList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

    /**
     * @description This function returns the forwarding-construct instance list for the fc-port output direction<br>
     * @param {string} FcPortOutputDirectionUuid fc-port output direction logical-termination-point attribute value<br>
     * @returns {promise} returns forwarding-construct instance list <br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the forwarding construct list from the method getForwardingConstructList()<br>
     * <b>step 2 :</b> Iterate through the list and get the value of the output direction fc-port's logical-termination-point<br>
     * <b>step 2 :</b> If the output direction fc-port's logical-termination-point is equal to the input uuid then add the instance to the outputList<br>
     **/
     static async getForwardingConstructListForTheFcPortOutputDirection(FcPortOutputDirectionUuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let forwardingConstructInstanceList = [];
                let entireForwardingConstructList = await ForwardingDomain.getForwardingConstructList();
                if (entireForwardingConstructList != undefined) {
                    for (let i = 0; i < entireForwardingConstructList.length; i++) {
                        let forwardingConstructList = entireForwardingConstructList[i];
                        for (let j = 0; j < forwardingConstructList.length; j++) {
                            let forwardingConstructInstance = forwardingConstructList[j];
                            let fcPortList = forwardingConstructInstance["fc-port"];
                            for (let k = 0; k < fcPortList.length; k++) {
                                if (fcPortList[k]["port-direction"] == "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT" &&
                                    fcPortList[k]["logical-termination-point"] == FcPortOutputDirectionUuid) {
                                    forwardingConstructInstanceList.push(forwardingConstructInstance);
                                }
                            }
                        }

                    }
                }
                resolve(forwardingConstructInstanceList);
            } catch (error) {
                reject(undefined);
            }
        });
    }

}

module.exports = ForwardingDomain;