'use strict';

angular.module('dbtools').controller('TestingCtrl', ['$scope', '$http', "$timeout",
	function($scope, $http, $timeout){
	
	$scope.loading = {loading : true};

  $http.get($scope.apiHost + '/admin/restRoutes')
  .then(function(response){
    controllerDisplayObject(response.data);
    checkLoaded();
  }, function(err){
  	console.error(err);
  	$scope.loading = {error:err};
  });
	
  /*
    Takes controller object from server and adds to scope -controller array, route object, tests object
    e.g.  controllers = ["user","business"], 
          routes = { user:['get.user','delete.user'], business:['get.business'] }
          tests = {'get.user':[{test1},{test2}], 'delete.user':[{test1},{test2}]}
  */
  var dontDisplayRoutes = ['auth','email','device','graphql','oauth','pushNotification','trackedEvent','user','userEvent','userToken','unitTest'];
  function controllerDisplayObject(data){
    var controllers = [];
    var routes = {};
    for(var x in data){
      if(dontDisplayRoutes.indexOf(x) > -1){
        //dont display these routes
      }else{
        controllers.push({name:x});
        for(var k in data[x].functions){
          if(routes[x] && typeof routes[x] === 'object'){
            routes[x].routes.push({name:k});
          }else{
            routes[x] = {name:x,routes:[{name:k}]};
          }
        }
      }
    }
    $scope.controllers = controllers;
    $scope.routes = routes;
  }

  $scope.getTestsForRoute = function(route){
    if(route.hasOwnProperty('tests')){
      //tests already on route object
      $scope.activeRoute = route.name;
      $scope.activeTests = route.tests;
      return;
    }else{
      $scope.activeRoute = route.name;
      //no tests get from server
      $http.get($scope.apiHost + '/api/v1/unitTests/testsForRoute?route=' + route.name)
      .then(function(response){
        route.tests = response.data;
        $scope.activeTests = route.tests;
      }, function(err){
        console.error(err);
      });
    }
  }

  $scope.runTest = function(test){
    $http.get($scope.apiHost + "/api/v1/unitTests/" + test._id + "/runTest")
    .then(function(success){
      test.testResults = success;
      test.displayResults = true;
      $timeout(function(){
        test.displayResults = false;
      }, 5000);
    }, function(err){
      console.error(err);
    });
  }

	function checkLoaded(){
		if($scope.controllers){
			$scope.loading = {completed:true};
		}
	}
  }
]);