'use strict';

angular.module('editor').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){
		$urlRouterProvider.otherwise('/editor');

		$stateProvider
		.state('editor',{
			url:'/editor',
			templateUrl:'modules/editor/views/editor-home.html'
		})
		.state('editor.table',{
			url:'/:table',
			templateUrl:'modules/editor/views/editor-table.html'
		})
		.state('editor.table.field',{
			url:'/:field',
			templateUrl:'modules/editor/views/editor-field.html'
		})
	}
])