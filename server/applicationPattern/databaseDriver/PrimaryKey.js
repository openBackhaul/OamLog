/*************************************************************************************************************************************************************
 * This file contains the primary key for the list attributes in core-model 
 * 
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.08.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * 
 *************************************************************************************************************************************************************/
 'use strict';

 /*************************************************************************************************************************************************************
  * key attribute corresponds to the lists 
  *************************************************************************************************************************************************************/
 
 module.exports.keyAttributeOfList = {
     'logical-termination-point': "uuid",
     'profile': "uuid",
     'layer-protocol': "local-id",
     'response-value-list': "field-name",
     'consequent-action-list': "label",
     'forwarding-domain' : "uuid",
     'forwarding-construct': "uuid",
     'fc-port': "local-id",
     'name':"value-name"
 }