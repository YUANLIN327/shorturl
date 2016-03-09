var mongoose = require('mongoose');
// var ShortWeb = require('../models/shortweb');
mongoose.createConnection("mongodb://localhost/shorturl");
module.exports = {
  generateId:function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
       text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  checkDuplicate:function(str){
    console.log("i'm");
    ShortWeb.findOne({shorturl:str},function(err,found){
      if(err){
        console.log(err);
      }else{
        if(found){
          return true;

        }else{
          return false;
        }
      }
    });
  },

  generateValidateId:function(){
    var output;
    do{
      output=this.generateId();
    }while(this.checkDuplicate(output));
    return output;
  }

};
