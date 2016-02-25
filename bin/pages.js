"use strict";

const fs      = require('fs');
const path    = require('path');
const config  = require('../config');
const express = require('express');



const css = fs.readFileSync(path.resolve(__dirname, '..' + config.get(
  'docRoot') + '/css/structure.css'), {
  encoding: 'utf8'
});



const router = module.exports = express.Router();



router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Web Rebels ☠ Oslo ☠ June 2016',
        header: 'penthouse',
        css: css
    });
});



router.get('/home', (req, res, next) => {
    res.render('home', {
        pageTitle: 'Web Rebels ☠ Oslo ☠ June 2016',
        header: 'penthouse',
        css: css
    });
});



router.get('/about', (req, res, next) => {
    res.render('about', {
        pageTitle: 'About the Web Rebels Conference',
        header: 'penthouse',
        css: css
    });
});



router.get('/location', (req, res, next) => {
    res.render('location', {
        pageTitle: 'Web Rebel location 2016',
        header: 'penthouse',
        css: css
    });
});

router.get('/travel', (req, res, next) => {
    res.render('travel', {
        pageTitle: 'Traveling to Web Rebel 2016?',
        header: 'penthouse',
        css: css
    });
});



router.get('/tickets', (req, res, next) => {
    res.render('tickets', {
        pageTitle: 'Ticket Sales for Web Rebels 2016',
        header: 'penthouse',
        css: css
    });
});



router.get('/speakers', (req, res, next) => {
    res.render('speakers', {
        pageTitle: 'Web Rebels Speakers 2016',
        header: 'penthouse',
        css: css
    });
});



router.get('/sponsors/packages', (req, res, next) => {
    res.render('sponsors/packages', {
        pageTitle: 'Web Rebels Sponsorship options 2016',
        header: 'penthouse',
        css: css
    });
});



router.get('/scholarship', (req, res, next) => {
    res.render('scholarship/index', {
        pageTitle: 'Web Rebels Scholarship Programme',
        header: 'penthouse',
        css: css
    });
});



router.get('/scholarship/donate', (req, res, next) => {
    res.render('scholarship/donate', {
        pageTitle: 'Donate to the Web Rebels Scholarship Programme',
        header: 'penthouse',
        css: css
    });
});

router.get('/buytickets', (req, res, next) => {
  res.redirect('https://ti.to/webrebels/2016');
});

router.post('/scholarship/donate', (req, res, next) => {
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
});