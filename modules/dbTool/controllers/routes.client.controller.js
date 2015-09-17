'use strict';

angular.module('dbtools').controller('RoutesCtrl', ['$scope','$stateParams','$http', 
	function($scope, $stateParams, $http){
		$scope.routeName = $stateParams.tablename;
		$scope.routes;
		$http.get('/admin/restRoutes')
		.then(function(response){
			console.log(response);
			$scope.routes = response.data[$scope.routeName.slice(0, $scope.routeName.length -1 )].functions;
		})
	}
]);