var express = require('express');
var app = express();
var request = require('request');

app.get('/f1', function (req, res) {
  request('https://www.formula1.com/en/results.html/2016/drivers.html', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    }
  });
});

app.get('/motogp', function (req, res) {
  request('http://www.motogp.com/en/Results+Statistics/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
