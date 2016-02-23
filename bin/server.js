'use strict';

const server  = require('./app.js');
const config  = require('../config');
const log     = require('./log.js');

server.listen(config.get('httpServerPort'), () => {
    log.info('Web Rebels website running at http://localhost:' + config.get('httpServerPort') + '/');
    log.info('server process has pid ' + process.pid);
    log.info('environment is: ' + config.get('env'));
    log.info('serving static files from ' + config.get('docRoot'));
});

process.on('uncaughtException', (err) => {
    log.error('shutdown - server taken down by force due to a uncaughtException');
    log.error(err.message);
    log.error(err.stack);
    server.close();
    process.nextTick(() => {
        process.exit(1);
    });
});

process.on('SIGINT', () => {
    log.info('shutdown - got SIGINT - taking down server gracefully');
    server.close();
    process.nextTick(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    log.info('shutdown - got SIGTERM - taking down server gracefully');
    server.close();
    process.nextTick(() => {
        process.exit(0);
    });
});
