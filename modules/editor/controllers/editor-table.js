'use strict';

angular.module('editor')
	.controller('EditorTableController', ['$scope','$stateParams', 'DataService',
		function($scope, $stateParams, DataService){

			$scope.currentTable = $stateParams.table;
			//capitalize title
			$scope.currentTable = $scope.currentTable.slice(0,1).toUpperCase() + $scope.currentTable.slice(1) + 's';
			$scope.editableProperties = [];
			DataService.getQuery('admin/models')
				.then(function(data){
					for(var x in data){
						if(x === $stateParams.table){
							var schemaTable = data[x].schema;
							for(var y in schemaTable){
								if(schemaTable[y].hasOwnProperty('editor')){
									if(!schemaTable[y].editor){

									}else{
										$scope.editableProperties.push({name:y,data:schemaTable[y]});
									}
								}else{
										$scope.editableProperties.push({name:y,data:schemaTable[y]});
								}
							}
						}
					}
					console.log($scope.editableProperties)
				});			
		}
	])