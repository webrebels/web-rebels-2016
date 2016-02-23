'use strict';

const body  = require('body/json');
const bole  = require('bole');
const log   = bole('csp');


module.exports = (req, res, next) => {
    body(req, res, {}, (error, bodyObj) => {
        if (error) {
            log.error(error, 'Error parsing CSP violation report');
            res.status(500).send("Internal server error");
            return;
        }
        log.warn('csp - ' + JSON.stringify(bodyObj, null, 2));
        res.status(200).send('OK');
    });
};
