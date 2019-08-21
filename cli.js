const {loaders, importers, exporters, Parser} = require('./lib');
const fs = require("fs");
const path = require("path");

const args = require('minimist')(process.argv.slice(2));
if (!args.app) {
    throw new Error("app argument does not exist");
}
console.dir(args);

let data_file = path.join(__dirname, 'data', args.app), app;
if (fs.existsSync(`${data_file}.json`)) {
    app = JSON.parse( fs.readFileSync(`${data_file}.json`, {encoding: 'utf-8'}) );
} else if (fs.existsSync(`${data_file}.js`)) {
    app = require(`${data_file}.js`);
} else {
    throw new Error(`${args.app} file does not exist`);
}

let parser = new Parser(
    loaders[app.loader.type],
    importers[app.importer.type],
    exporters[app.exporter.type],
    app.transformer.map
);

console.log('-----------------------------------------------');
parser.parse(app.loader.uri, app)
    .then(output => console.log(output[0]));
