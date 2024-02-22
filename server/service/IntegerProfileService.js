'use strict';


/**
 * Returns the name of the Integer
 *
 * uuid String 
 * returns inline_response_200_20
 **/
exports.getIntegerProfileIntegerName = function(uuid) {
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
 * uuid String 
 * returns inline_response_200_25
 **/
exports.getIntegerProfileIntegerValue = function(uuid) {
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
 * uuid String 
 * returns inline_response_200_24
 **/
exports.getIntegerProfileMaximum = function(uuid) {
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
 * uuid String 
 * returns inline_response_200_23
 **/
exports.getIntegerProfileMinimum = function(uuid) {
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
 * Returns the purpose of the Integer
 *
 * uuid String 
 * returns inline_response_200_21
 **/
exports.getIntegerProfilePurpose = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "integer-profile-1-0:purpose" : "Limiting the number of entries for controlling the storage consumption and access response time"
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
 * uuid String 
 * returns inline_response_200_22
 **/
exports.getIntegerProfileUnit = function(uuid) {
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
 * uuid String 
 * no response value expected for this operation
 **/
exports.putIntegerProfileIntegerValue = function(body,uuid) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

