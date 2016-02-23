"use strict";



/** 
  * Enforce SSL if the http header "x-forwarded-proto" is pressent
  * This header is set by the http proxy which handles the SSL
  *
  * @param {Object} req HTTP request object
  * @param {Object} res HTTP response object
  * @param {function} next Next function in the route
  */

module.exports.ssl = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] === "http") {
       res.redirect("https://" + req.headers.host + req.url);
    } else {
       next();
    }
};