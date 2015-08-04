angular.module('dbtools')
	.directive('kepsForm',[
		function(){
			return {
				restrict: 'E',
				
				templateUrl:'/admin/modules/dbTool/templates/formTemplate.html',

				scope:{
					kepsData:'=',
					kepsModel:'='
				},
				link: function(scope, element, attributes){
					//populate kepsModel unless it has properties already
					for(var x in scope.kepsData){
						if(scope.kepsModel.hasOwnProperty(scope.kepsData[x].name)){
						}
					}
				}


			}
		}
	]);