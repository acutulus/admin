'use strict'
angular.module('dbtools').controller('QueryModalCtrl',
		function($scope, $modalInstance, field){
		$scope.field = field;
		$scope.query = {};


		$scope.buildQuery = function(){
			var query = {};

			if($scope.query.hasOwnProperty('modifier') && $scope.query.hasOwnProperty('value')){
				if($scope.query.modifier === "null"){
					query[field] = $scope.query.value 
				}else{
					query[field] = {};
					query[field][$scope.query.modifier] = $scope.query.value;
				}
			}else {
				query[$scope.field] = $scope.query.value;
			}
			
			query = JSON.stringify(query);
			console.log(query)
			$modalInstance.close(query);
		}
	})