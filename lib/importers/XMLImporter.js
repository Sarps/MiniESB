
const Importer = require('./Importer');
const parseString = require('xml2js').parseString;

class XMLImporter extends Importer {

    constructor() {
        super();
    }


    async import(raw_data) {
        return new Promise((resolve, reject) => {
            parseString(raw_data, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = XMLImporter;
