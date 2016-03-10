var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    parse =require("./lib/parse"),
    random = require("./lib/random"),
    bodyParser = require("body-parser"),
    ShortWeb = require('./models/shortweb');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://yuanlin:1QAZ2wsx@ds017258.mlab.com:17258/shortwebs");

//redirect users
app.get("/:id", function(req, res) {

  ShortWeb.findOne({
    shortUrl: req.params.id
  }, function(err, foundWeb) {
    if (err) {
      console.log(err);
    } else {
      if (foundWeb) {
        res.redirect("http://" + foundWeb.originWebsite);
      } else {
        res.redirect("/");
      }

    }
  });

});

//handle post request
app.post("/",function(req,res){
  var origin = parse.parseUrl(req.body.originalUrl);
  console.log(req.body.originalUrl);
  ShortWeb.findOne({
    'originWebsite': origin
  }, function(err, website) {
    if (err) {
      console.log(err);
    } else {
      //if found
      if (website) {
        console.log(website);
        res.json(website);
      }
      //if not found
      else {

        //create a new shortweb
        var newShortWeb = {
          originWebsite: origin,
          shortUrl: random.generateValidateId()
        };
        ShortWeb.create(newShortWeb, function(err, newlyCreatedWeb) {
          if (err) {
            console.log(err);
          } else {
            console.log(newlyCreatedWeb);
            res.json(newlyCreatedWeb);
          }
        });
      }
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Shorten URL Server Has Started!");
});
