var fs                  = require('fs');
var path                = require('path');
var config              = require('../../config');

var css = fs.readFileSync(path.resolve(__dirname, '../..' + config.get('docRoot') + '/css/structure.css'), {encoding:'utf8'});

module.exports = (app) => {
  app.get('/sponsors/scholarship', (req, res) => {
      res.render('sponsors/scholarship', {
          pageTitle: 'Scholarship Donations - Web Rebels ☠ Oslo ☠ June 2016',
          header: 'penthouse',
          css: css
      });
  });
};
