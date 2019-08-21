const Importer =  require('./Importer');
const JSONImporter =  require('./JSONImporter');
const YAMLImporter =  require('./YAMLImporter');
const XMLImporter =  require('./XMLImporter');

module.exports = {
    Importer, JSONImporter, YAMLImporter, XMLImporter,
    base: Importer,
    json: JSONImporter,
    yaml: YAMLImporter,
    xml: XMLImporter
};
