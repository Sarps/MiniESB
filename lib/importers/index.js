const Importer =  require('./Importer');
const JSONImporter =  require('./JSONImporter');
const YAMLImporter =  require('./YAMLImporter');

module.exports = {
    Importer, JSONImporter, YAMLImporter,
    base: Importer,
    json: JSONImporter,
    yaml: YAMLImporter
};
