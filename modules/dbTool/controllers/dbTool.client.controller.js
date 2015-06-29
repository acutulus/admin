'use strict';

angular.module('dbtools')
.controller('DBToolsController', ['$scope', '$stateParams', '$location', 'Authentication', '$http','$timeout','$modal','DataService', 
	function($scope, $stateParams, $location, Authentication, $http, $timeout, $modal, DataService){
		
		$scope.authentication = Authentication	
		/*Grab All the Database information in the projects Database*/
		$scope.databases;
		$scope.currentDatabase;
		if($scope.authentication.user){
			console.log('got projects');
			DataService.getQuery('projects').then(function(data){
				$scope.databases = data;
				if($stateParams.database){
					for(var x in data){
						if(data[x]._id === $stateParams.database){
							$scope.currentDatabase = data[x];
							checkTable();
						}
					}
				}
			})
		}
		var checkTable = function(){
			for(var x in $scope.currentDatabase.schemas){
				if($stateParams.table === $scope.currentDatabase.schemas[x].name){
					console.log($scope.currentDatabase.schemas[x].name)
					$scope.currentTable = $scope.currentDatabase.schemas[x];
				}
			}
		}
		$scope.selectDb = function(db){
			$scope.currentDatabase = db;
		}
		$scope.selectTable = function(table){
			$scope.currentTable = table;
		}
	}
]);














