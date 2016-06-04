"use strict";

var express = require('express');
var path = require('path');
var cons = require('consolidate');


var app = express();

var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', function(req, res){
	res.render('index');
});

