angular.module('carsale', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.cars = [];
    $scope.addCar = function() {
      var newcar = {make:$scope.make, model:$scope.model, year:$scope.year, miles:$scope.miles, Url:$scope.Url, upvotes:0};
      $scope.make='';
      $scope.model='';
      $scope.year='';
      $scope.miles='';
      $scope.Url='';
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
      $http.delete('/cars/' + car._id )
      .success(function(data){
        console.log("delete worked");
      });
      $scope.getAll();
    };

    $scope.getAll = function() {
      return $http.get('/cars').success(function(data){
        angular.copy(data, $scope.cars);
      });
    };
    $scope.getAll();
  }
  ]);
