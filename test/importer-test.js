const {loaders, importers} = require('../lib');
const path = require('path');

let loader = new loaders.file(),
    importer = new importers.xml();

loader.load(path.join(__dirname, 'assets', 't3.xml'))
    .then(importer.import)
    .then(data => console.log(JSON.stringify(data, undefined, 4)))
    // .then(data => console.log(data["x-ibm-configuration"].assembly.execute[0]['operation-switch'].case[0].execute[0].invoke))
    // .then(data => console.log(data["x-ibm-configuration"].assembly.execute[0]))
    .catch(console.error);

