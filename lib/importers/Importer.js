class Importer {

    constructor() {
        console.log(new.target);
        if (new.target === Importer) {
            throw new TypeError("Cannot construct Importer instances directly");
        }
    }

    /**
     *
     * @param {string} raw_data
     * @returns {Object}
     */
    import(raw_data) {
        return {};
    }

}

module.exports = Importer;
