'use strict';

var fs                  = require('fs');
var path                = require('path');
var config              = require('../../config');

var css = fs.readFileSync(path.resolve(__dirname, '../..' + config.get('docRoot') + '/css/structure.css'), {encoding:'utf8'});

module.exports = (app) => {
  app.get('/scholarship/donate', (req, res) => {
      res.render('scholarship/donate', {
          pageTitle: 'Donate to the Web Rebels Scholarship Programme',
          header: 'penthouse',
          css: css
      });
  });
  app.post('/scholarship/donate', (req, res) => {
    //let stripe = require('stripe')(config.get('stripeSecretApiKey'));

    req.assert('email', 'You have to write an email').isEmail();
    req.assert('amount', 'You have to set an amount').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      res.render('error', errors);
    } else {

      //  add Stripe one-time charge as in this sample
      // https://github.com/mjhea0/node-stripe-charge/blob/master/server/routes/charge.js
      res.render('scholarship/donateThanks');
    }
  })
};
