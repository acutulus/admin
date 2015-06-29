'use strict';

angular.module('dbtools')
.controller('NewDatabaseCtrl',['$scope', 'DataService',
	function($scope, DataService){

		$scope.newDb = {};

		$scope.submit = function(db){
			DataService.add('projects', db)
		}
	}
]);