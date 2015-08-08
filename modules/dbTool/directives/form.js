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
					var schema;
					//filter kepsdata setting correct types and stuff
					DataService.getQuery('admin/models')
					.then(function(data){
						
						var tableName = $stateParams.table.slice(0,$stateParams.table.length -1);
						schema = data[tableName].schema;

						for(var x in scope.kepsData){
							if(scope.kepsData[x].constructor === Array){
								scope.kepsData[x] = {};
								scope.kepsData[x].type = 'array';
								scope.kepsData[x].model = false;
								scope.kepsData[x].arrayData = schema[x][0];

							}else if(scope.kepsData[x].type === 'undefined' && typeof scope.kepsData[x] === 'object'){
								var newObj = scope.kepsData[x];
								scope.kepsData[x] = {type:'object'};
								scope.kepsData[x].objectTemplate = scope.kepsData[x];
								scope.kepsData[x].model = false;
							}else{
								if(scope.kepsData[x].type.indexOf(':') > -1){
									scope.kepsData[x].model = true;
								}else{
									scope.kepsData[x].model = false;
								}
							}
							scope.kepsData[x].name = x;
						}

					});					
				}
			}
		}
	]);