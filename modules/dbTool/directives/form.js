angular.module('dbtools')
	.directive('kepsForm',['DataService','$stateParams',
		function(DataService, $stateParams){
			return {
				restrict: 'E',
				
				templateUrl:'/admin/modules/dbTool/templates/formTemplate.html',

				scope: {
					kepsData:'=',
					kepsModel:'='
				},
				link:function(scope, element, attrs){
				}
			}
		}
	]);