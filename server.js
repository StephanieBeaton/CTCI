'use strict';
var express = require('express');
var mongoose = require('mongoose');
var problemsRoutes = require('./routes/problems_routes');

//  FIX THIS.    Should be problemsapp_development

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/notesapp_development');

var app = express();
app.use(express.static(__dirname + '/build'));

var router = express.Router();

console.log("inside server.js immediately before call problemsRoutes(router)");
problemsRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
