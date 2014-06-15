var express = require('express');
var enchilada = require('enchilada');
var lessMiddleware = require('less-middleware');

var app = express();

app.use(enchilada(__dirname + '/public'));
app.use(lessMiddleware(__dirname + "/public"));
app.use(express.static(__dirname + '/public'));

app.listen(8000);