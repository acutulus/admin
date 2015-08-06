angular.module('dbtools')
	.directive('kepsForm',[
		function(){
			return {
				restrict: 'E',
				
				templateUrl:'/admin/modules/dbTool/templates/formTemplate.html',

				scope: {
					kepsData:'=',
					kepsModel:'='
				}
			}
		}
	]);