'use strict';

angular.module('editor')
	.controller('EditorController', 
	['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 'Authentication',
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService, Authentication){
		$scope.authentication = Authentication;
		if($scope.authentication.user){
			if($scope.authentication.user === 'undefined' || !$scope.authentication.user.admin){
				alert('You need to be a logged in admin');
				$location.path('/admin/#!/signin')
			}else{
				/*Grab All the Database information in the projects Database*/
				$scope.currentDatabase = [];
				$scope.editorDatabase = [];
				DataService.getQuery('admin/models')
				.then(function(data){
					for(var x in data){
						$scope.currentDatabase.push(x + 's');
						if(data[x].properties){
							if(data[x].propertes.hasOwnProperty('editor')){
								$scope.editorDatabase.push(data)
							}
						}
					}
				});	
				if($stateParams.hasOwnProperty('table')){
					$scope.currentTable = $stateParams.table
				}
				
				
				$scope.selectDb = function(db){
					$scope.currentDatabase = db;
				}
				$scope.selectTable = function(table){
					$scope.currentTable = table;
				}


			}
		}
	}
]);