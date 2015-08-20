'use strict';

angular.module('editor')
	.controller('EditorController', 
	['$scope', '$stateParams', '$location', '$http','$timeout','$modal','DataService', 'Authentication','$stateParams',
	function($scope, $stateParams, $location, $http, $timeout, $modal, DataService, Authentication){


		$scope.authentication = Authentication;
		if($scope.authentication.user){
			if($scope.authentication.user === 'undefined' || !$scope.authentication.user.admin){
				alert('You need to be a logged in admin');
				$location.path('/admin/#!/signin')
			}else{
				/*populate header dropdowns*/
				$scope.dbToolDatabase = [];
				$scope.editorDatabase = [];
				DataService.getQuery('admin/models')
				.then(function(data){
					//build list of editor items
					for(var x in data){
						$scope.dbToolDatabase.push(x);
						if(data[x].properties){
							if(data[x].properties.hasOwnProperty('editor')){
								//every model will get to editor except these specified editor:false ones
								if(!data[x].properties.editor){
									//editor is false
								}else{
									$scope.editorDatabase.push(x);								
								}
							}else{
								$scope.editorDatabase.push(x);							
							}
						}else{
							$scope.editorDatabase.push(x);						
						}
					}
				});	
				

			}
		}
	}
]);