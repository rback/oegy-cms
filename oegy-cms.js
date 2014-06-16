var express = require('express');
var enchilada = require('enchilada');
var lessMiddleware = require('less-middleware');
var _ = require('lodash')
var fs = require('fs')
var oegyConfig = require('./lib/config')

fs.readdir(oegyConfig.siteRoot, function(err, files) {
  var dirs = _.each(files, function(file) {
    return fs.statSync(oegyConfig.siteRoot + "/" + file).isDirectory()
  })
  console.log(dirs)
})

var app = express();

app.use(enchilada(__dirname + '/public'));
app.use(lessMiddleware(__dirname + "/public"));
app.use(express.static(__dirname + '/public'));

app.listen(8000);