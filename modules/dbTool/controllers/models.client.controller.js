'use strict';

angular.module('dbtools').controller('ModelsCtrl', ['$scope','$http','$stateParams',
	function($scope, $http, $stateParams){
		$scope.modelName = $stateParams.tablename;
		$scope.showJSON = {};
		$scope.displayTable = true;
		$http.get('/admin/models')
			.then(function(response){
				console.log(response);
				$scope.model = response.data[$stateParams.tablename]
			})

		$scope.buildJSON = true;
		$scope.displayJSON = function(){
			
			if($scope.displayTable){
				$scope.displayTable = false;
				if($scope.buildJSON){
					var str = JSON.stringify($scope.model, undefined, 4);
					$scope.jsonDisplayData = str;
					$scope.buildJSON = false;
				}
			}else{
				$scope.displayTable = true;
			}
		}
	}
	
])