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
		$http.get('/admin/restRoutes')
		.then(function(response){
			console.log(response);
			$scope.routes = response.data[$scope.routeName].functions;
		})
	}
]);