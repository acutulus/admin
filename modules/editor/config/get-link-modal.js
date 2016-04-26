'use strict';

angular.module('editor')
	.controller('GetLinkModalCtrl', function($scope, $modalInstance){

	 	$scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

	    $scope.submit = function(){
	
	    	$modalInstance.close($scope.url)
	    	
	    }

	})