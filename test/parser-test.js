const {loaders, importers, exporters, Parser} = require('../lib');
const path = require('path');

let map = {
    hostHeaderInfo: {
        responseCode: '{{responseCode}}',
        responseMessage: '{{responseMessage}}'
    },
    menu: '{{menu}}'
};

const input = {
    foo: {
        bar1: 'hello',
        bar2: 'world'
    }
};

let parser = new Parser(
    loaders.FileLoader,
    importers.JSONImporter,
    exporters.YAMLExporter,
    map);

console.log('-----------------------------------------------');
parser.parse(path.join(__dirname, 'assets', 'input.json'))
    .then(output => console.log(output));

