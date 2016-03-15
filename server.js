var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    parse =require("./lib/parse"),
    random = require("./lib/random"),
    bodyParser = require("body-parser"),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose =require('passport-local-mongoose'),
    ShortWeb = require('./models/shortweb'),
    User = require("./models/user");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://yuanlin:1QAZ2wsx@ds017258.mlab.com:17258/shortwebs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//main page

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


//handle user register service
app.post("/register",function(req,res){
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.redirect("#/login");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/");
    });
  });

});

//handle login request
app.post('/login',
  passport.authenticate('local'),function(req,res){
    var response={
      isvalid:true
    };
    res.json(response);
  }
);


//handle logout request
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");

});

//handle user login service
app.listen("3000", function(){
   console.log("The Shorten URL Server Has Started!");
});
