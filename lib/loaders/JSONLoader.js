const Loader = require('./Loader')

class JSONLoader extends Loader {

    constructor() {
        console.log('Loader: JSONLoader');
        super()
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    load(uri) {
        return JSON.stringify(uri);
    }

}

module.exports = JSONLoader;
