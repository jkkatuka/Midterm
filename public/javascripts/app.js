angular.module('carsale', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.cars = [];
    $scope.addCar = function() {
      var newcar = {make:$scope.make, model:$scope.model, year:$scope.year, miles:$scope.miles, pic:$scope.pic, upvotes:0};
      $scope.make='';
      $scope.model='';
      $scope.year='';
      $scope.miles='';
      $scope.pic='';
      $http.post('/cars', newcar).success(function(data){
        $scope.cars.push(data);
      });
    };

    $scope.upvote = function(car) {
      return $http.put('/cars/' + car._id + '/upvote').success(function(data){
        console.log("upvote worked");
        car.upvotes = data.upvotes;
      });
    };

    $scope.incrementUpvotes = function(car) {
      $scope.upvote(car);
    };

    $scope.delete = function(car) {
      var url = "/cars/" + car._id;
      return $http.delete(url).success(function(response) {
        $scope.getAll();
      });
    };

    $scope.getAll = function() {
      return $http.get('/cars').success(function(data){
        angular.copy(data, $scope.cars);
      });
    };
    $scope.getAll();
  }
  ]);
