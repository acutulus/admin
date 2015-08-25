angular.module('editor')
	.directive('kepsForm',['DataService','$stateParams',
		function(DataService, $stateParams){
			return {
				restrict: 'E',
				
				templateUrl:'/admin/modules/dbTool/templates/formTemplate.html',

				scope: {
					kepsData:'=',
					kepsModel:'=',
					kepsName:'='
				},
				link:function(scope, element, attrs){
					scope.data = {};
					console.log('KTYPE', scope.kepsData);
					console.log('KMOD',scope.kepsModel);
		        	if (scope.kepsModel) {
		          	scope.data.value = scope.kepsModel;
		        	}

		        	scope.$watch('data.value', function(newVal) {
		          	if (typeof newVal !== 'undefined') {
			          	//console.log('change', scope.kepsName, newVal);
		            	scope.kepsModel = newVal; 
		          	}
		        	});
				}
			}
		}
	]);