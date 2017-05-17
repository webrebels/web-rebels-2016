# webrebels-2016 [![Build Status](https://travis-ci.org/webrebels/web-rebels-2016.svg?branch=master)](https://travis-ci.org/webrebels/web-rebels-2016)

[![Greenkeeper badge](https://badges.greenkeeper.io/webrebels/web-rebels-2016.svg)](https://greenkeeper.io/)


# Archived sites

All archived sites are served from this module. The sites are generated as static HTML pages in a gh-pages branch which contains a package.json to allow us to pull them in as dependencies. The we use [vhost](https://github.com/expressjs/vhost) and [connect](https://github.com/senchalabs/connect) to serve up the static sites for the subdomains. This works arround the issue with GitHub not being able to serve TLS for custom domains.

Locally you can test using URLs following this pattern: <year>.localhost:<port>

# Front page speaker recipe
1. Make a crop with the face to 250x250px
2. Convert to PNG-8 with dither noise and 2 indexed colors. (In Photoshop the easiest way is to save for web and select these settings then.)
3. Set the darkest indexed color to #202020
4. Use one of these for the lighter indexed color:
#fff / #ccc / yellow #e2cf4a / purple #8f4d91
5. Save fancy new front page speaker graphic.