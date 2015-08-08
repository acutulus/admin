'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, schema, item){
		
		$scope.schema = schema
		$scope.item = item;

		$scope.submit = function(){

			$modalInstance.close($scope.newItem);		
		};

		$scope.cancel = function () {
      		$modalInstance.dismiss('cancel');
    	};
	})