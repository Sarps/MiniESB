const args = require('minimist')(process.argv.slice(2));
console.dir(args);

let config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", args.app))
);

let parser = new Parser(
    loaders[config.loader.type],
    importers[config.importer.type],
    exporters[config.exporter.type],
    config.transformer.map);

console.log('-----------------------------------------------');
parser.parse(path.join(__dirname, 'assets', 'input.json'))
// parser.parse("https://citmobile.stanbicbank.com.gh/digicoupons/api/v1/staff/menu?branch=Nungua")
    .then(output => console.log(output));
