/*NO LONGER USED

'use strict';

angular.module('editor')
	.controller('EditorSidebarController', ['$scope','$stateParams', 'DataService','$location',
		function($scope, $stateParams, DataService, $location){

			if($stateParams.tablename){
				$scope.currentTable = $stateParams.tablename + 's';
			}

			$scope.sidebarTablesView = [];
			$scope.sidebarCollectionView
			$scope.editableProperties = [];
			//create sidebar headers
			DataService.getQuery('admin/models')
				.then(function(data){
					for(var x in data){
						if(data[x].properties){
							if(data[x].properties.hasOwnProperty('editor')){
								//every model will get to editor except these specified editor:false ones
								if(!data[x].properties.editor){
									//editor is false
								}else{
									$scope.sidebarTablesView.push(x);								
								}
							}else{
								$scope.sidebarTablesView.push(x);							
							}
						}else{
							$scope.sidebarTablesView.push(x);						
						}
					}
			});

			$scope.selectTable = function(table){
				$scope.currentTable = table + 's';
			}			
		}
	])*/