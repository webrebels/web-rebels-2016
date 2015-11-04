# webrebels-2016 [![Build Status](https://travis-ci.org/webrebels/web-rebels-2016.svg?branch=master)](https://travis-ci.org/webrebels/web-rebels-2016)


# Archived sites

All archived sites are served from this module. The sites are generated as static HTML pages in a gh-pages branch which contains a package.json to allow us to pull them in as dependencies. The we use [vhost](https://github.com/expressjs/vhost) and [connect](https://github.com/senchalabs/connect) to serve up the static sites for the subdomains. This works arround the issue with GitHub not being able to serve TLS for custom domains.

Locally you can test using URLs following this pattern: <year>.localhost:<port>
