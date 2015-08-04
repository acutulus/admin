'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, passData){
	
		$scope.passData = passData;
		$scope.newItem = {};

		$scope.emptyFieldError

		$scope.submit = function(){
			/*for(var x in $scope.passData){
				if($scope.passData[x].hasOwnProperty('data')){
					newItem[$scope.passData[x].name] = $scope.passData[x].data;
				}
			}*/
			$modalInstance.close($scope.newItem);
		};

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
