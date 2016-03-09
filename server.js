var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    parse =require("./lib/parse"),
    random = require("./lib/random"),
    bodyParser = require("body-Parser"),
    ShortWeb = require('./models/shortweb');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shorturlwebs");

app.listen("2000",function(){
  console.log("server start");
});
