angular.module('ngKeps')
	.directive('kepsForm',['$nkDataService',
		function($nkDataService){
			return {
				restrict: 'E',
				
				templateUrl:'../templates/form.html',

				scope: {
					kepsData:'=',
					kepsModel:'=',
					kepsName:'=',
					kepsErrors:'=',
					kepsFramework:'@'
				},
				link:function(scope, element, attrs){
					scope.data = {};
					scope.kepsErrors = {};

			    	if (scope.kepsModel) {
			      		scope.data.value = scope.kepsModel;
			    	}

			    	scope.$watch('data.value', function(newVal) {
		      			if (typeof newVal !== 'undefined'){
		        			scope.kepsModel = newVal; 
		      			}
			    	});
			    	scope.$watch('kepsModel', function(newVal){
			          	if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
			        		scope.data.value = newVal;
			        	}
			      	});
				}
			};
		}
	]);