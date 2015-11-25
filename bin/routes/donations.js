var fs                  = require('fs');
var path                = require('path');
var config              = require('../../config');

var css = fs.readFileSync(path.resolve(__dirname, '../..' + config.get('docRoot') + '/css/structure.css'), {encoding:'utf8'});

module.exports = (app) => {
  app.get('/scholarship/donate', (req, res) => {
      res.render('sponsors/scholarship', {
          pageTitle: 'Donate to the Web Rebels Scholarship Programme',
          header: 'penthouse',
          css: css
      });
  });
};
