/* jshint node: true, strict: true */

'use strict';

var browserify      = require('browserify');
var CombinedStream  = require('combined-stream');
var path            = require('path');
var fs              = require('fs');

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
