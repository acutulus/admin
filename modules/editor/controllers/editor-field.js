'use strict';

angular.module('editor')
	.controller('EditorFieldController', ['$scope','DataService', '$stateParams',
		function($scope, DataService, $stateParams){

			$scope.schemas;
			$scope.tableData;
			$scope.tableDisplayKey;
			$scope.documentData = false;
			$scope.currentTable = $stateParams.table;
			$scope.currentDocument = $stateParams.document
			//get data for table
			DataService.getQuery('admin/models')
			.then(function(schemas){
				$scope.schema = schemas[$stateParams.table];
				$scope.tableDisplayKey = $scope.schema.properties.displayAs;
				console.log(schemas);
				if($stateParams.document === 'default'){
					//get document info
					DataService.getQuery('admin/rest/' + $scope.currentTable + 's')
					.then(function(data){
						$scope.tableData = data;
					})
				}else{
					DataService.get('admin/rest/' + $scope.currentTable + 's', $scope.currentDocument)
					.then(function(data){
						$scope.documentData = data;
					})
				}
			})
		}
	])