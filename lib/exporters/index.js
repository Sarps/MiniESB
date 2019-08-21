const Exporter =  require('./Exporter');
const JSONExporter =  require('./JSONExporter');
const YAMLExporter =  require('./YAMLExporter');
const XMLExporter =  require('./XMLExporter');

module.exports = {
    Exporter, JSONExporter, YAMLExporter, XMLExporter,
    base: Exporter,
    json: JSONExporter,
    yaml: YAMLExporter,
    xml: XMLExporter
};
