const Exporter = require('./Exporter');
const Builder = require('xml2js').Builder;

class XMLExporter extends Exporter {

    constructor() {
        super();
    }

    export(output_obj) {
        const builder = new Builder();
        return builder.buildObject(output_obj);
    }
}

module.exports = XMLExporter;
