'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, item){
		
		$scope.editData = item
		var newItem = {};
		console.log('data bein past', $scope.editData);
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