/**
 * @file This module provides funtionality to trigger and dispatch rest request from this application to other applications  
 * This class consolidates the technology specific extensions.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

/**
 * This funtion formulates the request body based on the operation name and application 
 * @param {String} clientApplicationName name of the client application.
 * @param {String} operationName name of the client operation that needs to be addressed.
 * @param {String} attributeList list of attributes that needs to be included in the request body based on the operation name. 
 */
exports.prepareRequestBody = function (clientApplicationName, operationName, attributeList) {
    return new Promise(async function (resolve, reject) {
        let httpRequestBody = {};
        try {
            if (operationName.includes("register-application")) {
                let applicationName;
                let releaseNumber;
                let applicationAddress;
                let applicationPort;
                let embedYourselfOperation;
                let updateClientOperation;
                for (let i = 0; i < attributeList.length; i++) {
                    if (attributeList[i]["name"] == "application-name") {
                        applicationName = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "application-release-number") {
                        releaseNumber = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "application-address") {
                        applicationAddress = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "application-port") {
                        applicationPort = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "embedding-operation") {
                        embedYourselfOperation = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "client-update-operation") {
                        updateClientOperation = attributeList[i]["value"];
                    }
                }
                httpRequestBody = {
                    "application-name": applicationName,
                    "application-release-number": releaseNumber,
                    "application-address": applicationAddress,
                    "application-port": applicationPort,
                    "embedding-operation": embedYourselfOperation,
                    "client-update-operation": updateClientOperation
                }
            } else if (operationName.includes("bequeath-your-data-and-die")) {
                let applicationName;
                let releaseNumber;
                let applicationAddress;
                let applicationPort;
                for (let i = 0; i < attributeList.length; i++) {
                    if (attributeList[i]["name"] == "new-application-name") {
                        applicationName = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "new-application-release") {
                        releaseNumber = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "new-application-address") {
                        applicationAddress = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "new-application-port") {
                        applicationPort = attributeList[i]["value"];
                    }
                }
                httpRequestBody = {
                    "new-application-name": applicationName,
                    "new-application-release": releaseNumber,
                    "new-application-address": applicationAddress,
                    "new-application-port": applicationPort
                }
            } else if (operationName.includes("update-ltp")) {

                // need to update after getting ALT application 

            } else if (operationName.includes("delete-ltp-and-dependents")) {

                // need to update after getting ALT application 

            } else if (operationName.includes("update-fc")) {

                // need to update after getting ALT application 

            } else if (operationName.includes("update-fc-port")) {

                // need to update after getting ALT application 

            } else if (operationName.includes("delete-fc-port")) {

                // need to update after getting ALT application 

            }
            resolve(httpRequestBody);
        } catch (error) {
            console.log(error);
            resolve(false);
        }
    });
}