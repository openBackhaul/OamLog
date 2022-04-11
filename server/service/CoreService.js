'use strict';


/**
 * Returns entire data tree
 *
 * returns inline_response_200_7
 **/
exports.getControlConstruct = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "core-model-1-4:control-construct" : {
    "profile-collection" : {
      "profile" : [ {
        "uuid" : "ol-0-0-1-integer-p-0000",
        "profile-name" : "integer-profile-1-0:PROFILE_NAME_TYPE_INTEGER_PROFILE",
        "integer-profile-1-0:integer-profile-pac" : {
          "integer-profile-capability" : {
            "integer-name" : "maximumNumberOfEntries",
            "unit" : "records",
            "minimum" : 0,
            "maximum" : 1000000
          },
          "integer-profile-configuration" : {
            "integer-value" : 1000000
          }
        }
      }, {
        "uuid" : "ol-0-0-1-application-p-0000",
        "profile-name" : "application-profile-1-0:PROFILE_NAME_TYPE_APPLICATION_PROFILE",
        "application-profile-1-0:application-profile-pac" : {
          "application-profile-capability" : {
            "application-name" : "RegistryOffice",
            "release-number" : "0.0.1"
          },
          "application-profile-configuration" : {
            "approval-status" : "application-profile-1-0:APPROVAL_STATUS_TYPE_APPROVED"
          }
        }
      } ]
    },
    "forwarding-domain" : [ {
      "uuid" : "ol-0-0-1-op-fd-0000",
      "forwarding-construct" : [ {
        "uuid" : "ol-0-0-1-op-fc-0003",
        "name" : [ {
          "value-name" : "ForwardingKind",
          "value" : "core-model-1-4:FORWARDING_KIND_TYPE_INVARIANT_PROCESS_SNIPPET"
        }, {
          "value-name" : "ForwardingName",
          "value" : "OamRequestCausesLoggingRequest"
        } ],
        "fc-port" : [ {
          "local-id" : "000",
          "port-direction" : "core-model-1-4:PORT_DIRECTION_TYPE_MANAGEMENT",
          "logical-termination-point" : "ol-0-0-1-op-s-0003"
        }, {
          "local-id" : "200",
          "port-direction" : "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT",
          "logical-termination-point" : "ol-0-0-1-op-c-0050"
        } ]
      }, {
        "uuid" : "ol-0-0-1-op-fc-0004",
        "name" : [ {
          "value-name" : "ForwardingKind",
          "value" : "core-model-1-4:FORWARDING_KIND_TYPE_INVARIANT_PROCESS_SNIPPET"
        }, {
          "value-name" : "ForwardingName",
          "value" : "OamRequestCausesInquiryForAuthentication"
        } ],
        "fc-port" : [ {
          "local-id" : "000",
          "port-direction" : "core-model-1-4:PORT_DIRECTION_TYPE_MANAGEMENT",
          "logical-termination-point" : "ol-0-0-1-op-s-0005"
        }, {
          "local-id" : "200",
          "port-direction" : "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT",
          "logical-termination-point" : "ol-0-0-1-op-c-0060"
        } ]
      } ]
    } ],
    "logical-termination-point" : [ {
      "uuid" : "ol-0-0-1-op-c-0020",
      "ltp-direction" : "core-model-1-4:TERMINATION_DIRECTION_SINK",
      "client-ltp" : [ ],
      "server-ltp" : [ "ol-0-0-1-http-c-0020" ],
      "layer-protocol" : [ {
        "local-id" : "0",
        "layer-protocol-name" : "operation-client-interface-1-0:LAYER_PROTOCOL_NAME_TYPE_OPERATION_LAYER",
        "operation-client-interface-1-0:operation-client-interface-pac" : {
          "operation-client-interface-configuration" : {
            "operation-name" : "/v1/register-application",
            "operation-key" : "Operation key not yet provided."
          },
          "operation-client-interface-status" : {
            "operational-state" : "operation-client-interface-1-0:OPERATIONAL_STATE_TYPE_NOT_YET_DEFINED",
            "life-cycle-state" : "operation-client-interface-1-0:LIFE_CYCLE_STATE_TYPE_NOT_YET_DEFINED"
          }
        }
      } ]
    }, {
      "uuid" : "ol-0-0-1-http-c-0020",
      "ltp-direction" : "core-model-1-4:TERMINATION_DIRECTION_SINK",
      "client-ltp" : [ "ol-0-0-1-op-c-0020" ],
      "server-ltp" : [ "ol-0-0-1-tcp-c-0020" ],
      "layer-protocol" : [ {
        "local-id" : "0",
        "layer-protocol-name" : "http-client-interface-1-0:LAYER_PROTOCOL_NAME_TYPE_HTTP_LAYER",
        "http-client-interface-1-0:http-client-interface-pac" : {
          "http-client-interface-capability" : {
            "application-name" : "RegistryOffice"
          },
          "http-client-interface-configuration" : {
            "release-number" : "0.0.1"
          }
        }
      } ]
    } ]
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

