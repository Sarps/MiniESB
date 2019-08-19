const Exporter = require('./Exporter');
const YAML = require('yamljs');

class YAMLExporter extends Exporter {

    constructor() {
        super();
    }


    export(output_obj) {
        return YAML.stringify(output_obj);
    }
}

module.exports = YAMLExporter;
