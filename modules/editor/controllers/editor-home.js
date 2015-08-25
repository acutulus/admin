'use strict';

angular.module('editor')
	.controller('EditorController', 
	['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 'Authentication','$stateParams',
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService, Authentication){


		$scope.authentication = Authentication;
		if($scope.authentication.user){
			if($scope.authentication.user === 'undefined' || !$scope.authentication.user.admin){
				alert('You need to be a logged in admin');
				$location.path('/admin/#!/signin')
			}
		}
	}
]);