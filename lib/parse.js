module.exports = {
  parseUrl:function(str){
    return str.replace(/^https?\:\/\/(.+)/,"$1");
  }
};
