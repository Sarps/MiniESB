const Loader = require('./Loader')

class JSONLoader extends Loader {

    constructor() {
        super()
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    async load(uri) {
        return JSON.stringify(uri);
    }

}

module.exports = JSONLoader;
