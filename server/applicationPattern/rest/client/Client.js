/**
 * <p>This class provides functionality to read and update the flat file JSON database load file in onf format.
 * The interaction with the file system will be performed with the use of 'fs module' which enables interacting with the file system
 * in a way modeled on standard Portable Operating System Interface for UNIX(POSIX) functions. Also by using the 'path' module that provides utilities for 
 * working with files and directory paths.</p>  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       05.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module FileOperation
 **/

const axios = require('axios');
/**
 * This function reads the requested oam path from the core-model<br>
 * @param {object} oamPath json path that leads to the destined attribute
 * @returns {promise} return the requested value
 */
exports.post = async function (request) {
    return new Promise(async function (resolve, reject) {
        try {
            let response = await axios(request);
            resolve(response);
        } catch (error) {
            console.log(error);
            reject(undefined);
        }
    });
}