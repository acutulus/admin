'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, item){
		
		$scope.editData = item
		var newItem = {};

		$scope.submit = function(){
			for(var x in $scope.editData){
				if($scope.editData[x].hasOwnProperty('data')){
					
					newItem[$scope.editData[x].name] = $scope.editData[x].data;
					
				}
			}
			$modalInstance.close(newItem);		
		};

		$scope.cancel = function () {
      		$modalInstance.dismiss('cancel');
    	};
	})