'use strict';

var utils = require('../utils/writer.js');
var IntegerProfile = require('../service/IntegerProfileService');

module.exports.getIntegerProfileIntegerName = function getIntegerProfileIntegerName (req, res, next) {
  IntegerProfile.getIntegerProfileIntegerName()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getIntegerProfileIntegerValue = function getIntegerProfileIntegerValue (req, res, next) {
  IntegerProfile.getIntegerProfileIntegerValue()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getIntegerProfileMaximum = function getIntegerProfileMaximum (req, res, next) {
  IntegerProfile.getIntegerProfileMaximum()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getIntegerProfileMinimum = function getIntegerProfileMinimum (req, res, next) {
  IntegerProfile.getIntegerProfileMinimum()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getIntegerProfileUnit = function getIntegerProfileUnit (req, res, next) {
  IntegerProfile.getIntegerProfileUnit()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putIntegerProfileIntegerValue = function putIntegerProfileIntegerValue (req, res, next, body) {
  IntegerProfile.putIntegerProfileIntegerValue(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
