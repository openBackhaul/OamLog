const forwardingConstructConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/ConfigurationInput');
const operationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const forwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');

exports.regardApplication = function (operationClientConfigurationStatusList, redirectServiceRequestOperation) {
    return new Promise(async function (resolve, reject) {
        let forwardingConfigurationInputList = [];
        try {
            for (let i = 0; i < operationClientConfigurationStatusList.length; i++) {
                let configurationStatus = operationClientConfigurationStatusList[i];
                let operationClientUuid = configurationStatus.uuid;
                let operationClientName = await operationClientInterface.
                getOperationNameAsync(operationClientUuid);
                let forwardingConfigurationInput;
                let forwardingName;
                if (operationClientName == redirectServiceRequestOperation) {
                    forwardingName =
                        "NewApplicationCausesRequestForOamRequestInformation";
                    forwardingConfigurationInput = new forwardingConstructConfigurationInput(
                        forwardingName,
                        operationClientUuid
                    );
                    forwardingConfigurationInputList.push(
                        forwardingConfigurationInput
                    );
                }
            }
            resolve(forwardingConfigurationInputList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.disregardApplication = function (operationClientConfigurationStatusList) {
    return new Promise(async function (resolve, reject) {
        let forwardingConfigurationInputList = [];
        try {
            for (let i = 0; i < operationClientConfigurationStatusList.length; i++) {

                let configurationStatus = operationClientConfigurationStatusList[i];
                let operationClientUuid = configurationStatus.uuid;

                let forwardingConstructList = await forwardingDomain.getForwardingConstructListForTheFcPortAsync(
                    operationClientUuid,
                    FcPort.portDirectionEnum.OUTPUT);

                for (let j = 0; j < forwardingConstructList.length; j++) {
                    let fcNameList = forwardingConstructList[j]["name"];
                    let forwardingName = getValueFromKey(fcNameList, "ForwardingName");
                    let forwardingConfigurationInput = new forwardingConstructConfigurationInput(
                        forwardingName,
                        operationClientUuid
                    );
                    forwardingConfigurationInputList.push(
                        forwardingConfigurationInput
                    );
                }
            }
            resolve(forwardingConfigurationInputList);
        } catch (error) {
            reject(error);
        }
    });
}

function getValueFromKey(nameList, key) {
    for (let i = 0; i < nameList.length; i++) {
        let valueName = nameList[i]["value-name"];
        if (valueName == key) {
            return nameList[i]["value"];
        }
    }
    return undefined;
}