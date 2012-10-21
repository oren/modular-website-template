// core modules
var url = require('url');
var http = require('http');
var path = require('path');

// non-core packages
var Templar = require("templar");
var ejs = require('ejs');
var ErrorPage = require("error-page");


var tplDir = path.resolve(__dirname, 'templates');
var templateOptions = { engine: ejs, folder: tplDir };
var errorPageConf = {};

function errorHandler (req, res, data) {
  data.title = data.message
  data.statusMessage = http.STATUS_CODES[data.statusCode]
  var tpl = 'error.ejs';

  res.template(tpl, data, data.statusCode || 500);
};

function decorate (req, res, config) {
  if (config.errorPage) { errorPageConf = config.errorPage };
  errorPageConf['*'] = errorHandler

  res.template = Templar(req, res, templateOptions);
  res.error = ErrorPage(req, res, errorPageConf);
};

module.exports = decorate;
