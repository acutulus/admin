'use strict';

angular.module('dbtools').controller('SignInController', ['$scope', '$http', '$location', '$nkAuthService', '$timeout',
	function($scope, $http, $location, $nkAuthService, $timeout){
		
		$scope.user = $nkAuthService.getUser();
		$scope.host = localStorage.kepsApiPrefix;

		$scope.hosts = [];
		if (localStorage.kepsApiPrefixHosts) {
			$scope.hosts = JSON.parse(localStorage.kepsApiPrefixHosts);
		}

		if (localStorage.kepsApiPrefix) {
			$http.get(localStorage.kepsApiPrefix+'/api/config').then(function(response) {
				$scope.hostConfig = response.data;
				var u = new URL(localStorage.kepsApiPrefix);
				$scope.hostConfigMsg = $scope.hostConfig.name+'@'+u.hostname;
				if (u.hostname === $scope.hostConfig.hostname) {
					$scope.hostConfigMsg += ' PRODUCTION';
				} else {
					$scope.hostConfigMsg += ' DEVELOPMENT';					
				}
			});			
		} else {
			$scope.hostConfigMsg = 'No Host Set';
		}

		if($scope.user && !$scope.user.admin){
			$scope.msgs = {};
			$scope.msgs.msg = "You are signed in as a non-admin user, contact Acutulus to have your account permissions elevated.";
		}else if($scope.user && $scope.user.admin){
			$scope.msgs = {};
			$scope.msgs.msg = "You are signed in with admin permissions";
		}
		$scope.signin = function() {
			$scope.msgs = {};
			$scope.msgs.loading = "Logging In...";
			$nkAuthService.loginWithProvider("local", $scope.credentials)
			.then(function(data){
				$scope.msgs = {};
				$scope.msgs.success = 'Signed In!';
				if ($scope.hosts.indexOf($scope.host) === -1) {
					$scope.hosts.push($scope.host);
					localStorage.kepsApiPrefixHosts = JSON.stringify($scope.hosts);
				}
				if(data.admin){
					$timeout(function(){
						location.href = "/admin";//route to app
					},900);
				}else{
					$scope.msgs = {};
					$scope.msgs.msg = "You are signed in as a non-admin user, contact Acutulus to have your account permissions elevated.";
					$scope.user = data;
				}
			},function(err){	
				console.log(err);
				$scope.msgs = {};
				$scope.msgs.error = err.errors[0].friendly;
			});
		};

		$scope.setHost = function() {
			localStorage.kepsApiPrefix = $scope.host;
			location.reload();
		};

		$scope.signout = function(){
			$nkAuthService.logout();
			location.href = "/";
		};
	}
]);
