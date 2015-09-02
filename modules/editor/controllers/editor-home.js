'use strict';

angular.module('editor')
	.controller('EditorController', 
	['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 'Authentication','$stateParams',
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService, Authentication){

	    $('.collapsible').collapsible(); //prep materialize collapsible

		$scope.authentication = Authentication;
		if($scope.authentication.user){
			if($scope.authentication.user === 'undefined' || !$scope.authentication.user.admin){
				alert('You need to be a logged in admin');
				$location.path('/#!/signin')
			} else {
				$scope.sidebarTablesView = [];
				//get sidebar tablenames
				DataService.getQuery('admin/models')
				.then(function(data){
					for(var x in data){
						if(data[x].properties){
							if(data[x].properties.hasOwnProperty('editor')){
								//every model will get to editor except these specified editor:false ones
								if(!data[x].properties.editor){
									//editor is false
								}else{
									$scope.sidebarTablesView.push(x);								
								}
							}else{
								$scope.sidebarTablesView.push(x);							
							}
						}else{
							$scope.sidebarTablesView.push(x);						
						}
					}
				});
			}
		}
	}
]);