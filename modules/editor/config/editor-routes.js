'use strict';

angular.module('editor').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
		.state('editor',{
			url:'/editor',
			templateUrl:'modules/editor/views/editor-home.html'
		})
		.state('editor.table',{
			url:'/tables/:table',
			templateUrl:'modules/editor/views/editor-sidebar.html'
		})
		.state('editor.table.field',{
			url:'/documents/:document',
			templateUrl:'modules/editor/views/editor-field.html'
		})

		$urlRouterProvider.otherwise('/editor');

	}
])