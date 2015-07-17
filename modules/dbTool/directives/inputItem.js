angular.module('dbtools')
	.directive('inputItem',[
		function(){
		return {
			
			restrict: 'E',
			
			templateUrl:'/admin/modules/dbTool/templates/inputItemTemplate.html',
			
			/*inputField: OBJECT: 
			Property- displayAs: Optional, used for modifying reference types
			Property- displayType: Optional, will define field type, set to type if not provided
			Property- options: Optional, array of id/value that matches the reference type

			Property- name: Not Optional, will be used as label if no displayAs
			Property- type: Not Optional, will be field type if no displayType provided
			Property- model: Not Optional, value or false if not a reference field*/

			scope:{
				inputField:"="
			},

			link: function(scope,element,attrs){

				//constants
				var itemTypes=["html","url","geopoint","email","datetime",
								"picture","file","string","number","buffer","boolean"];

				scope.typeError = false;

				scope.setReferenceData = function(option){
					scope.inputField.data = option.id;
					scope.inputField.showOption = option.value;
				}

				if(scope.inputField.model){
					if(scope.inputField.data){
						for(var x in scope.inputField.options){
							if(scope.inputField.options[x].id === scope.inputField.data){
								scope.inputField.showOption = scope.inputField.options[x].value;
							}
						}
					}
				}
				//resolve type of field
				if(typeof scope.inputField.displayType !== 'undefined'){
					scope.inputField.displayType = scope.inputField.displayType.toLowerCase();
				}else{
					scope.inputField.displayType = scope.inputField.type.toLowerCase();
				}

				//check if reference
				if(scope.inputField.options){
					//parse off leading : for display
					scope.inputField.displayType = scope.inputField.displayType.slice(1);
				}else{
					if(itemTypes.indexOf(scope.inputField.displayType) > -1){
					}else{
						scope.typeError = true;
						scope.inputField.type = "string";
						scope.inputField.displayType = "string"
					}
				}
			}
		}
	}]);