'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, passData){
	
		$scope.passData = passData;
		var newItem = {};

		$scope.emptyFieldError

		$scope.submit = function(){
			for(var x in $scope.passData){
				if($scope.passData[x].hasOwnProperty('data')){
					console.log(x,$scope.passData[x])
					if(typeof $scope.passData[x].data === $scope.passData[x].type.toLowerCase() ||
						$scope.passData[x].type.indexOf(":") > -1 || $scope.passData[x].type === 'html'){

						newItem[$scope.passData[x].name] = $scope.passData[x].data;
					}
				}
			}
			console.log(newItem)
			$modalInstance.close(newItem);
		};

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
