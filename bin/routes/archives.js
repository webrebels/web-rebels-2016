
var vhost = require('vhost');
var connect = require('connect');
var servestatic = require('serve-static')

module.exports = (app) => {
  ['2012', '2013', '2014', '2015'].map((year) => {
    app.use(vhost(`${year}.webrebels.org`, connect().use(servestatic(`./node_modules/web-rebels-${year}/`))));
  });
};
