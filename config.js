/*
*
* create and export configuration variables
*
*/

// container for all the environments
let environments = {};

// dev default environment
environments.dev = {
    'port' : 3000,
    'envName' : 'dev'
};

// qa environment
environments.qa = {
    'port' : 3000,
    'envName' : 'qa'
};

// staging environment
environments.staging = {
    'port' : 5000,
    'envName' : 'staging'
};

// production environment
environments.production = {
    'port' : 3000,
    'envName' : 'production'
};

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check if the currentEnvironment is one of the environments mentioned above else default to dev
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;

// Modules to export
module.exports = environmentToExport;

//command: NODE_ENV=production node index.js