var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');


app.use('/', express.static('./client'));

app.get('/', function(req, res){
  res.sendFile('client/index.html');
})

app.get('/f1', function (req, res) {
  request('https://www.formula1.com/en/results.html/2016/drivers.html', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var table = $('.resultsarchive-wrapper').html();

      res.status(200).send(table);
    }
  });
});

app.get('/wtcc', function (req, res) {
  request('http://www.fiawtcc.com/standings/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    }
  });
});

app.get('/wrc', function (req, res) {
  request('http://www.wrc.com/en/wrc/results/championship/drivers/page/193-290---.html', function (error, response, body) {
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

app.get('/wsbk', function (req, res) {
  request('http://www.worldsbk.com/en/results%20statistics', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
