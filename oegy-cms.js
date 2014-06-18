var express = require('express'),
  morgan  = require('morgan'),
  enchilada = require('enchilada'),
  lessMiddleware = require('less-middleware'),
  _ = require('lodash'),
  fs = require('fs'),
  sites = require('./lib/sites')
  oegyConfig = require('./lib/config');

var app = express();
sites.siteList(console.log)

app.use(morgan());
app.use('/oegy-cms/js', enchilada(__dirname + '/public/js'));
app.use('/oegy-cms/less', lessMiddleware('./public/less'));
app.use('/oegy-cms', express.static('./public'));
app.use(express.static(oegyConfig.siteRoot + '/oegy-site/output'));

app.listen(8000);