
const Loader     = require('./Loader');
const JSONLoader = require('./JSONLoader');
const FileLoader = require('./FileLoader');
const URLLoader  = require('./URLLoader');

module.exports = {
    Loader, JSONLoader, FileLoader, URLLoader,
    base: Loader,
    json: JSONLoader,
    file: FileLoader,
    url: URLLoader
};
