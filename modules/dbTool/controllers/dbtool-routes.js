'use strict';

angular.module('dbtools').controller('RoutesCtrl', ['$scope','$stateParams','$http', '$nkAuthService', 
	function($scope, $stateParams, $http, $nkAuthService){

		$scope.routeName = $stateParams.tablename;
		$scope.routes;
		$scope.showTestRoute = {};
		$scope.routeTesting = {};

		$http.get($scope.apiHost + '/admin/restRoutes')
		.then(function(response){
			console.log(response);
			$scope.routes = response.data[$scope.routeName].functions;
		});

		$scope.testRoute = function(key, val){
			$scope.routeTesting[key] = {loading:true};
			if(val.method === "post"){
				console.log($scope.routeTesting[key].postData);
				$http.post(val.restRoute, $scope.routeTesting[key].postData)
				.then(function(data){
					$scope.routeTesting[key].data = data;
					$scope.routeTesting[key].loading = false;
				},function(err){
					$scope.routeTesting[key].data = err;
					$scope.routeTesting[key].loading = false;
				})
			}else if(val.method === "get"){
				$http.get(val.restRoute)
				.then(function(data){
					$scope.routeTesting[key].data = data;
					console.log(data);
					$scope.routeTesting[key].loading = false;
				})
			}
		}
	}
]);