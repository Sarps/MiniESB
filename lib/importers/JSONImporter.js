
const Importer = require('./Importer');

class JSONImporter extends Importer {

    constructor() {
        super();
    }


    import(raw_data) {
        return JSON.parse(raw_data);
    }
}

module.exports = JSONImporter;
