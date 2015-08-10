'use strict';

angular.module('dbtools').controller('ModalCtrl', 
	function($scope, $modalInstance, schema, item, title){
	
		$scope.schema = schema;
		$scope.item = item;
		$scope.title = title;

		$scope.submit = function(){
			$modalInstance.close($scope.item);
		};

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	});
