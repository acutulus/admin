'use strict';

angular.module('dbtools').controller('AddModalCtrl', 
	function($scope, $modalInstance, schema){
		$scope.newItemSchema = schema.schema;
		$scope.newItem = {};
	})