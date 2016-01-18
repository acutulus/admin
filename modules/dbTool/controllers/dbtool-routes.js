'use strict';

angular.module('dbtools').controller('RoutesCtrl', ['$scope','$stateParams','$http', '$nkAuthService', 
	function($scope, $stateParams, $http, $nkAuthService){
		$scope.user = $nkAuthService.getUser();
		if(!$scope.user || !$scope.user.admin){
			alert("No permissions");
			location.href = "/admin/dbtools/signin";
		}

		$scope.routeName = $stateParams.tablename;
		$scope.routes;
		$scope.routeTesting = {};

		$http.get('/admin/restRoutes')
		.then(function(response){
			console.log(response);
			$scope.routes = response.data[$scope.routeName].functions;
		});

		$scope.routeTestable = function(key){
			if(typeof key === 'string'){		
				if(key.slice(0,3) === "get"){
					return true;
				}
				if(key.slice(0,4) === "read"){
					return true;
				}
				if(key.slice(0,5) === "query"){
					return true;
				}
			}
			return false;
		}

		$scope.testRoute = function(key, val){
			$scope.routeTesting[key] = {testing:true, loading:true};
			$http.get(val)
			.then(function(data){
				$scope.routeTesting[key].data = data;
				console.log(data);
				$scope.routeTesting[key].loading = false;
			})
		}
	}
]);