'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, passData){
		$scope.passData = passData;
		$scope.newItem = {};
		console.log('PASSDATA', passData);
		$scope.submit = function(){
			$modalInstance.close($scope.newItem);
		}
	})