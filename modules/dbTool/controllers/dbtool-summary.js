'use strict';

angular.module('dbtools')
	.controller('SummaryController',['$scope', '$http', '$timeout', '$stateParams','$nkAuthService', '$nkDataService',
		function($scope, $http, $timeout, $stateParams,$nkAuthService,$nkDataService){

			$scope.restRoutes = [];
			$scope.models = [];
			$scope.recording = false;

			var moveClock = function(){
				if($scope.uptime.secs + 1 === 60){
					$scope.uptime.secs = 0;
					if ($scope.uptime.mins + 1 === 60) {
						$scope.uptime.mins = 0;
						$scope.uptime.hours++;
					} else {
						$scope.uptime.mins++;
					}
				}else{
					$scope.uptime.secs++;
				}
				$timeout(moveClock,1000);	
			};

			$scope.windowHeight = $(window).height() - 40;
			$http.get($scope.apiHost + '/admin/restRoutes')
				.then(function(response){
					$scope.routes = response.data;
				});

			$http.get($scope.apiHost + '/admin/models')
				.then(function(response){
					$scope.models = response.data;
					$scope.modelsCount = {};
					angular.forEach($scope.models, function(value, ind) {
						$http.get($scope.apiHost + '/admin/rest/'+ind+'s/count')
							.then(function(response){
								$scope.modelsCount[ind] = response.data.count;
							});
					});
				});

			$http.get($scope.apiHost + '/admin/config')
				.then(function(response){
					$scope.recording = response.recording;
					$scope.uptime = {};
					$scope.uptime.hours = Math.floor(response.data.uptime/3600);
					$scope.uptime.mins = Math.floor((response.data.uptime % 3600)/60);
					$scope.uptime.secs = Math.floor(response.data.uptime % 60);
					moveClock();
				});

			$scope.startRecording = function(){
				if($scope.apiHost.indexOf('localhost') > -1){
					$http.get($scope.apiHost + '/admin/startRecordingAll')
					.then(function(response){
						$scope.recording = true;
					}, function(err){
					});
				}else{
					$scope.msgs = {error:"You are not running this on localhost"};
					$timeout(function(){$scope.msgs = {};},2500);
				}
			};

			$scope.stopRecording = function(){
				$http.get($scope.apiHost + '/admin/stopRecordingAll')
				.then(function(response){
					$scope.recording = false;
				}, function(err){
				});
			};

			$scope.republish = function(){
				$scope.republished = false;
				$scope.msgs = {};
				$scope.msgs.loading = "Republishing application.";
				$http.get($scope.apiHost + '/admin/republish')
				.then(function(response){
					$scope.republished = response;
					$scope.msgs = {};
					$scope.msgs.success = "Application republished.";
					$timeout(function(){
						$scope.msgs = {};
					}, 1200);
				}, function(err){
					$scope.msgs = {};
					$scope.msgs.error = err;
				});
			};

			$scope.rebuild = function(){
				$scope.rebuilt = false;
				$scope.msgs = {};
				$scope.msgs.loading = "Rebuilding application pages.";
				$http.get($scope.apiHost + '/admin/rebuild')
				.then(function(response){
					$scope.rebuilt = response;
					$scope.msgs = {};
					$scope.msgs.success = "Pages Rebuilt.";
					$timeout(function(){
						$scope.msgs = {};
					}, 1200);
				}, function(err){
					$scope.msgs = {};
					$scope.msgs.error = err;
				});
			};
		}
	]);