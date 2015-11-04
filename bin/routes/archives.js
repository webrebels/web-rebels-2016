
var vhost = require('vhost');
var connect = require('connect');
var servestatic = require('serve-static')
var config = require('../../config');

module.exports = (app) => {
  ['2012', '2013', '2014', '2015'].map((year) => {
    app.use(vhost(`${year}.webrebels.org`, connect().use(servestatic(`./node_modules/web-rebels-${year}/`))));
    if (config.get('env') === 'development') {
      app.use(vhost(`${year}.localhost`, connect().use(servestatic(`./node_modules/web-rebels-${year}/`))));
    }
  });
};
