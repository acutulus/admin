'use strict';

// Setting up route
angular.module('dbtools').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/summary');
		
		// Home state routing
		$stateProvider

		.state('summary',{
			url:'/summary',
			templateUrl:'modules/dbTool/views/summary.html'
		})
		.state('routes',{
			url:'/routes/:tablename',
			templateUrl:'modules/dbTool/views/routes.client.view.html'
		})
		.state('models',{
			url:'/models/:tablename',
			templateUrl:'modules/dbTool/views/models.client.view.html'
		})
		.state('data',{
			url:'/data/:tablename',
			templateUrl:'modules/dbTool/views/show-table.client.view.html'
		})
		.state('newTable', {
			url:'/:database/newTable',
			templateUrl: 'modules/dbTool/views/new-table.client.view.html'
		})
		.state('new',{
			url:'/newDatabase',
			templateUrl:'modules/dbTool/views/new-database.client.view.html'
		})
		.state('signin',{
			url:'/signin',
			templateUrl:'modules/dbTool/views/signin.html'
		});
		$locationProvider.html5Mode(true);
	}
]);