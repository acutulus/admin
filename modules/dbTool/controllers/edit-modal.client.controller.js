'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, item){
		
		$scope.editItem = {};
		$scope.editSchema = item.schema;
		
		for(var x in item.schema){
			$scope.editItem[x] = ''
			if(x in item.data){
				$scope.editItem[x] = item.data[x];
			}
		}


		$scope.submit = function(){
			$modalInstance.close($scope.editItem);
		};
		$scope.cancel = function () {
      		$modalInstance.dismiss('cancel');
    	};
	})