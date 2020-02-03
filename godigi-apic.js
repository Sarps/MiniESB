const {loaders, importers, exporters, Parser} = require('./lib');
const converter = require('api-spec-converter');
const transformer = require('api-spec-transformer');
const fs = require('fs');
const path = require('path');

const map = {
    'swagger': '{{swagger}}',
    'info': {
        'version': '1.0.0',
        'title': '{{info.title}}',
        'description': '{{info.description}}',
        'contact': {
            'name': 'Godigi',
            'email': 'GoDigiGhana@stanbic.com.gh',
            'url': ''
        },
        'x-ibm-name': '=> ibmName(info.title)'
    },
    'host': '$(catalog.host)',
    'basePath': '{{basePath}}',
    'schemes': '{{schemes}}',
    'consumes': [
        'application/xml',
        'application/json'
    ],
    'produces': [
        'application/xml',
        'application/json'
    ],
    'paths': '{{paths}}',
    'definitions': '{{definitions}}',
    'tags': '{{tags}}',
    'x-ibm-configuration': {
        'enforced': true,
        'testable': true,
        'phase': 'realized',
        'cors': {'enabled': true},
        'assembly': {
            'catch': [],
            'execute': [{
                'operation-switch': {
                    'title': 'operation-switch',
                    'case': '=> operation(paths, host, basePath)',
                    'otherwise': [],
                    'version': '1.0.0'
                }
            }],
        },
        'catch': []
    }
};

const helpers = {

    operation(input, host, basePath) {

        const getKey = (path, method) => {
            return [...path.split("/"), method]
                .filter(w => w.length)
                .map(w => w[0].toUpperCase() + w.substr(1))
                .join("");
        };

        let cases = [];
        for (let path in input) {
            let v_case = {operations: [], execute: []};
            if (!input.hasOwnProperty(path)) {
                continue;
            }
            let path_data = input[path];
            for (let method in path_data) {
                if (!path_data.hasOwnProperty(method) || method === 'parameters') {
                    continue;
                }
                v_case.operations.push(path_data[method].operationId);
                v_case.execute.push({
                    invoke: {
                        title: 'invoke',
                        timeout: 60,
                        verb: method.toUpperCase(),
                        'cache-response': 'no-cache',
                        'cache-ttl': 900,
                        'stop-on-error': [null],
                        version: '1.0.0',
                        'target-url': `${host}/${basePath}/${path}`.replace(/\/+/g, '/')
                    }
                });
            }
            cases.push(v_case);
        }
        return cases;
    },
};

let parser = new Parser(loaders.base, importers.json, exporters.yaml, map),
    from = 'wadl', to = 'swagger_2';

async function generateYAML(filename, source) {
    const converted = await converter.convert({from, to, source});
    map.info.title = filename;
    map.info["x-ibm-name"] = xIbmName(filename);
    return await parser.parse(converted.stringify(), helpers);
}

function xIbmName(input) {
    return input.replace(/\s/g, '-').toLowerCase();
}

function fromDir(startPath,filter){
    return fs.existsSync(startPath) ?
        fs.readdirSync(startPath).filter(file => file.indexOf(filter)>=0) : [];

}

async function generateYAMLs(urls) {
    let total = urls.length, count = 1, failed = 0;
    for (let url of urls) {
        console.log('---------------------------------------------------------------------------------------');
        try {
            console.log(` ℹ️  [${count}/${total}] FETCHING: ${url.name} -> ${url.url}`);
            let output = await generateYAML(url.name, url.url);
            fs.writeFileSync(path.join(__dirname, "output", `${url.name}.yaml`), output);
            console.log(`  ✅ SUCCESS `);
        } catch (e) {
            console.log(e);
            failed++;
            console.log(`  ❌ ERROR   ==> (failed): ${failed}/${count}`);
        }
        count++;
        // console.log("");
    }
}

let urls = fromDir('./apiconnect-wadl/prod','.wadl').map(filename => ({
    name: `prod/${path.basename(filename, '.wadl')}`,
    url: `./apiconnect-wadl/prod/${filename}`
}));

generateYAMLs(urls);

urls = fromDir('./apiconnect-wadl/uat','.wadl').map(filename => ({
    name: `uat/${path.basename(filename, '.wadl')}`,
    url: `./apiconnect-wadl/uat/${filename}`
}));

generateYAMLs(urls);

// const postmanToSwagger = new transformer.Converter(transformer.Formats.POSTMAN, transformer.Formats.SWAGGER);
//
// postmanToSwagger.loadFile('./test/assets/TransactionServices.postman.json', function(err) {
//     if (err) {
//         console.log(err.stack);
//         return;
//     }
//
//     postmanToSwagger.convert('yaml')
//         .then(function(convertedData) {
//             // convertedData is swagger YAML string
//             console.log(convertedData);
//         })
//         .catch(function(err){
//             console.log(err);
//         });
// });

// console.log(converter.Formats);

