/**
 * @file This class provides functionality to create a http request header.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       11.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 **/

'use strict';
/** 
 * This class provides functionality to create a http request header.
 */
var RandExp = require('randexp');
class RequestHeader {

    user;
    originator;
    xCorrelator;
    traceIndicator;
    customerJourney;
    operationKey;
    contentType = "application/json";

    /**
     * constructor 
     * @param {String} user User identifier from the system starting the service call. If not available , originator value will be copied to this attribute.
     * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses.
     * @param {String} traceIndicator Sequence of request numbers along the flow, if it is empty , set it to 1.
     * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies.
     * @param {String} operationKey operation key to access the service in the client application.
     * This constructor will,<br>
     * 1. creates a http request header object<br>
     * 2. If user value is empty , then the value from originator will be copied<br>
     * 3. If xCorrelator is empty , then a new X-correlator string will be created by using the method xCorrelatorGenerator<br>
     * 4. If the customerJourney is empty , then the value "unknown value" will be added<br>
     * 5. If trace-indicator value is empty , then the value will be assigned to 1<br>
     * 
     */
     constructor(user, originator, xCorrelator, traceIndicator, customerJourney, operationKey) {
        this.originator = originator;
        this.user = user;
        if (user == undefined || user.length == 0) {
            this.user = originator;
        }
        this.xCorrelator = xCorrelator;
        if (xCorrelator == undefined || xCorrelator.length == 0) {
            this.xCorrelator = RequestHeader.xCorrelatorGenerator();
        }
        this.traceIndicator = traceIndicator;
        if (traceIndicator == undefined || traceIndicator.length == 0) {
            this.traceIndicator = 1;
        }
        this.customerJourney = customerJourney;
        if (customerJourney == undefined || customerJourney.length == 0) {
            this.customerJourney = 1;
        }
        if (operationKey != undefined || operationKey.length > 0) {
            this.operationKey = operationKey;
        }
    }

    static xCorrelatorGenerator() {
        let randomXCorrelatorString;
        try {
            randomXCorrelatorString = new RandExp(/^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$/).gen();
        } catch (error) {
            console.log("error");
            console.log(error);
        }
        return randomXCorrelatorString;
    }

}

module.exports = RequestHeader;