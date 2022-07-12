/*
*
* create and export configuration variables
*
*/

// container for all the environments
let environments = {};

// dev default environment
environments.dev = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'dev'
};

// qa environment
environments.qa = {
    'httpPort' : 3000,
    //'httpsPort' : 3001,
    'envName' : 'qa'
};

// staging environment
environments.staging = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'staging'
};

// production environment
environments.production = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'production'
};

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check if the currentEnvironment is one of the environments mentioned above else default to dev
const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.dev;

// Modules to export
module.exports = environmentToExport;

//command: NODE_ENV=production node index.js

//ssl cert pwd: test