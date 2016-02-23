/* jshint node: true, strict: true */

'use strict';

const body    = require('body/json');
const log     = require('../log.js');


module.exports = function(req, res){
    body(req, res, {}, function(err, bodyObj) {
        if (err) {
            log.error('Error parsing CSP violation report', err);
            res.status(500).send("Internal server error");
            return;
        }
        log.warn('csp - ' + JSON.stringify(bodyObj, null, 2));
        res.status(200).send('OK');
    });
};
