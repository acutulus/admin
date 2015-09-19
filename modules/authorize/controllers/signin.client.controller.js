'use strict';

angular.module('authorize').controller('SignInController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication){
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if($scope.authentication.user){
			if ($scope.authentication.user.admin) $location.path('/admin/admin.html');
		}
		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page
				if($scope.authentication.user.admin){
					return location.href = '/admin/admin.html'
				};
				if($scope.authentication.user.editor){
					return location.href = 'admin/editor.html'
				}

			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
