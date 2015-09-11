'use strict';

// Setting up route
angular.module('dbtools').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/dbtools');
		
		// Home state routing
		$stateProvider
		.state('dbtools', {
			url: '/dbtools',
			templateUrl: 'modules/dbTool/views/dbtools.client.view.html'
		})
		.state('dbtools.summary',{
			url:'/summary/:summaryPage',
			templateUrl:'modules/dbTool/views/summary.html'
		})
		.state('dbtools.newTable', {
			url:'/:database/newTable',
			templateUrl: 'modules/dbTool/views/new-table.client.view.html'
		})
		.state('dbtools.table', {
			url:'/:table',
			templateUrl: 'modules/dbTool/views/show-table.client.view.html'
		})
		.state('dbtools.new',{
			url:'/newDatabase',
			templateUrl:'modules/dbTool/views/new-database.client.view.html'
		})
		.state('signin',{
			url:'/signin',
			templateUrl:'modules/dbTool/views/signin.html'
		})
	}
]);