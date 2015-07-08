'use strict';

angular.module('dbtools')
.controller('DBToolsController', ['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 'Authentication',
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService, Authentication){
		$scope.authentication = Authentication;
		if($scope.authentication.user){
			if($scope.authentication.user === 'undefined' || !$scope.authentication.user.admin){
				alert('You need to be a logged in admin');
				$location.path('/admin/#!/signin')
			}else{
				/*Grab All the Database information in the projects Database*/
				$scope.currentDatabase = [];
				DataService.getQuery('admin/models')
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
		}
	}
]);














