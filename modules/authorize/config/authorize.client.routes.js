'use strict';

// Setting up route
angular.module('authorize').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider.state('signin',{
			url:"/signin",
			templateUrl:"modules/authorize/views/signin.html"
		})

	}
])