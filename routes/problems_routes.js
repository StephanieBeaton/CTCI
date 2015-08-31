'use strict';
//var Note = require('../models/Note');
var bodyparser = require('body-parser');
var fs = require('fs');
//var Problem = require('../models/Problem');

function Problem(newProblem) {
  this.status = newProblem.status;
  this.description = newProblem.description;
  this.hints = newProblem.hints;
  this.links = newProblem.links;
};


module.exports = function(app) {

  console.log("inside problems_routes.js");

  app.use(bodyparser.json());


  app.get('/problems', function(req, res) {


    var filename = './data/problems.json';
    var fileContent1 = fs.readFileSync(filename, 'utf8');

    console.log("fileContent1");
    console.log(fileContent1);


    var problemsObj = {};

    if (fileContent1 && fileContent1 !== '') {
      problemsObj = JSON.parse(fileContent1);
    } else {
      fileContent1 = "";
    }

    console.log("problemsObj");
    console.log(problemsObj);

    res.json(problemsObj);

  });


  app.post('/problems', function(req, res) {

      // fix to concatenate onto JSON file here

      var inputObj = {};

      console.log("req.body");
      console.log(req.body);


      var filename = './data/problems.json';
      var fileContent1 = fs.readFileSync(filename, 'utf8');

      console.log("fileContent1");
      console.log(fileContent1);


      var problemsObj = {};

      if (fileContent1 && fileContent1 !== '') {
        problemsObj = JSON.parse(fileContent1);
      } else {
        fileContent1 = "";
      }

      console.log("problemsObj");
      console.log(problemsObj);

      inputObj = new Problem(req.body);

      console.log("inputObj");
      console.log(inputObj);


      // calculate "uniqueId" value
      var max = 0;
      for (var i = 0; i < problemsObj.problems.length; i++) {
        var uniqueId = Number(problemsObj.problems[i].uniqueId);

        if (uniqueId  && uniqueId > max) {
          max = uniqueId;
        }
      }
      max++;
      inputObj.uniqueId = max.toString();

      problemsObj.problems.push(inputObj);

      console.log("problemsObj after push");
      console.log(problemsObj);


      fs.writeFileSync(filename, JSON.stringify(problemsObj));

      res.json(inputObj);


  });


  app.put('/problems/:id', function(req, res) {

      // find the problem in the JSON file and update it.

      var inputObj = {};

      console.log("req.body");
      console.log(req.body);

      console.log("req.params.id");
      console.log(req.params.id);

      var filename = './data/problems.json';
      var fileContent1 = fs.readFileSync(filename, 'utf8');

      console.log("fileContent1");
      console.log(fileContent1);


      var problemsObj = {};

      if (fileContent1 && fileContent1 !== '') {
        problemsObj = JSON.parse(fileContent1);
      } else {
        fileContent1 = "";
      }

      //console.log("problemsObj");
      //console.log(problemsObj);

      // find the original problem in the JSON File
      for (var i = 0; i < problemsObj.problems.length; i++) {
        var uniqueId = Number(problemsObj.problems[i].uniqueId);
        console.log("uniqueId");
        console.log(uniqueId);
        console.log("req.params.id");
        console.log(req.params.id);

        if (uniqueId  == Number(req.params.id)) {
          console.log("found match");
          var problem = problemsObj.problems[i];
          problem.status = req.body.status;
          problem.description = req.body.description;
          problem.hints = req.body.hints;
          problem.links = req.body.links;
        }
      }


      console.log("problemsObj after update");
      console.log(problemsObj);


      fs.writeFileSync(filename, JSON.stringify(problemsObj));

      res.json(req.body);

  });

app.delete('/problems/:id', function(req, res) {

      // find the problem in the JSON file and update it.

      var inputObj = {};

      console.log("req.body");
      console.log(req.body);

      inputObj = req.body;
      inputObj.uniqueId = req.params.id;

      console.log("req.params.id");
      console.log(req.params.id);

      var filename = './data/problems.json';
      var fileContent1 = fs.readFileSync(filename, 'utf8');

      //console.log("fileContent1");
      //console.log(fileContent1);


      var problemsObj = {};

      if (fileContent1 && fileContent1 !== '') {
        problemsObj = JSON.parse(fileContent1);
      } else {
        fileContent1 = "";
      }

      //console.log("problemsObj");
      //console.log(problemsObj);

      console.log("inputObj");
      console.log(inputObj);

      var index = null;
      // var index = problemsObj.problems.indexOf(inputObj);

      // console.log("index = " + index);

      // console.log("problemsObj.problems[0].hints[0]");
      // console.log(problemsObj.problems[0].hints[0]);

      // problemsObj.problems.splice(index, 1);

      // find the original problem in the JSON File
      for (var i = 0; i < problemsObj.problems.length; i++) {
        var uniqueId = Number(problemsObj.problems[i].uniqueId);
        console.log("uniqueId");
        console.log(uniqueId);
        console.log("req.params.id");
        console.log(req.params.id);

        if (uniqueId  == Number(req.params.id)) {
          console.log("found match");
          index = i;
        }
      }

      if (index) {
        problemsObj.problems.splice(index, 1);

        console.log("problemsObj after delete");
        console.log(problemsObj);


        fs.writeFileSync(filename, JSON.stringify(problemsObj));
      }

      res.json(req.body);

  });
};
