'use strict';

angular.module('dbtools').controller('SignInController', ['$scope', '$http', '$location', '$nkAuthService', '$timeout',
	function($scope, $http, $location, $nkAuthService, $timeout){
		
		$scope.user = $nkAuthService.getUser();
		if($scope.user && !$scope.user.admin){
			$scope.msgs = {};
			$scope.msgs.msg = "You are signed in as a non-admin user, contact Acutulus to have your account permissions elevated.";
		}else if($scope.user && $scope.user.admin){
			$scope.msgs = {};
			$scope.msgs.msg = "You are signed in with admin permissions";
		}
		$scope.signin = function() {
			$scope.msgs = {}
			$scope.msgs.loading = "Logging In..."
			$nkAuthService.loginWithProvider("local", $scope.credentials)
			.then(function(data){
				$scope.msgs = {};
				$scope.msgs.success = 'Signed In!';
				if(data.admin){
					$timeout(function(){
						location.href ="/management.html#!/homepage"//route to app
					},900)
				}else{
					$scope.msgs = {};
					$scope.msgs.msg = "You are signed in as a non-admin user, contact Acutulus to have your account permissions elevated.";
					$scope.user = data;
				}
			},function(err){	
				console.log(err);
				$scope.msgs = {};
				$scope.msgs.error = err.message;
			});
		};

		$scope.signout = function(){
			$nkAuthService.logout();
			location.href = "/";
		}
	}
]);
