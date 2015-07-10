'use strict';

angular.module('dbtools').controller('EditModalCtrl', 
	function($scope, $modalInstance, item){
		console.log(item);
		$scope.editItem = {}

		for(var x in item){
			if(x === '__v' || x === '_created_at' || x === '_updated_at' || x === '__id'){

			}else{
				$scope.editItem[x] = item[x];
			}
		}


		$scope.submit = function(){
			$modalInstance.close($scope.editItem);
		};
		$scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
	})