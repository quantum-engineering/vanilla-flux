/**
 * server.js
 * @flow
 */

"use strict";

var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var faker = require("faker");

var app = express();


// Generate Fake Users with faker

var users = [];

for (var i = 0; i < 20; i++) {
  users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    id: faker.random.uuid()
  })
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  res.sendFile("public/index.html")
});

app.get("/users", function(req, res) {
  console.info("OK got users");
  res.json(users);
});

var server = app.listen(1337, function() {
  var port = server.address().port;
  console.log('Awesomeness is running on port:', port);
});

module.exports = app;
