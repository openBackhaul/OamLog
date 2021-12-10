'use strict';


/**
 * Returns the name of the Integer
 *
 * returns inline_response_200_9
 **/
exports.getIntegerProfileIntegerName = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:integer-name" : "maximumNumberOfEntries"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the configured value of the Integer
 *
 * returns inline_response_200_13
 **/
exports.getIntegerProfileIntegerValue = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:integer-value" : 1000000
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the maximum value of the Integer
 *
 * returns inline_response_200_12
 **/
exports.getIntegerProfileMaximum = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:maximum" : 1000000
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the minimum value of the Integer
 *
 * returns inline_response_200_11
 **/
exports.getIntegerProfileMinimum = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:minimum" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the unit of the Integer
 *
 * returns inline_response_200_10
 **/
exports.getIntegerProfileUnit = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:unit" : "records"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configures value of the Integer
 *
 * body Integerprofileconfiguration_integervalue_body 
 * no response value expected for this operation
 **/
exports.putIntegerProfileIntegerValue = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

