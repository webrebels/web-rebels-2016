'use strict';

const path        = require('path');
const http        = require('http');

const bodyParser  = require('body-parser');
const compress    = require('compression')();
const express     = require('express');
const validator   = require('express-validator');
const helmet      = require('helmet');
const hbs         = require('hbs');
const serveStatic = require('serve-static');
const bole        = require('bole');

const app         = express();

const config      = require('../config');
const middleSSL   = require('./middleware/ssl.js');
const routeCsp    = require('./routes/csp.js');



// Configure logging

bole.output({
    level: config.get('logConsoleLevel'),
    stream: process.stdout
});



// Configure application

app.disable('x-powered-by');
app.enable('trust proxy');



// Set up template engine

hbs.registerPartials(path.resolve(__dirname, '../views/partials/'));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views/'));



// Set middleware

app.use(middleSSL.ensure);
app.use(compress);
app.use(serveStatic(path.resolve(__dirname, '..' + config.get('docRoot')), {
  maxAge: '30d'
}));



app.use(helmet.hsts({
  maxAge: 15724800000, // 26 weeks
  includeSubdomains: true,
  preload: true
}));
app.use(helmet.frameguard('deny'));
app.use(helmet.csp({
  defaultSrc: ["'none'"],
  scriptSrc: ["'self'", "data:", "'unsafe-inline'", "'unsafe-eval'",
    "www.google-analytics.com", "ssl.google-analytics.com",
    "professional.player.qbrick.com", "publisher.qbrick.com"
  ],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "server.arcgisonline.com",
    "ssl.google-analytics.com"
  ],
  frameSrc: ["eventbrite.com", "www.eventbrite.com"],
  objectSrc: ["'self'", "professional.player.qbrick.com"],
  fontSrc: ["'self'"],
  connectSrc: ["*"],
  sandbox: ['allow-forms', 'allow-scripts'],
  reportUri: '/api/v1/csp',
  /*reportOnly: true, // set to true if you only want to report errors*/
  setAllHeaders: true, // set to true if you want to set all headers
  safari5: false // set to true if you want to force buggy CSP in Safari 5
}));



// Set up routes
app.post('/api/v1/csp', routeCsp);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(validator());

app.get('/admin/ping', (req, res) => {
  res.status(200).send('OK');
});



// Set up routes only used in development

if (config.get('env') === 'development') {
    app.use(require('./routes/assets.js'));
}



require('./routes/content')(app);
require('./routes/donations')(app);

const httpServer = module.exports = http.createServer(app);
