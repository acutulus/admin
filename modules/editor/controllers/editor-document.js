'use strict';

angular.module('editor')
	.controller('EditorDocumentController', ['$scope','$nkDataService','$stateParams','$location',
		function($scope, $nkDataService,$stateParams, $location){

			$scope.tablename = $stateParams.tablename + 's';
			$scope.documentId = $stateParams.documentId;
			$scope.windowHeight = (window.innerHeight - 100) + 'px';
			$scope.back = function(){
				$location.path('/editor/tables/' + $stateParams.tablename);
			}
			if($scope.documentId === 'new'){
				$scope.documentData = {};
			}else{
				$nkDataService.get('admin/rest/' + $scope.tablename, $scope.documentId)
					.then(function(data){
						$scope.documentData = data.data;
						console.log($scope.documentData);
					})
			}

			$nkDataService.getQuery('admin/models')
				.then(function(data){
					$scope.schema = data.data[$stateParams.tablename];
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