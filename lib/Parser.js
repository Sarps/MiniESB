
const j2j = require('json-to-json-transformer');

/**
 * 
 * @class {Parser}
 */
class Parser {

    loader;
    importer;
    exporter;
    transform_map;

    /**
     * 
     * @param {*} loader 
     * @param {*} importer 
     * @param {*} exporter 
     * @param {*} transform_map 
     */
    constructor(loader, importer, exporter, transform_map) {
        this.loader = new loader();
        this.importer = new importer();
        this.exporter = new exporter();
        this.transform_map = typeof transform_map === 'string' ? JSON.parse(transform_map) : transform_map;
    }

    /**
     * 
     * @param {*} uri
     * @returns {string}
     */
    parse(uri) {
        const raw_data = this.loader.load(uri);
        let output_obj = this.transform( this.importer.import(raw_data) );
        return this.exporter.export(output_obj);
    }

    /**
     * 
     * Uses the transform map to transform the json_data
     * 
     * @param {Object} json_data 
     * @returns {Object}
     */
    transform(input_obj) {
        return j2j.transform(this.transform_map, input_obj);
    }
}

module.exports = Parser;
