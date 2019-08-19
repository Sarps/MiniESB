const Loader = require('./Loader');
const fs = require('fs');

class FileLoader extends Loader {

    constructor() {
        super()
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    async load(uri) {
        return fs.readFileSync(uri, {encoding: 'utf-8'});
    }

}

module.exports = FileLoader;
