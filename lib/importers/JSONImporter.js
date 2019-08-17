
const Importer = require('./Importer');

class JSONImporter extends Importer {

    constructor() {
        console.log('Importer: JSONImporter');
        super();
    }


    import(raw_data) {
        return JSON.parse(raw_data);
    }
}

module.exports = JSONImporter;
