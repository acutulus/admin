'use strict';

// Setting up route
angular.module('dbtools').config(['$stateProvider', '$urlRouterProvider', '$locationProvider','$nkRestServiceProvider','$nkAuthServiceProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $nkRestServiceProvider, $nkAuthServiceProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('dbtools/summary');
		
		//set restService route
		if (localStorage.kepsApiPrefix) {
			$nkRestServiceProvider.setApiPrefix(localStorage.kepsApiPrefix+'/admin/rest/');
			$nkAuthServiceProvider.setApiPrefix(localStorage.kepsApiPrefix+'/api/v1/');
		} else {
			$nkRestServiceProvider.setApiPrefix('/admin/rest/');
			$nkAuthServiceProvider.setApiPrefix('/api/v1/');
		}
		// Home state routing
		$stateProvider
		.state('dbtools',{
			url:"/dbtools",
			templateUrl:"modules/dbTool/views/dbtool-home.html"
		})
		.state('dbtools.graph',{
			url:"/graph",
			templateUrl:"modules/dbTool/views/dbtool-graph.html"
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
		.state('dbtools.documentation',{
			url:'/documentation',
			templateUrl:'modules/dbTool/views/documentation.html'
		})
		.state('dbtools.signin',{
			url:'/signin',
			templateUrl:'modules/dbTool/views/signin.html'
		});

		//$locationProvider.html5Mode(true);
	}
]);