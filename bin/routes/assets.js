"use strict";

const fs              = require('fs');
const path            = require('path');
const express         = require('express');
const browserify      = require('browserify');
const CombinedStream  = require('combined-stream');


const router = module.exports = express.Router();



router.get('/js/app-2016.js', (req, res, next) => {
    res.writeHead(200, {'Content-Type' : 'application/javascript'});
    browserify(fs.createReadStream(path.resolve(__dirname, '../../src/js/script.js'))).bundle().pipe(res);
});



router.get('/css/app-2016.css', (req, res, next) => {
    let combined = CombinedStream.create({pauseStreams: false});
    res.writeHead(200, {'Content-Type' : 'text/css'});
    combined.append(fs.createReadStream(path.resolve(__dirname, '../../src/css/styles.css')));
    combined.pipe(res);
});
