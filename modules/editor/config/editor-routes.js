'use strict';

angular.module('editor').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
		.state('editor',{
			url:'/editor',
			templateUrl:'modules/editor/views/editor-home.html'
		})
		.state('editor.summary',{
			url:'/summary',
			templateUrl:'modules/editor/views/editor-summary.html'
		})
		.state('editor.tables',{
			url:'/tables',
			templateUrl:'modules/editor/views/editor-sidebar.html'
		})
		.state('editor.tables.table',{
			url:'/:tablename',
			templateUrl:'modules/editor/views/editor-table-contents.html'
		})
		.state('editor.document',{
			url:'/:tablename/:documentId',
			templateUrl:'modules/editor/views/editor-document.html'
		})

		$urlRouterProvider.otherwise('/editor/summary');

	}
])