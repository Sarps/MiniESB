
module.exports = {

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
                if (!path_data.hasOwnProperty(method)) {
                    continue;
                }
                v_case.operations.push(getKey(path, method));
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

    'loader': {
        'type': 'file',
        'uri': '/Users/SARPONG/Projects/RINO/MiniESB/test/assets/t2.yaml'
    },
    'importer': {
        'type': 'yaml'
    },
    'exporter': {
        'type': 'json'
    },
    'transformer': {
        'map': {
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
        }
    }
};
