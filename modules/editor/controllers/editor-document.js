'use strict';

angular.module('editor')
	.controller('EditorDocumentController', ['$scope','DataService','$stateParams',
		function($scope, DataService,$stateParams){

			$scope.tablename = $stateParams.tablename + 's';
			$scope.documentId = $stateParams.documentId;
			
			DataService.get('admin/rest/' + $scope.tablename, $scope.documentId)
				.then(function(data){
					$scope.documentData = data;
					console.log($scope.documentData);
				})

			DataService.getQuery('admin/models')
				.then(function(data){
					$scope.schema = data[$stateParams.tablename];
					//resolve displayAs field
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

			
		}
	])