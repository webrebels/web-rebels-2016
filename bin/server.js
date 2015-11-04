/* jshint node: true, strict: true */

'use strict';

const fs      = require('fs');
const net     = require('net');
const repl    = require('repl');
const server  = require('./app.js');
const config  = require('../config');
const log     = require('./log.js');

server.listen(config.get('httpServerPort'), () => {
    log.info('Web Rebels website running at http://localhost:' + config.get('httpServerPort') + '/');
    log.info('server process has pid ' + process.pid);
    log.info('environment is: ' + config.get('env'));
    log.info('serving static files from ' + config.get('docRoot'));
});

var replPath = './repl.' + config.get('httpServerPort') + '.sock';
var netRepl = net.createServer((socket) => {
    log.info('user connected to the REPL');
    var replServer = repl.start({
        prompt: 'wr > ',
        input: socket,
        output: socket,
        terminal: true,
        useGlobal: false
    }).on('exit', function () {
        log.info('user exited the REPL');
        socket.end();
    }).on('error', function (err) {
        log.error('repl error');
        log.error(err);
    });

    replServer.context.server = server;
    replServer.context.config = config;
    replServer.context.log = log;

});

fs.unlink(replPath, () => {
    netRepl.listen(replPath, () => {
        log.info('repl available at ' + replPath);
    });
});

process.on('uncaughtException', (err) => {
    log.error('shutdown - server taken down by force due to a uncaughtException');
    log.error(err.message);
    log.error(err.stack);
    netRepl.close();
    server.close();
    process.nextTick(() => {
        process.exit(1);
    });
});

process.on('SIGINT', () => {
    log.info('shutdown - got SIGINT - taking down server gracefully');
    netRepl.close();
    server.close();
    process.nextTick(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    log.info('shutdown - got SIGTERM - taking down server gracefully');
    netRepl.close();
    server.close();
    process.nextTick(() => {
        process.exit(0);
    });
});
