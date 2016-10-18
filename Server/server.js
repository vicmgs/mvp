var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var session = require('express-session');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1107",
  database: "racer"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

app.use(bodyParser());
app.use(express.static(__dirname + '/../client/public'));
console.log(__dirname);

app.use(session({
    secret: '1234-2345-3456789',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res){
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    res.sendFile('/Users/VictorMu/Desktop/2016-09-mvp/Client/index.html');
  }
});

app.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/login');
});

app.get('/login', function(req, res){
  res.sendFile('/Users/VictorMu/Desktop/2016-09-mvp/Client/login.html');
});

app.post('/login', function(req, res){
  con.query('SELECT * FROM users WHERE username= ?', req.body.username, function(err,data){
    if (err) {
      res.redirect('/login');
    } else {
      if (data[0] === undefined) {
        res.redirect('/login');
      } else {
        if (data[0].password === req.body.password) {
          req.session.user = req.body.username;
          res.redirect('/');
        }
      }
    }
  });
});

app.post('/signup', function(req, res){
  var user = {username: req.body.username, password: req.body.password};
  if (req.body.password != req.body.confirm) {
    res.redirect('/signup');
  } else {
    con.query('INSERT INTO users SET ?', user, function(err,data){
      if(err) {
        res.redirect('/signup');
      } else {
        req.session.user = req.body.username;
        res.redirect('/');
      }
    });
  }
});

app.get('/signup', function(req, res){
  res.sendFile('/Users/VictorMu/Desktop/2016-09-mvp/Client/signup.html');
});

app.get('/f1', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
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
  }
});

app.get('/wtcc', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    request('http://www.fiawtcc.com/standings/', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('#section-drivers-championship-2016 h3').after('<h1>WTCC 2016 Driver Standings</h1>');
        $('#section-drivers-championship-2016 h3').remove();
        var table = $('#section-drivers-championship-2016').html();

        res.status(200).send(table);
      }
    });
  }
});

app.get('/wrc', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    request('http://www.wrc.com/en/wrc/results/championship/drivers/page/193-290---.html', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.data h5').after('<h1>WRC 2016 Driver Standings</h1>');
        $('.data h5').remove();
        var table = $('.data').html();

        res.status(200).send(table);
      }
    });
  }
});

app.get('/motogp', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
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
  }
});

app.get('/wsbk', function (req, res) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    request('http://www.worldsbk.com/en/results%20statistics', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('#world_standing-sbk table').before('<h1>WSBK 2016 Rider Standings</h1>');
        var table = $('#world_standing-sbk').html();

        res.status(200).send(table);
      }
    });
  }
});

app.get('/f1news', function (req, res) {

  request('https://www.google.com/search?q=f1+news&tbm=nws', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      res.status(200).send(body);
    }
  });
});

app.get('/wtccnews', function (req, res) {

  request('https://www.google.com/search?q=wtcc+news&tbm=nws', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      res.status(200).send(body);
    }
  });
});

app.get('/wrcnews', function (req, res) {

  request('https://www.google.com/search?q=wrc+news&tbm=nws', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      res.status(200).send(body);
    }
  });
});

app.get('/motogpnews', function (req, res) {

  request('https://www.google.com/search?q=motogp+news&tbm=nws', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      res.status(200).send(body);
    }
  });
});

app.get('/wsbknews', function (req, res) {

  request('https://www.google.com/search?q=wsbk+news&tbm=nws', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      res.status(200).send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
