const Exporter = require('./Exporter');

class JSONExporter extends Exporter {

    constructor() {
        console.log('Importer: JSONImporter');
        super();
    }


    export(output_obj) {
        return JSON.stringify(output_obj);
    }
}

module.exports = JSONExporter;
