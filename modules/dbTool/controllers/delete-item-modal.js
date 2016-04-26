'use strict';

angular.module('dbtools').controller('DeleteModalCtrl', 
	function($scope, $modalInstance){
		
		$scope.delete = function(){
			$modalInstance.close('delete');
		}

	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	})
