'use strict';

angular.module('dbtools')
.controller('DBToolsController', ['$scope', '$stateParams', '$location', '$http','$timeout','$modal', '$nkAuthService',
	function($scope, $stateParams, $location, $http, $timeout, $modal, $nkAuthService){
		$scope.user = $nkAuthService.getUser();
		if((typeof $scope.user === 'undefined' || !$scope.user.admin) && $location.$$path !== '/dbtools/signin'){
			alert('You need to be a logged in admin');
			location.href = '/admin/dbtools/signin';
		}else{
			$scope.projectTitle = $location.host().split('.')[0] || $location.host();
			/*Grab All the Database information in the projects Database*/
			$scope.models = [];
			$scope.routes = [];
			$http.get('/admin/models')
			.then(function(response){
				$scope.databaseSchemas = response.data;
				for(var x in response.data){
					$scope.models.push(x);
				}
				$scope.$broadcast('models', true);
			});	
			$http.get('/admin/restRoutes')
			.then(function(response){
				for(var x in response.data){
					$scope.routes.push(x);
				}
			});

			if($stateParams.hasOwnProperty('table')){
				$scope.currentTable = $stateParams.tablel
			}
			
			$scope.selectDb = function(db){
				$scope.currentDatabase = db;
			};
			$scope.selectTable = function(table){
				$scope.currentTable = table;
			};
			$scope.signout = function() {
				$nkAuthService.logout();
				location.href = '/';
			};
		}
	}
]);














