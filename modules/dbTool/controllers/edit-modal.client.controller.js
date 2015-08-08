'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, item){
		
		$scope.editData = item
		$scope.newItem = {};
		for(var x in $scope.editData){
			if($scope.editData[x].hasOwnProperty('data')){
				$scope.newItem[x] = $scope.editData[x].data;
			}
		}
		$scope.submit = function(){

			$modalInstance.close($scope.newItem);		
		};

		$scope.cancel = function () {
      		$modalInstance.dismiss('cancel');
    	};
	})