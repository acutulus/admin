angular.module('dbtools')
	.directive('inputItem',['$modal','DataService','$http', '$compile',
		function($modal, DataService, $http, $compile){
		return {
			restrict: 'E',
			
			templateUrl:'/admin/modules/dbTool/templates/inputItemTemplate.html',
			
			/*kepsType: OBJECT: 
			Property- displayAs: Optional, used for modifying reference types
			Property- displayType: Optional, will define field type, set to type if not provided
			Property- options: Optional, array of id/value that matches the reference type

			Property- name: Not Optional, will be used as label if no displayAs
			Property- type: Not Optional, will be field type if no displayType provided
			Property- model: Not Optional, value or false if not a reference field*/

			scope:{
				kepsType:"=",
				kepsModel:"="
			},

			link: function(scope,element,attrs){
				console.log(scope.kepsModel);
				//constants
				var itemTypes=["html","url","geopoint","email","datetime","array",
								"image","file","string","number","buffer","boolean"];
			
				//UTILITY FUNCTIONS - to prepare view for certain inputs
				var specialTypePreperations = function(){
					if(scope.kepsType.displayType === 'image'){
						if(typeof scope.kepsModel === 'object'){
							if(scope.kepsModel.absoluteFilePath !== 'undefined'){
								var img = new Image();
								img.src = scope.kepsModel.filePath;
								img.onload = function(){
									drawToCanvas(img);
								}
							}
						}
					}
					//build recursive inner element for arrays
					if(scope.kepsType.displayType === 'array'){
						scope.kepsType.showArray = [];
						//this should hold an array of objects or single data types
						scope.kepsModel[scope.kepsType.name]  = [];
						console.log('DATA',scope.kepsType)
						scope.kepsType.arrayData = [];
						for(var i in scope.kepsType.type[0]){
							var temp = scope.kepsType.type[0][i];
							scope.kepsType.arrayData.push({	name:i,
															type:temp.type,
															model:false
														});
						}
						console.log(scope.kepsType.arrayData);
						//no data yet pass value of array template
						if(!scope.kepsModel[scope.kepsType.name]){
							scope.kepsModel[scope.kepsType.name] = [{test:'woo'}];
						}
						var appendHTML = "{{kepsModel}}<div style='width:95%;margin-left:auto;margin-right:auto;display:block;'>";
						appendHTML += "<ul class='list-group'><li class='list-group-item' ng-repeat='obj in kepsModel[kepsType.name] track by $index'>";
						appendHTML += "<a href='' style='color:inherit;' ng-click='kepsType.showArray[$index] = !kepsType.showArray[$index]'>";
						appendHTML += "{{$index}} {{kepsType.showArray[$index] ? 'Hide Contents' : 'Show Contents'}}</a><a href='' ng-click='removeArrayItem($index)' class='badge'><span class='glyphicon glyphicon-remove'></span></a>"
						appendHTML += "<a href='' ng-click='addArrayItem()' class='badge'><span class='glyphicon glyphicon-plus'></span></a> "
						appendHTML += "<div ng-show='kepsType.showArray[$index]'><form>{{obj}}<keps-form keps-type='kepsType.arrayData' keps-model='obj'></keps-form></div></form></li></ul></div>";
						element.append(appendHTML);
						$compile(element.contents())(scope);
					}
					return;
				}

				var drawToCanvas = function(img){
					var width = document.createAttribute('width');
				 	var height = document.createAttribute('height'); 
				 	var canvas = document.getElementById('previewCanvas');
				 	var ctx;
					//scale images reasonably
			    	if(img.width > img.height){ 
				    	width.value =  (img.width > 300)  ? 300 : img.width;
				    	height.value = (img.width > 300)  ? img.height/img.width * 300 : img.height;
				    }else if(img.height > img.width){
				    	height.value = (img.height > 300) ? 300 : img.height;
				    	width.value =  (img.height > 300) ? img.width/img.height * 300 : img.width;
					}

					canvas.setAttributeNode(width);
					canvas.setAttributeNode(height);
					ctx = canvas.getContext('2d');
					ctx.drawImage(img,0,0,width.value,height.value);
					ctx.fillStyle = "black";
					ctx.font = "bold 16px serif";
					ctx.fillText(img.height + ' X ' + img.width, width.value * 0.5, height.value - 5);
				}

				scope.typeError = false;
				scope.setReferenceData = function(){
					for(var x in scope.kepsType.options){
						if(scope.kepsType.options[x].value === scope.kepsType.showOption){
							scope.kepsModel = scope.kepsType.options[x].id;
						}
					}
				}


				/*INTENSE DATA MASSAGING  ;) */
				//item already populated edit loop
				if(scope.kepsType.model){
					for(var x in scope.kepsType.options){
						if(scope.kepsType.options[x].id === scope.kepsModel){
							scope.kepsType.showOption = scope.kepsType.options[x].value;
						}
					}
				}
				//resolve type of field
				if(typeof scope.kepsType.displayType !== 'undefined'){
					scope.kepsType.displayType = scope.kepsType.displayType.toLowerCase();
				}else{
					if(scope.kepsType.type.constructor.toString().indexOf('Array') > -1){
						scope.kepsType.displayType = 'array';
					}else{
						scope.kepsType.displayType = scope.kepsType.type.toLowerCase();
					}
					
				}

				//check if reference
				if(scope.kepsType.options){
					//parse off leading : for display
					scope.kepsType.displayType = scope.kepsType.displayType.slice(1);
				}else{
					if(itemTypes.indexOf(scope.kepsType.displayType) > -1){
						//handle special type preparations
						specialTypePreperations();
					}else{
						scope.typeError = true;
						scope.kepsType.type = "string";
						scope.kepsType.displayType = "string"
					}
				}


				/*### TYPE: DATETIME STUFF ###*/
				//changing date ms number to display as date/time fields
				if(scope.kepsType.displayType === 'datetime'){
					scope.kepsType.date = new Date(scope.kepsModel);
					scope.kepsType.time = new Date(scope.kepsModel);
				}
				//blur function to combine date/time strings to ms number
				scope.makeTime = function(){
					if(scope.kepsType.time && scope.kepsType.date){
						scope.kepsModel = 
						 new Date(scope.kepsType.date.toString().slice(0,15) + scope.kepsType.time.toString().slice(15)).getTime();

					}
				}

				/*### TYPE: IMAGE STUFF ###*/
			 	scope.imageFileChanged = function(evt){
			 		var formdata = new FormData();

				 	var filetype;
				 	var ctx;	

			 		if(evt.target.files[0].name.includes('.jpg')){
			 			filetype ="image/jpg";
			 		}else if(evt.target.files[0].name.includes('.png')){
			 			filetype = "image/png";
			 		}else{
			 			console.log('IMAGE FILETYPE NOT FOUND');
			 			alert('image filetype not recognized')
			 		}
			 		
			 		console.log(evt.target.files[0])
			 		//draw image preview
   					var img = new Image;
				    img.src = URL.createObjectURL(evt.target.files[0]);
				    img.onload = function() {
				    	

				    	drawToCanvas(img);
						
						formdata.append('file', evt.target.files[0]);
						formdata.append('data', evt.target.files[0]);
						//formdata.append('filename', evt.target.files[0].name);
						//formdata.append('size', evt.target.files[0].size);
						var request = new XMLHttpRequest();
						request.onreadystatechange = function(){
							if(request.readyState === 4){
								scope.kepsModel[scope.kepsType.name] = JSON.parse(request.responseText);
								scope.$apply();
							}
						}
						request.open('POST', '/admin/upload/image', true);
						request.send(formdata);
				    }

				}
				scope.getImageUrl = function(){
					if(scope.kepsType.imageUrl.match(/(\S+\.[^/\s]+(\/\S+|\/|))/g)){
				 		
				 		var width = document.createAttribute('width');
					 	var height = document.createAttribute('height'); 
					 	var canvas = document.getElementById('previewCanvas');
					 	var filetype;
					 	var ctx;	
						
						var img = new Image();
						img.src = scope.kepsType.imageUrl;
						img.onload = function(){
							
							//send url to backend, get image data
							var formdata = new FormData();
							formdata.append('url', scope.kepsType.imageUrl);
							var request = new XMLHttpRequest();
							request.onreadystatechange = function(){
								if(request.readyState === 4){
									scope.kepsModel[scope.kepsType.name] = JSON.parse(request.responseText);
									scope.$apply();
								}
							}
							request.open('POST', '/admin/upload/image', true);
							request.send(formdata);
						
							drawToCanvas(img);
 						}						
					}
				}

				/*### TYPE: FILE stuff ###*/
				scope.fileChanged = function(evt){
					var formdata = new FormData();
					formdata.append('file', evt.target.files[0]);
					var request = new XMLHttpRequest();
					request.onreadystatechange = function(){
						if(request.readyState === 4){
							scope.kepsModel[scope.kepsType.name] = JSON.parse(request.responseText);
							scope.$apply();
						}
					}
					request.open('POST', '/admin/upload/file', true);
					request.send(formdata);
				}

				/*### TYPE: ARRAY stuff ###*/
				scope.addArrayItem = function(){
					scope.kepsModel.push(scope.kepsType.arrayTemplate.slice(0));
				}
				scope.removeArrayItem = function(index){
					scope.kepsModel.splice(index,1);
				}
			}
		}
	}
	
]);