'use strict';


angular.module('dbtools').controller('PopulateModalCtrl',
	function($scope, $modalInstance, field){
		$scope.table = field;
		$scope.select= {};

		$scope.submit = function(){
			$modalInstance.close($scope.select.field);
		}
	})