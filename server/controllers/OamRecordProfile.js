'use strict';

var OamRecordProfile = require('../service/OamRecordProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap-bs/basicServices/OamLogService');

module.exports.getOamRecordProfileCapability = async function getOamRecordProfileCapability (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
    await OamRecordProfile.getOamRecordProfileCapability(req.url)
      .then(function (response) {
        responseBuilder.buildResponse(res, responseCode, response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res, responseCode, response);
      });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
