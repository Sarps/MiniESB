const {loaders, importers, exporters, Parser} = require('../lib')

let map = {
    a: '{{foo.bar1}}',
    b: {
        c: '{{foo.bar2}}',
        d: 'literal text',
        e: 'hello {{foo.bar2}} again'
    }
};

const input = {
    foo: {
        bar1: 'hello',
        bar2: 'world'
    }
};

let parser = new Parser(
    loaders.JSONLoader,
    importers.JSONImporter,
    exporters.JSONExporter,
    map);

let output = parser.parse(input);
console.log('-----------------------------------------------');
console.log(output);
console.log('-----------------------------------------------');

