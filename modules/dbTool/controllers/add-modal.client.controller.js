'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, passData){
	
		$scope.passData = passData;
		var newItem = {};

		$scope.emptyFieldError

		$scope.submit = function(){
			for(var x in $scope.passData){
				if($scope.passData[x].hasOwnProperty('data')){
					newItem[$scope.passData[x].name] = $scope.passData[x].data;
				}
			}
			$modalInstance.close(newItem);
		};

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
