'use strict';

// Setting up route
angular.module('dbtools').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/dbtools');
		
		// Home state routing
		$stateProvider.
		state('dbtools', {
			url: '/dbtools',
			templateUrl: 'modules/dbTool/views/dbtools.client.view.html'
		})
		.state('dbtools.newTable', {
			url:'/:database/newTable',
			templateUrl: 'modules/dbTool/views/new-table.client.view.html'
		})
		.state('dbtools.table', {
			url:'/:database/:table',
			templateUrl: 'modules/dbTool/views/show-table.client.view.html'
		})
		.state('dbtools.new',{
			url:'/newDatabase',
			templateUrl:'modules/dbTool/views/new-database.client.view.html'
		})
	}
]);