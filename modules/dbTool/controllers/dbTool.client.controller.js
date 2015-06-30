'use strict';

angular.module('dbtools')
.controller('DBToolsController', ['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService){
		
		/*Grab All the Database information in the projects Database*/
		$scope.currentDatabase = [];
		DataService.getQuery('admin/schemas')
		.then(function(data){

			for(var x in data){
				$scope.currentDatabase.push(x + 's');
			}
		});	
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














