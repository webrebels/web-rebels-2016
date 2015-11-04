

module.exports = (app) => {
  app.use('/2012', require('express').static('./node_modules/web-rebels-2012/'));
  app.use('/2013', require('express').static('./node_modules/web-rebels-2013/'));
};
