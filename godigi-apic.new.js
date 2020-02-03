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
        'application/json',
        "text/plain"
    ],
    'produces': [
        'application/xml',
        'application/json',
        "text/plain"
    ],
    'paths': '{{paths}}',
    'x-ibm-configuration': {
        'enforced': true,
        'testable': true,
        'phase': 'realized',
        'cors': {'enabled': true},
        'assembly': {
            'execute': [
                {
                    "invoke": {
                        "title": "invoke",
                        "timeout": 60,
                        "verb": "keep",
                        "cache-response": "protocol",
                        "cache-ttl": 900,
                        "stop-on-error": [
                            null
                        ],
                        "version": "1.0.0",
                        "target-url": "https://ghuatgodigisrv1.gh.sbicdirectory.com:7102$(request.path)"
                    }
                }
            ],
        }
    }
};

let parser = new Parser(loaders.base, importers.json, exporters.yaml, map),
    from = 'wadl', to = 'swagger_2';

async function generateYAML(filename, source) {
    const converted = await converter.convert({from, to, source});
    map.info.title = filename;
    map.info["x-ibm-name"] = xIbmName(filename);
    return await parser.parse(converted.stringify(), {});
}

function xIbmName(input) {
    return input.replace(/\s/g, '-').toLowerCase();
}

function fromDir(startPath, filter) {
    return fs.existsSync(startPath) ?
        fs.readdirSync(startPath).filter(file => file.indexOf(filter) >= 0) : [];

}

async function generateYAMLs(urls, outFolder) {
    let total = urls.length, count = 1, failed = 0;
    for (let url of urls) {
        console.log('---------------------------------------------------------------------------------------');
        try {
            console.log(` ℹ️  [${count}/${total}] FETCHING: ${url.name} -> ${url.url}`);
            let output = await generateYAML(url.name, url.url);
            fs.writeFileSync(path.join(__dirname, `output/${outFolder}`, `${url.name}.yaml`), output);
            console.log(`  ✅ SUCCESS `);
        } catch (e) {
            console.log(e);
            failed++;
            console.log(`  ❌ ERROR   ==> (failed): ${failed}/${count}`);
        }
        count++;
    }
}

urls = fromDir('./apiconnect-wadl/uat', '.wadl').map(filename => ({
    name: `${path.basename(filename, '.wadl')}`,
    url: `./apiconnect-wadl/uat/${filename}`
}));

generateYAMLs(urls, 'uat');

urls = fromDir('./apiconnect-wadl/prod', '.wadl').map(filename => ({
    name: `${path.basename(filename, '.wadl')}`,
    url: `./apiconnect-wadl/prod/${filename}`
}));

generateYAMLs(urls, 'prod');

urls = ['AccountServices', 'APPServices', 'AuthServices', 'BankServices', 'BranchWifi', 'CollateralServices',
    'FileServices', 'FleetManagement', 'HomeLoan', 'Moby FX', 'NotificationServices', 'PPMCadmin',
    'RateServices', 'ServiceRequest'].map(name => ({
    name, url: `https://citmobile.stanbicbank.com.gh/${name}/application.wadl`
}));

generateYAMLs(urls, '');


