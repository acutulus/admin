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
							for(var y in data[x].schema){
								if(data[x].schema[y].hasOwnProperty('editor')){
									var temp = {};
									temp.name = y;
									temp.data = data[x].schema[y];
									$scope.editableProperties.push(temp);
								}
							}
						}
					}
				});			
		}
	])