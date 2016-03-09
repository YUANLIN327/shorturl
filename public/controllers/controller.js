(function() {

    var app = angular.module('myApp', []);

    app.controller("AppCtrl",['$scope', '$http', function($scope, $http){
      $scope.generate = function(){

        var body = JSON.stringify({
          originalUrl: $scope.originalUrl
        });

        console.log($scope.originWeb);
        $http.post("/",body).success(function(response){
          console.log("I got the data I requested");
          $scope.shortUrl = response.shortUrl;
        });
      };


    }]);

})();
 
