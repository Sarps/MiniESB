const {loaders, importers, exporters, Parser} = require('./lib');
const converter = require('api-spec-converter');

const map = {
    'swagger': '{{swagger}}',
    'info': {
        'version': '{{info.version}}',
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
    ibmName(input) {
        return input.replace(/\s/g, '-').toLowerCase();
    },
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
    from = 'wadl', to = 'swagger_2',
    // source = '/Users/SARPONG/Projects/RINO/MiniESB/test/assets/t3.wadl';
    source = 'https://citmobile.stanbicbank.com.gh/mobyfx/v1/application.wadl';

console.log('-----------------------------------------------');

async function generateYAML(filename, source) {
    const converted = await converter.convert({from, to, source});
    return await parser.parse(converted.stringify(), helpers);
}

let urls = [
    { name: 'Moby FX', url: 'https://citmobile.stanbicbank.com.gh/mobyfx/v1/application.wadl' }
];

for (url of urls) {
    let output = await generateYAML(url.name, url.url)
    fs.writeFileSync(path.join(__dirname, "output", `${url.name}.yaml`), {encoding: true})
}

