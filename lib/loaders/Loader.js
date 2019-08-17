class Loader {

    constructor() {
        if (new.target === Loader) {
            throw new TypeError("Cannot construct Loader instances directly");
        }
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    load(uri) {
        return "";
    }

}

module.exports = Loader;