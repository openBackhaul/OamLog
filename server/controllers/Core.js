'use strict';

var Core = require('../service/CoreService');
var authorizingService = require('onf-core-model-ap-bs/basicServices/AuthorizingService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap-bs/basicServices/OamLogService');

module.exports.getControlConstruct =async function getControlConstruct (req, res, next) {
  let responseCode = responseCodeEnum.code.OK;
  if (await authorizingService.isAuthorized(req.headers.authorization, req.method)) {
    await Core.getControlConstruct()
      .then(function (response) {
        responseBuilder.buildResponse(res,responseCode,response);
      })
      .catch(function (response) {
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        responseBuilder.buildResponse(res,responseCode,response);
      });
  } else {
    responseCode = responseCodeEnum.code.UNAUTHORIZED;
    responseBuilder.buildResponse(res,responseCode);
  }
  oamLogService.recordOamRequest(req.url,req.body,responseCode,req.headers.authorization,req.method);
};
