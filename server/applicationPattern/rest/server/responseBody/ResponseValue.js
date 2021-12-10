/**
 * @file This class provides a stub for response value.  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

class ResponseValue {

    static fieldName;
    static value;
    static datatype;

    /**
     * @constructor 
     * @param {String} fieldName field name of the response value list.
     * @param {String} value value of the field name.
     * @param {String} datatype data type of the value.
     **/
    constructor(fieldName, value, datatype) {
        this.fieldName = fieldName;
        this.value = value;
        this.datatype = datatype;
    }

}

module.exports = ResponseValue;