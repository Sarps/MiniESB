# [MiniESB](https://www.github.com/Sarps/MiniESB)
Bare-bone Enterprise Service Bus Starter Framework - https://www.github.com/Sarps/MiniESB

## Project Description

Just like any other Enterprise Service Bus, this framework loads raw input data from 
multiple sources, then importers convert the raw data to a javascript object in-memory, based on the
import format provided.

The framework (MiniESB) then uses a transformer map which you (the user or developer) must provide, 
 to transform the javascript object to a new javascript object.

The new javascript object is then exported to a raw text format also based on the export
format.

##


#### Sample Code

Clone the Repo and try this sample out.

```javascript
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
// parser.parse("https://citmobile.stanbicbank.com.gh/digicoupons/api/v1/staff/menu?branch=Nungua")
    .then(output => console.log(output));
```

The framework currently supports the following loaders and file formats.

+ Loaders (*Fetches raw input data from a source*)
    - **File Loader** -- ```new loaders.file()``` of ```new loaders.FileLoader()``` - This loader fetches 
    raw data from a file
    - **URL Loader** -- ```new loaders.file()``` of ```new loaders.FileLoader()``` - This loader fetches 
        raw data from a url
        
+ Importers (*Imports and converts raw input data to a javascript object*)
    - **JSON Importer** -- ```new importers.json()``` or ```new importers.JSONLoader()``` - This importer converts 
    json string to a javascript object
    - **XML Importer** -- ```new importers.xml()``` or ```new importers.XMLLoader()``` - This importer converts 
    xml string to a javascript object
    - **YAML Importer** -- ```new importers.yaml()``` or ```new importers.YAMLLoader()``` - This importer converts 
    yaml string to a javascript object
     
+ Exporters (*Exports and converts the javascript object to raw input data*)
    - **JSON Exporter** -- ```new exporters.json()``` or ```new exporters.JSONExporter()``` - This exporter converts 
    to json string
    - **XML Exporter** -- ```new exporters.xml()``` or ```new exporters.XMLExporter()``` - This exporter converts 
    to xml string
    - **YAML Exporter** -- ```new exporters.yaml()``` or ```new exporters.YAMLExporter()``` - This exporter converts 
    to yaml string


### Prerequisites

This project was built and tested on these systems and versions:

- NodeJS - v12.3.1
- NPM - v6.10.3
- MacOS *Mojave* - v10.14.6

Please notify me via mail if you are able to run it on any system and/or version other 
than listed so that it can be added to the list. Thanks in advance.

## Deployment

Deployment section is still under development

## Built With

* [json-to-json transformer](https://www.npmjs.com/package/json-to-json-transformer) - The transformer used

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Oppong-Sarpong Emmanuel** - *All the work* - [Sarps](https://github.com/Sarps)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Hat tip to anyone whose code was used
