'use strict';

global.jQuery = require('jquery');
var jquery = require('jquery');
var express = require('express');
var session = require('express-session');
var multer = require('multer');
var upload = multer({dest: "uploads/"});


var app = express();
require('dotenv').load();

var path = process.cwd();

app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist/css'));
app.use('/uploads', express.static(process.cwd() +  '/uploads'));

app.get('/', function(req,res) {
	res.sendFile(path + "/public/index.html");
});

app.post('/uploads', upload.single('fileUpload'), function (req, res, next) {
  var size = req.file.size; 
  var ret = { size: size };
  res.end(JSON.stringify(ret));
})

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});