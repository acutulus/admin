'use strict';

angular.module('editor')
	.controller('EditorSummaryController',['$scope', 'DataService', '$http',
		function($scope, DataService, $http){

			$scope.show = {};
			$scope.show.routes = {};
			$scope.show.models = {};
			$scope.show.models.properties = {};
			$scope.show.models.schema = {};
			$scope.restRoutes = [];
			$scope.schemas = [];
			$scope.models;
			$http.get('/admin/restRoutes')
				.then(function(response){
					for(var x in response.data){
						var modelRoutes = {};
						for(var y in response.data[x].functions){
							modelRoutes[y] = response.data[x].functions[y].restRoute;
						}
						$scope.restRoutes.push({name:x, data:modelRoutes});
					}
				})

			$http.get('/admin/models')
				.then(function(response){
					for(var x in response.data){
						$scope.schemas.push({name:x, data:response.data[x]});
					
					}
					console.log($scope.schemas);
				})
		}
	]) 