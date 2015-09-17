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
				$scope.projectTitle = $location.host().split('.')[0] || $location.host();

				/*Grab All the Database information in the projects Database*/
				$scope.currentDatabase = [];
				DataService.getQuery('admin/models')
				.then(function(data){

					for(var x in data){
						$scope.currentDatabase.push(x + 's');
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














