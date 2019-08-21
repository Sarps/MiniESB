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

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [json-to-json transformer](https://www.npmjs.com/package/json-to-json-transformer) - The transformer used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Oppong-Sarpong Emmanuel** - *All the work* - [Sarps](https://github.com/Sarps)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
