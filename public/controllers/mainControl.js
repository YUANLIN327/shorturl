app.controller("mainCtrl", ['$scope', '$http', function($scope, $http) {

  //variable keeps track of whether user submitted request
  $scope.submitted = false;

  // add a generate function
  $scope.generate = function($event) {

    //validate user input using regular expression
    var myRegExp = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;


    // as;kd;lasd
    if (myRegExp.test($scope.originalUrl)) {
      $scope.submitted = true;
      var body = JSON.stringify({
        originalUrl: $scope.originalUrl
      });

      console.log($scope.originWeb);
      $http.post("/", body).success(function(response) {
        console.log("I got the data I requested");
        $scope.shortUrl = "http://thawing-depths-22622.herokuapp.com/" + response.shortUrl;
      });
    } else {
      alert("not a valid url");
    }


  };

  //add shorturl to clipboard
  $scope.addToClipboard = function() {
    var copyTextarea = document.querySelector('.js-copytextarea');
    copyTextarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };

  //go back function
  $scope.goBack = function() {
    $scope.submitted = false;

    setTimeout(function() {
      var inputTextarea = document.querySelector('#userinput');
      inputTextarea.select();
      inputTextarea.focus();
      console.log("where am I");
    }, 0);

  };



}]);
