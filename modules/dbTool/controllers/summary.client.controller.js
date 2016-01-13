'use strict';

angular.module('dbtools')
	.controller('SummaryController',['$scope', '$http', '$timeout', '$stateParams','$nkAuthService', 
		function($scope, $http, $timeout, $stateParams,$nkAuthService){

			$scope.user = $nkAuthService.getUser();
			if(!$scope.user || !$scope.user.admin){
				alert("No permissions");
				location.href = "/admin/signin";
			}
			$scope.restRoutes = [];
			$scope.models = [];
		
			var moveClock = function(){
				if($scope.uptime.secs + 1 === 60){
					$scope.uptime.secs = 0;
					$scope.uptime.mins + 1 === 60 ? ($scope.uptime.mins = 0, $scope.uptime.hours++) : $scope.uptime.mins++;
				}else{
					$scope.uptime.secs++;
				}
				$timeout(moveClock,1000);	
			};

			$scope.windowHeight = $(window).height() - 40;
			$http.get('/admin/restRoutes')
				.then(function(response){
					$scope.routes = response.data;
				});

			$http.get('/admin/models')
				.then(function(response){
					console.log(response);
					$scope.models = response.data;
					$scope.modelsCount = {};
					angular.forEach($scope.models, function(value, ind) {
						$http.get('/admin/rest/'+ind+'s/count')
							.then(function(response){
								$scope.modelsCount[ind] = response.data.count;
							});
					});
				});

			$http.get('/admin/uptime')
				.then(function(response){
					$scope.uptime = {}
					$scope.uptime.hours = Math.floor(response.data.uptime/3600);
					$scope.uptime.mins = Math.floor((response.data.uptime % 3600)/60);
					$scope.uptime.secs = Math.floor(response.data.uptime % 60);
					moveClock();
				});

			$scope.republish = function(){
				$http.get('/admin/republish')
				.then(function(response){
					$scope.republish = response;
				})
			}
			$scope.rebuild = function(){
				$http.get('/admin/rebuild')
				.then(function(response){
					$scope.rebuild = response;
				})
			}
		}
	]) 