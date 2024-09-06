//@ts-check
'use strict';

var BasicServices = require('onf-core-model-ap-bs/basicServices/BasicServicesService');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var RestResponseHeader = require('onf-core-model-ap/applicationPattern/rest/server/ResponseHeader');
var RestResponseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var ExecutionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');

const NEW_RELEASE_FORWARDING_NAME = 'PromptForBequeathingDataCausesTransferOfListOfApplications';
const OLD_RELEASE_FORWARDING_NAME = 'PromptForEmbeddingCausesRequestForBequeathingData';

module.exports.disposeRemaindersOfDeregisteredApplication = async function disposeRemaindersOfDeregisteredApplication (req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.disposeRemaindersOfDeregisteredApplication(body, user, originator, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.embedYourself = async function embedYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.embedYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.endSubscription = async function endSubscription(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.endSubscription(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.startApplicationInGenericRepresentation = async function startApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.startApplicationInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.informAboutApplication = async function informAboutApplication(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutApplication()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.informAboutApplicationInGenericRepresentation = async function informAboutApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutApplicationInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.informAboutPrecedingRelease = async function informAboutPrecedingRelease (req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutPrecedingRelease(OLD_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.informAboutReleaseHistory = async function informAboutReleaseHistory(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutReleaseHistory()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.informAboutReleaseHistoryInGenericRepresentation = async function informAboutReleaseHistoryInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutReleaseHistoryInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.inquireBasicAuthRequestApprovals = async function inquireBasicAuthRequestApprovals (req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.inquireBasicAuthRequestApprovals(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.inquireOamRequestApprovals = async function inquireOamRequestApprovals(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.inquireOamRequestApprovals(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.listLtpsAndFcs = async function listLtpsAndFcs(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.listLtpsAndFcs()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.redirectOamRequestInformation = async function redirectOamRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.redirectOamRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.redirectServiceRequestInformation = async function redirectServiceRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.redirectServiceRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.redirectTopologyChangeInformation = async function redirectTopologyChangeInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.redirectTopologyChangeInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.registerYourself = async function registerYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  if (Object.keys(req.body).length === 0) {
    body = req.body;
    user = req.headers["user"];
    originator = req.headers["originator"];
    xCorrelator = req.headers["x-correlator"];
    traceIndicator = req.headers["trace-indicator"];
    customerJourney = req.headers["customer-journey"];
  }
  await BasicServices.registerYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.updateClient = async function updateClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.updateClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.UpdateClientOfSubsequentRelease = async function UpdateClientOfSubsequentRelease (req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.updateClientOfSubsequentRelease(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.updateOperationClient = async function updateOperationClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.updateOperationClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};

module.exports.updateOperationKey = async function updateOperationKey(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await BasicServices.updateOperationKey(body)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      RestResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url, -1);
      let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  let execTime = await RestResponseHeader.executionTimeInMilliseconds(startTime);
  if (!execTime) execTime = 0;
  else execTime = Math.round(execTime);
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument, execTime);
};
