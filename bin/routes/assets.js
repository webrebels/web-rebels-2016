/* jshint node: true, strict: true */

'use strict';

const browserify      = require('browserify');
const CombinedStream  = require('combined-stream');
const path            = require('path');
const fs              = require('fs');

module.exports.appJs = (req, res) => {
    res.writeHead(200, {'Content-Type' : 'application/javascript'});
    browserify(fs.createReadStream(path.resolve(__dirname, '../../src/js/script.js'))).bundle().pipe(res);
};

module.exports.appCss = (req, res) => {
    var combined = CombinedStream.create({pauseStreams: false});
    res.writeHead(200, {'Content-Type' : 'text/css'});
    combined.append(fs.createReadStream(path.resolve(__dirname, '../../src/css/styles.css')));
    combined.pipe(res);
};
