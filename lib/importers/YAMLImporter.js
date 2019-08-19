
const Importer = require('./Importer');
const YAML = require('yamljs');

class YAMLImporter extends Importer {

    constructor() {
        super();
    }


    import(raw_data) {
        return YAML.parse(raw_data);
    }
}

module.exports = YAMLImporter;
