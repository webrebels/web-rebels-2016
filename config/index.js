/* jshint node: true, strict: true */

'use strict';

const path    = require('path');
const fs      = require('fs');
const convict = require('convict');
const pckage  = require('../package.json');

var conf = convict({
env: {

    doc: 'Applicaton environments',
        format  : ['development', 'production'],
        default : 'development',
        env     : 'NODE_ENV',
        arg     : 'env'
    },

    version: {
        doc     : 'Version of the application',
        format  : '*',
        default : pckage.version
    },

    httpServerPort: {
        doc     : 'The port the server should bind to',
        format  : 'port',
        default : 8000,
        env     : 'PORT',
        art     : 'port'
    },

    docRoot: {
        doc     : 'Document root for static files to be served by the http server',
        format  : '*',
        default : '/src',
        env     : 'NODE_HTTP_DOC_ROOT'
    },

    logConsoleLevel: {
        doc     : 'Which level the console transport log should log at',
        format  : '*',
        default : 'info',
        env     : 'NODE_LOG_CONSOLE_LEVEL',
        arg     : 'log-console-level'
    },

    mandrillApiKey: {
        doc     : 'The Mandrill API key',
        format  : '*',
        default : false,
        env     : 'MANDRILL_API_KEY',
        arg     : 'mandrill-api-key'
    },

    stripeSecretApiKey: {
        doc     : 'Stripe secret API key',
        format  : '*',
        default : false,
        env     : 'STRIPE_SECRET_API_KEY',
        arg     : 'stripe-secret-api-key'
    },

    stripePublishableApiKey: {
        doc     : 'Stripe publishable API key',
        format  : '*',
        default : false,
        env     : 'STRIPE_PUBLISH_API_KEY',
        arg     : 'stripe-publishable-api-key'
    }

});

var env = conf.get('env');
if (fs.existsSync(path.resolve(__dirname, '../config/local.json'))) {
    conf.loadFile([path.resolve(__dirname, '../config/', env + '.json'), path.resolve(__dirname, '../config/local.json')]);
} else {
    conf.loadFile([path.resolve(__dirname, '../config/', env + '.json')]);
}
conf.validate();

module.exports = conf;
