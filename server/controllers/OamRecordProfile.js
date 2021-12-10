'use strict';

var utils = require('../utils/writer.js');
var OamRecordProfile = require('../service/OamRecordProfileService');

module.exports.getOamRecordProfileCapability = function getOamRecordProfileCapability (req, res, next, uuid) {
  OamRecordProfile.getOamRecordProfileCapability(uuid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
