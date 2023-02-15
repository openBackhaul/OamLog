const { elasticsearchService, getIndexAliasAsync, operationalStateEnum } = require('onf-core-model-ap/applicationPattern/services/ElasticsearchService');

/**
 * @description Elasticsearch preparation. Checks if ES instance is configured properly.
 * As first step, tries pinging the ES instance. If this doesn't work, ES
 * is considered not reachable or configured with wrong connection parameters.
 *
 * OL application will still run and allow the operator to properly configure
 * ES connection parameters through REST API.
 *
 * If the ES instance is reachable, as next steps it will try to find existing or
 * configure index-pattern and index-alias, based on index-alias in CONFIG file.
 *
 * @returns {void}
 */
module.exports = async function prepareElasticsearch() {
    console.log("Configuring Elasticsearch...");
    let ping = await elasticsearchService.getElasticsearchClientOperationalStateAsync();
    if (ping === operationalStateEnum.UNAVAILABLE) {
        console.error(`Elasticsearch unavailable. Skipping Elasticsearch configuration.`);
        return;
    }
    await createIndexTemplate();
    await createAlias();
    console.log('Elasticsearch is properly configured!');
}

/**
 * @description Creates/updates index-template with OL proprietary mapping.
 *
 * Proprietary mapping is needed for the field 'x-correlator' which is only
 * searchable if it's field is 'keyword'. By default ES denotes string fields
 * as 'text'.
 *
 * This template serves as binding between service policy and index.
 * If index-alias is changed, this index-template will be rewritten to reflect
 * the change, as we do not wish to continue applying service policy on an
 * index-alias that does not exist.
 *
 * Service policy is not set at this point in the index-template.
 */
async function createIndexTemplate() {
    let indexAlias = await getIndexAliasAsync();
    let client = await elasticsearchService.getClient(false);
    let found = await elasticsearchService.getExistingIndexTemplate();
    let iTemplate = found ? found : {
        name: 'ol-index-template',
        body: {
            index_patterns: `${indexAlias}-*`,
            template: {
                settings: {
                    'index.lifecycle.rollover_alias': indexAlias
                }
            }
        }
    }
    await client.cluster.putComponentTemplate({
        name: 'ol-mappings',
        body: {
            template: {
                mappings: {
                    properties: {
                        
                        'application-name': { type: 'text' },
                        'release-number': { type: 'text' },
                        'method': {type: 'text'},
                        'resource': {type: 'text'},
                        'stringified-body': { type: 'text' },
                        'response-code': { type: 'integer' },
                        'user-name': { type: 'text' },
                        'timestamp': { type: 'date' }
                        
                    }
                }
            }
        }
    });
    iTemplate.body.composed_of = ['ol-mappings'];
    await client.indices.putIndexTemplate(iTemplate);
}

/**
 * @description Creates index-alias with first index serving
 * as write_index (if such alias does not exist yet). Such
 * index will always end with '-000001' to allow for automated
 * rollover.
 */
async function createAlias() {
    let indexAlias = await getIndexAliasAsync();
    let client = await elasticsearchService.getClient(false);
    let alias = await client.indices.existsAlias({
        name: indexAlias
    });
    if (!alias.body) {
        await client.indices.create({
            index: `${indexAlias}-000001`,
            body: {
                aliases: {
                    [indexAlias]: {
                        is_write_index: true
                    }
                }
            }
        });
    }
}