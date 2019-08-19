class Loader {

    constructor() {
        console.log(new.target);
        if (new.target === Loader) {
            throw new TypeError("Cannot construct Loader instances directly");
        }
    }

    /**
     * Fetches raw string data
     * @param {*} uri 
     * @returns {string}
     */
    async load(uri) {
        return "";
    }

}

module.exports = Loader;
