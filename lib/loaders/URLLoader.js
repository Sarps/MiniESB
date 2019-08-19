const Loader = require('./Loader');
const rp = require('request-promise');

class URLLoader extends Loader {

    constructor() {
        super()
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    async load(uri) {
        return await rp.get(uri);
    }

}

module.exports = URLLoader;
