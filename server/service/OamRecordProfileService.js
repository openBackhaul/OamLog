'use strict';


/**
 * Returns entire record of a OaM request
 *
 * uuid String 
 * returns inline_response_200_8
 **/
exports.getOamRecordProfileCapability = function(uuid) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "oam-record-profile-1-0:oam-record-profile-capability" : {
    "application-name" : "CurrentController",
    "response-code" : 200,
    "release-number" : "0.0.1",
    "method" : "oam-record-profile-1-0:METHOD_TYPE_GET",
    "user-name" : "Max Mustermann",
    "resource" : "/core-model-1-4:control-construct/profile-collection/profile=string-p-1000/string-profile-1-0:string-profile-pac/string-profile-capability/string-name",
    "stringified-body" : "",
    "timestamp" : "2010-11-20T14:00:00+01:00"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

