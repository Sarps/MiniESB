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
        this.loader = loader;
        this.importer = importer;
        this.exporter = exporter;
        this.transform_map = transform_map;
    }

    /**
     * 
     * @param {string} data
     * @returns {string}
     */
    parse(data) {
        return "";
    }
}