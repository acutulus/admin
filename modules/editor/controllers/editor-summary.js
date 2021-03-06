'use strict';

angular.module('editor')
	.controller('EditorSummaryController',['$scope', '$nkDataService', '$http', '$timeout', '$stateParams',
		function($scope, $nkDataService, $http, $timeout, $stateParams){

			$scope.show = {}; //control what can be seen currently
			$scope.show.routes = {};
			$scope.show.models = {};
			$scope.show.uptime = {};
			$scope.show.rebuild = {};
			$scope.show.republish = {};
			$scope.show.models.properties = {};
			$scope.show.models.schemas = {};
			$scope.restRoutes = [];
			$scope.schemas = [];
		

			var moveClock = function(){
				if($scope.uptime.secs + 1 === 60){
					$scope.uptime.secs = 0;
					$scope.uptime.mins++;
				}else{
					$scope.uptime.secs++;
				}
				$timeout(moveClock,1000);	
			}

			if($stateParams.summaryPage){
				$scope.show[$stateParams.summaryPage].show = true;
			}

			$scope.windowHeight = $(window).height() - 40;
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
					console.log(response);
						$scope.schemas = response.data;
				})

			$http.get('/admin/uptime')
				.then(function(response){
					$scope.uptime = {}
					$scope.uptime.hours = Math.floor(response.data.uptime/3600);
					$scope.uptime.mins = Math.floor((response.data.uptime % 3600)/60);
					$scope.uptime.secs = Math.floor(response.data.uptime % 60);
					moveClock();
				})

			/*$scope.swapCurrentView = function(view){
				if($scope.show[view].show){
					$scope.show[view].show = false;
				}else{
					for(var x in $scope.show){
						$scope.show[x].show = false;
					}
					$scope.show[view].show = true;
				}
				if(view === 'uptime'){
					$http.get('/admin/uptime')
					.then(function(response){
						$scope.uptime.hours = Math.floor(response.data.uptime/3600);
						$scope.uptime.mins = Math.floor((response.data.uptime % 3600)/60);
						$scope.uptime.secs = Math.floor(response.data.uptime % 60);	
						moveClock();
					})	
				}
			}*/
			$scope.resetModelShow = function(){
				for(var x in $scope.show.models){
					if(x === 'show'){

					}else{
						$scope.show.models[x] = false;
					}
				}
			}

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