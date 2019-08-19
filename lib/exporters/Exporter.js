class Exporter {

    constructor() {
        console.log(new.target);
        if (new.target === Exporter) {
            throw new TypeError("Cannot construct Exporter instances directly");
        }
    }

    /**
     *
     * @param {Object} output_obj
     * @returns {*}
     */
    export(output_obj) {

    }

}

module.exports = Exporter;
