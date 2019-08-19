const Exporter = require('./Exporter');

class JSONExporter extends Exporter {

    constructor() {
        super();
    }


    export(output_obj) {
        return JSON.stringify(output_obj, undefined, 4);
    }
}

module.exports = JSONExporter;
