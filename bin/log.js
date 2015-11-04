/* jshint node: true, strict: true */

'use strict';

var config      = require('../config');
var winston     = require('winston');

var levels = {
    debug   : 0,
    info    : 1,
    warn    : 2,
    error   : 3
};

var colors = {
    debug   : 'blue',
    info    : 'green',
    warn    : 'yellow',
    error   : 'red'
};

var transportConsole = new winston.transports.Console({
    silent              : config.get('logConsoleSilent'),
    level               : config.get('logConsoleLevel'),
    colorize            : true,
    handleExceptions    : true
});

var log = new winston.Logger({
    levels: levels,
    colors: colors,
    exitOnError : false,
    transports  : [
        transportConsole
    ]
});

module.exports = log;
