/* jshint node: true, strict: true */

'use strict';

var path                = require('path');
var http                = require('http');
var config              = require('../config');

var bodyParser          = require('body-parser');
var compress            = require('compression')();
var express             = require('express');
var expressValidator    = require('express-validator');
var helmet              = require('helmet');
var hbs                 = require('hbs');
var serveStatic         = require('serve-static');

var app                 = express();
var middleSSL           = require('./middleware/ssl.js');
var routeCsp            = require('./routes/csp.js');
/*
var openmic             = require('./routes/openmic.js');
var scholarship         = require('./routes/scholarship.js');
*/
var routeAssets         = require('./routes/assets.js');

http.globalAgent.maxSockets = Infinity;

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(middleSSL.ensure);
app.use(compress);
app.use(serveStatic(path.resolve(__dirname, '..' + config.get('docRoot')), {maxAge: '30d'}));

hbs.registerPartials(path.resolve(__dirname, '../views/partials/'));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views/'));

app.use(helmet.hsts({
    maxAge              : 15724800000,  // 26 weeks
    includeSubdomains   : true,
    preload             : true
}));
app.use(helmet.frameguard('deny'));
app.use(helmet.csp({
    defaultSrc: ["'none'"],
    scriptSrc: ["'self'", "data:", "'unsafe-inline'", "'unsafe-eval'", "www.google-analytics.com", "ssl.google-analytics.com", "professional.player.qbrick.com", "publisher.qbrick.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "server.arcgisonline.com", "ssl.google-analytics.com"],
    frameSrc: ["eventbrite.com", "www.eventbrite.com"],
    objectSrc: ["'self'", "professional.player.qbrick.com"],
    fontSrc: ["'self'"],
    connectSrc: ["*"],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/api/v1/csp',
    reportOnly: true,       // set to true if you only want to report errors
    setAllHeaders: true,    // set to true if you want to set all headers
    safari5: false          // set to true if you want to force buggy CSP in Safari 5
}));



// Set up routes
app.post('/api/v1/csp', routeCsp);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
/*
app.post('/api/v1/openmic', openmic);
app.post('/api/v1/scholarship', scholarship);
*/

app.get('/admin/ping', (req, res) => {
    res.status(200).send('OK');
});

if (config.get('env') === 'development') {
    app.get('/css/app.css', routeAssets.appCss);
    app.get('/js/app.js', routeAssets.appJs);
}

require('./routes/archives')(app);

require('./routes/content')(app);

var httpServer = http.createServer(app);
module.exports = httpServer;
