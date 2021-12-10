/**
 * @file This class provides a stub for the consequent action list  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

class ConsequentAction {

  static label;
  static request;

  /**
   * @constructor 
   * @param {String} label label of the consequent action.
   * @param {String} request url that needs to be addressed to perform the consequent action.
   **/
  constructor(label, request) {
    this.label = label;
    this.request = request;
  }

}

module.exports = ConsequentAction;