'use strict';

angular.module('dbtools').controller('AdminSigninController', ['$scope', '$http', '$location', '$nkAuthService', '$timeout',
	function($scope, $http, $location, $nkAuthService, $timeout){

		// If user is signed in then redirect back home
		if($scope.user){
			if ($scope.user.admin) {
				location.href = '/admin/summary';
			} else {
				location.href = '/';
			}
		}
		
		$scope.signin = function() {
			$scope.error = '';
			$nkAuthService.loginWithProvider('local', $scope.credentials).then(function(response) {
				// And redirect to the index page
				if (!$scope.user.admin) {
					location.href = '/admin/summary';
				} else {
					location.href = '/';
				}
			}, function(response) {
				$timeout(function() {
					$scope.error = response.message;
					$scope.shakeForm = true;
					$timeout(function() {
						$scope.shakeForm = false;
					}, 2000);
				}, 500);
			});
		};
	}
]);