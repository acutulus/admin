'use strict';

angular.module('dbtools').controller('ModelsCtrl', ['$scope','$http','$stateParams',
	function($scope, $http, $stateParams){
		$scope.modelName = $stateParams.tablename;

		$http.get('/admin/models')
			.then(function(response){
				console.log(response);
					$scope.schema = response.data[$stateParams.tablename.slice(0, $stateParams.tablename.length - 1)];
			})

	}
])