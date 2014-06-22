var Promise = require("bluebird"),
  fs = require('fs');
  path = require('path')
  _ = require('lodash'),
  oegyConfig = require('./config');

Promise.promisifyAll(fs);

exports.siteList = function(req, res) {
  fs.readdirAsync(oegyConfig.siteRoot).map(function(fsPath) {
    return path.join(oegyConfig.siteRoot, fsPath)
  }).filter(function(path) {
    return fs.statAsync(path).then(function(stats) {
      return stats.isDirectory()
    })
  }).filter(function(fsPath) {
    return fs.readdirAsync(fsPath).then(function(children) {
      return _.contains(children, 'compile.sh')
    })
  }).then(function(siteDirs) {
    res.json({ siteDirs: siteDirs })
  })
}

exports.itemSource = function(req, res) {
  var site = req.params.site
  var pathParameter = req.params[0]
  fs.readFileAsync(path.join(oegyConfig.siteRoot, site, 'content', pathParameter)).then(function(contents) {
    res.send(contents)
  })
}