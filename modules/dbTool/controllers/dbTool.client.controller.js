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
				$scope.models = [];
				$scope.routes = [];
				DataService.getQuery('admin/models')
				.then(function(data){

					for(var x in data){
						$scope.models.push(x);
					}
				});	
				DataService.getQuery('admin/restRoutes')
				.then(function(data){
					for(var x in data){
						$scope.routes.push(x);
					}
				})

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














