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

      $('.resultsarchive-wrapper h1').text('F1 2016 Driver Standings');
      $('.resultsarchive-wrapper a').each(function(){
         $(this).replaceWith($(this).text())
      })
      var table = $('.resultsarchive-wrapper').html()

      res.status(200).send(table);
    }
  });
});

app.get('/wtcc', function (req, res) {
  request('http://www.fiawtcc.com/standings/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('#section-drivers-championship-2016 h3').after('<h1>WTCC 2016 Driver Standings</h1>');
      $('#section-drivers-championship-2016 h3').remove();
      var table = $('#section-drivers-championship-2016').html();

      res.status(200).send(table);
    }
  });
});

app.get('/wrc', function (req, res) {
  request('http://www.wrc.com/en/wrc/results/championship/drivers/page/193-290---.html', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('.data h5').after('<h1>WRC 2016 Driver Standings</h1>');
      $('.data h5').remove();
      var table = $('.data').html();

      res.status(200).send(table);
    }
  });
});

app.get('/motogp', function (req, res) {
  request('http://www.motogp.com/en/Results+Statistics/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('#main_result a').each(function(){
         $(this).replaceWith($(this).text())
      });
      $('#main_result a').text('MotoGP 2016 Rider Standings');
      var table = $('#main_result').html();

      res.status(200).send(table);
    }
  });
});

app.get('/wsbk', function (req, res) {
  request('http://www.worldsbk.com/en/results%20statistics', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('#world_standing-sbk table').before('<h1>WSBK 2016 Rider Standings</h1>');
      var table = $('#world_standing-sbk').html();

      res.status(200).send(table);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
