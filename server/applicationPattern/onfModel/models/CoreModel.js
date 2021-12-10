/**
 * @file This class provides a stub for onf core-model.  
 * This class consolidates the technology specific extensions.Also this class provides functionality to manupulate the attributes in the core-model.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const fileOperation = require('../../databaseDriver/JSONDriver.js');
const utility = require('../utility/OnfAttributeFormatter');
const logicalTerminationPointPath = "/core-model-1-4:control-construct/logical-termination-point";
const forwardingDomainPath = "/core-model-1-4:control-construct/forwarding-domain";

class CoreModel {

  logicalTerminationPointList;
  forwardingDomainList;
  profileCollection;

  /**
   * @description This function adds a new logical-termination-point instance to the logical-termination-point list<br>
   * @param {String} logicalTerminationPoint an instance of the logical-termination-point<br>
   * @returns {promise} returns true if the instance is added successfully to the logical-termination-point list<br>
   * <b><u>Procedure :</u></b><br>
   * <b>step 1 :</b> stringify the logical-termination-point instance to a json string<br>
   * <b>step 1 :</b> Change the Json keys from lowercame case to kebab case<br>
   * <b>step 3 :</b> adds the new logical-termination-point to path /core-model-1-4:control-construct/logical-termination-point in the load file<br>
   **/
  static addALogicalTerminationPointToTheLogicalTerminationPointList(logicalTerminationPoint) {
    return new Promise(async function (resolve, reject) {
      let isCreated = false;
      try {
        logicalTerminationPoint = utility.modifyJsonObjectKeysToKebabCase(logicalTerminationPoint);
        isCreated = await fileOperation.writeToDatabase(logicalTerminationPointPath, logicalTerminationPoint, true);
        resolve(isCreated);
      } catch (error) {
        resolve(false);
      }
    });
  }

  /**
   * @description This function deletes an instance from the logical-termination-point list<br>
   * @param {String} uuid uuid of the logical-termination-point instance that needs to be deleted<br>
   * @returns {promise} returns true if the instance is deleted successfully from the logical termination point list<br>
   * <b><u>Procedure :</u></b><br>
   * <b>step 1 :</b> deletes the logical-termination-point from the path /core-model-1-4:control-construct/logical-termination-point in the load file<br>
   **/
  static deleteALogicalTerminationPointFromTheLogicalTerminationPointList(uuid) {
    return new Promise(async function (resolve, reject) {
      let isDeleted = false;
      try {
        isDeleted = await fileOperation.deletefromDatabase(logicalTerminationPointPath + "=" + uuid, uuid, true);
        resolve(isDeleted);
      } catch (error) {
        resolve(false);
      }
    });
  }

  /**
   * @description This function returns an instance from the logical-termination-point list for the provided uuid<br>
   * @param {String} uuid uuid of the logical-termination-point instance that needs to be retrieved<br>
   * @returns {promise} returns the logical-termination-point instance<br>
   * <b><u>Procedure :</u></b><br>
   * <b>step 1 :</b> returns the requested logical-termination-point from the path /core-model-1-4:control-construct/logical-termination-point in the load file<br>
   **/
  static getLogicalTerminationPointForTheUuid(uuid) {
    return new Promise(async function (resolve, reject) {
      try {
        let logicalTerminationPointList = await fileOperation.readFromDatabase(logicalTerminationPointPath);
        if (logicalTerminationPointList != undefined) {
          for (let i = 0; i < logicalTerminationPointList.length; i++) {
            let logicalTerminationPointInstance = logicalTerminationPointList[i];
            let logicalTerminationPointUuid = logicalTerminationPointInstance["uuid"];
            if (logicalTerminationPointUuid == uuid) {
              resolve(logicalTerminationPointInstance);
            }
          }
        }
        resolve(undefined);
      } catch (error) {
        resolve(undefined);
      }
    });
  }

  /**
   * @description This function returns the list of logical-termination-point instances for the provided layer-protocol-name.<br>
   * @param {String} layerProtocolName protocol name of the layer.<br>
   * @returns {promise} returns logical-termination-point instance List.<br>
   * <b><u>Procedure :</u></b><br>
   * <b>step 1 :</b> Get the logical-termination-point list from the control construct using the logicalTerminationPointPath<br>
   * <b>step 2 :</b> Iterate through the list and filter the uuids for the required layerProtocolName<br>
   **/

  static getLogicalTerminationPointListByProtocol(layerProtocolName) {
    return new Promise(async function (resolve, reject) {
      let filteredLogicalTerminationPointList = [];
      try {
        let logicalTerminationPointList = await fileOperation.readFromDatabase(logicalTerminationPointPath);
        for (let i = 0; i < logicalTerminationPointList.length; i++) {
          let logicalTerminationPointInstance = logicalTerminationPointList[i];
          let layerProtocolNameValue = logicalTerminationPointInstance["layer-protocol"][0]["layer-protocol-name"];
          if (layerProtocolNameValue == layerProtocolName) {
            filteredLogicalTerminationPointList.push(logicalTerminationPointInstance);
          }
        }
        resolve(filteredLogicalTerminationPointList);
      } catch (error) {
        resolve(undefined);
      }
    });
  }

  /**
   * @description This function returns the entire forwarding-domain list inside the core-model<br>
   * @returns {promise} returns forwarding-domain list.<br>
   * <b><u>Procedure :</u></b><br>
   * <b>step 1 :</b> Get the forwarding domain list from the control construct using the forwardingDomainPath<br>
   **/
  static async getForwardingDomainList() {
    return new Promise(async function (resolve, reject) {
      try {
        let forwardingDomainList = await fileOperation.readFromDatabase(forwardingDomainPath);
        resolve(forwardingDomainList);
      } catch (error) {
        reject(undefined);
      }
    });
  }

}

module.exports = CoreModel;