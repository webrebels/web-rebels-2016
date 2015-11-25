var fs                  = require('fs');
var path                = require('path');
var config              = require('../../config');

var css = fs.readFileSync(path.resolve(__dirname, '../..' + config.get('docRoot') + '/css/structure.css'), {encoding:'utf8'});

module.exports = (app) => {
  app.get('/', (req, res) => {
      res.render('waiting', {
          pageTitle: 'Web Rebels ☠ Oslo ☠ June 2016',
          header: 'penthouse',
          css: css
      });
  });
  app.get('/home', (req, res) => {
      res.render('home', {
          pageTitle: 'Web Rebels ☠ Oslo ☠ June 2016',
          header: 'penthouse',
          css: css
      });
  });
  app.get('/scholarship', (req, res) => {
      res.render('scholarship', {
          pageTitle: 'Web Rebels Scholarship Programme',
          header: 'penthouse',
          css: css
      });
  });
};
