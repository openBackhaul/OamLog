/**
 * @file This module provides functionality to build the request body. This file should be modified accourding to the individual service forwarding requirements  
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
            /** Individual service specific operation client services attributes will be formulated here. 
             * Please refer the function prepareRequestBody in ../BasicService.js file on how to model the logic here.
             */  
            resolve(httpRequestBody);
        } catch (error) {
            console.log(error);
            resolve(false);
        }
    });
}