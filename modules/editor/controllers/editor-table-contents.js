'use strict';

angular.module('editor')
	.controller('EditorTableContentsController', ['$scope','DataService', '$stateParams',
		function($scope, DataService, $stateParams){

			$scope.schemas;
			$scope.tableData;
			$scope.tableDisplayKey;
			$scope.documentData = false;
			$scope.currentTable = $stateParams.tablename;
			$scope.currentDocument = $stateParams.document
			//get data for table
			DataService.getQuery('admin/models')
			.then(function(schemas){

				$scope.schema = schemas[$stateParams.tablename];

				//resolve how to display tables with no displayAs property
				console.log(schemas[$stateParams.tablename]);
				if($scope.schema.hasOwnProperty('properties')){
					
					if($scope.schema.properties.hasOwnProperty('displayAs')){
					
					}else if($scope.schema.schema.hasOwnProperty('name')){
						$scope.schema.properties.displayAs = 'name';
					}else if($scope.schema.schema.hasOwnProperty('title')){
						$scope.schema.properties.displayAs = 'title';
					}else{
						$scope.schema.properties.displayAs = '_id';
					}

				}else if($scope.schema.schema.hasOwnProperty('name')){
					$scope.schema.properties = {};
					$scope.schema.properties.displayAs = 'name';
				}else if($scope.schema.schema.hasOwnProperty('title')){
					$scope.schema.properties = {};
					$scope.schema.properties.displayAs = 'title'
				}else{
					$scope.schema.properties = {};
					$scope.schema.properties.displayAs = '_id';
				}						
			})

			DataService.getQuery('admin/rest/' + $scope.currentTable + 's')
			.then(function(data){
				$scope.documents = data;
				console.log('documents', $scope.documents);
			})
		}
	])