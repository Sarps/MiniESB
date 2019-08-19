const Exporter =  require('./Exporter');
const JSONExporter =  require('./JSONExporter');
const YAMLExporter =  require('./YAMLExporter');

module.exports = {
    Exporter, JSONExporter, YAMLExporter,
    base: Exporter,
    json: JSONExporter,
    yaml: YAMLExporter
};
