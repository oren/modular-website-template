// core modules
var http = require('http');
var url = require('url') ;
var path = require("path");

// non-core packages

// configs
var config = require('./config.js');
var port = config.port;

// app modules
var decorate = require('./decorate.js');
var router = require('./router.js');

http.createServer(function(req, res) {
  decorate(req, res, config);

  var parsed = url.parse(req.url)
  var pathname = parsed.pathname
  var normalPathname = path.normalize(pathname).replace(/\\/g, '/');
  var route = router.match(normalPathname);

  if (!route) return res.error(404);

  Object.keys(route).forEach(function (k) {
    req[k] = route[k];
  })

  route.fn(req, res)

}).listen(port);

console.log('website is running.\nPort ' + port + '\n');
   

