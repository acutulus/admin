'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, schema){
	
		$scope.schema = schema;
		$scope.item = {};
		
		$scope.submit = function(){
			
			$modalInstance.close($scope.newItem);
		};

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
