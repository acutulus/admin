angular.module('dbtools')
	.controller('GetImageModalCtrl', function($scope, $modalInstance){
	 	$scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

	})