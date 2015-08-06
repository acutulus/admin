'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, passData){
	
		$scope.passData = passData;
		$scope.newItem = {};

		$scope.submit = function(){
			
			$modalInstance.close($scope.newItem);
		};

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
