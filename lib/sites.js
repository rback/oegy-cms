var Bacon = require('baconjs').Bacon,
  fs = require('fs'),
  _ = require('lodash'),
  oegyConfig = require('./config');

module.exports = {
  siteList: siteList
}
function siteList(callback) {
  Bacon.fromNodeCallback(fs.readdir, oegyConfig.siteRoot)
    .map(function(paths) {
      return _(paths)
        .map(function(path) { return oegyConfig.siteRoot + "/" + path })
        .filter(isDirectory)
        .filter(isSiteDirectory)
        .value()
    })
    .onValue(callback)

  function isDirectory(path) {
    return fs.statSync(path).isDirectory()
  }

  function isSiteDirectory(path) {
    return _.contains(fs.readdirSync(path), 'compile.sh')
  }
}