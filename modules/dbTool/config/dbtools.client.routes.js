'use strict';

// Setting up route
angular.module('dbtools').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$nkRestServiceProvider','$nkAuthServiceProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $nkRestServiceProvider, $nkAuthServiceProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('dbtools/summary');
		
		//set restService route
		if (localStorage.kepsApiPrefix) {
			$nkRestServiceProvider.setApiPrefix(localStorage.kepsApiPrefix+'/api/v1/');
			$nkAuthServiceProvider.setApiPrefix(localStorage.kepsApiPrefix+'/admin/rest/');
		} else {
			$nkRestServiceProvider.setApiPrefix('/api/v1/');
			$nkAuthServiceProvider.setApiPrefix('/admin/rest/');
		}
		// Home state routing
		$stateProvider
		.state('dbtools',{
			url:"/dbtools",
			templateUrl:"modules/dbTool/views/dbtool-home.html"
		})
		.state('dbtools.summary',{
			url:'/summary',
			templateUrl:'modules/dbTool/views/dbtool-summary.html'
		})
		.state('dbtools.routes',{
			url:'/routes/:tablename',
			templateUrl:'modules/dbTool/views/dbtool-routes.html'
		})
		.state('dbtools.models',{
			url:'/models/:tablename',
			templateUrl:'modules/dbTool/views/dbtool-models.html'
		})
		.state('dbtools.data',{
			url:'/data/:tablename',
			templateUrl:'modules/dbTool/views/dbtool-data.html'
		})
		.state('newTable', {
			url:'/:database/newTable',
			templateUrl: 'modules/dbTool/views/new-table.client.view.html'
		})
		.state('new',{
			url:'/newDatabase',
			templateUrl:'modules/dbTool/views/new-database.client.view.html'
		})
		.state('dbtools.signin',{
			url:'/signin',
			templateUrl:'modules/dbTool/views/signin.html'
		});
	}
]);