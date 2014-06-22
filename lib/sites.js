var Promise = require("bluebird"),
  fs = require('fs');
  _ = require('lodash'),
  oegyConfig = require('./config');

Promise.promisifyAll(fs);

exports.siteList = function(req, res) {
  fs.readdirAsync(oegyConfig.siteRoot).map(function(path) {
    return oegyConfig.siteRoot + "/" + path
  }).filter(function(path) {
    return fs.statAsync(path).then(function(stats) {
      return stats.isDirectory()
    })
  }).filter(function(path) {
    return fs.readdirAsync(path).then(function(children) {
      return _.contains(children, 'compile.sh')
    })
  }).then(function(siteDirs) {
    res.json({ siteDirs: siteDirs })
  })
}