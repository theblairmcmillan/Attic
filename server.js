"use strict";

var express = require('express');
var path = require('path');

var PORT = process.env.PORT || 3002;


var app = express();

var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(PORT, function(){
	console.log("server listening");
});

