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
				scope.data = {};
				if (scope.kepsModel) {
					scope.data.value = scope.kepsModel;
				}

				if(scope.kepsType.constructor === Array){
					scope.kepsType = {
						type:'array',
						arrayData: scope.kepsType[0]
					};
				}else if(scope.kepsType[x].type === 'undefined' && typeof scope.kepsData[x] === 'object'){
					scope.kepsType[x] = {
						type:'object',
						objectTemplate: scope.kepsType
					};
				}else{
					if(scope.kepsData[x].type.indexOf(':') > -1){
						scope.kepsType.ref = scope.kepsData[x].type.slice(1);
						scope.kepsType.type = 'ref';
						DataService.getQuery('admin/rest/' + scope.kepsType.ref +'s', {})
						.then(function(data){
							scope.kepsType.options = data;
							console.log(scope.kepsType);
						})
					}
				}


				//constants
				var itemTypes=["html","url","geopoint","email","datetime","array",
								"image","file","string","number","buffer","boolean","enum"];
			
				//UTILITY FUNCTIONS - to prepare view for certain inputs
				var specialTypePreperations = function(){
					if(scope.kepsType.type === 'image'){
						//already have a canvas for array objects with multiple images :(
						scope.kepsType.randomCanvasId = Math.random().toString()
		
						if(typeof scope.kepsModel === 'object'){
							if(scope.kepsModel.absoluteFilePath !== 'undefined'){
								var img = new Image();
								img.src = scope.kepsModel.filePath;
								img.onload = function(){
									drawToCanvas(img, scope.kepsType.randomCanvasId(scope.kepsType.randomCanvasId.length));
								}
							}
						}
					}
					//build recursive inner element for arrays
					if(scope.kepsType.type === 'array'){
						//this should hold an array of objects or single data types
		
						if(typeof scope.data.value === 'undefined' || scope.data.value.length < 1){
							//add clone of object
							scope.data.value = [{}];
							
						}
						console.log('data on array postprocess', scope.kepsType, scope.kepsModel);

						var appendHTML = "<div style='width:95%;margin-left:auto;margin-right:auto;display:block;'>";

						if(scope.kepsType.arrayData.length <= 1){
							scope.kepsType.showArray = false;
							appendHTML += "<ul class='list-group'><li  class='list-group-item'><a href='' style='color:inherit;' ng-click='kepsType.showArray = !kepsType.showArray'>";
							appendHTML += "{{kepsType.showArray ? 'Hide Contents' : 'Show Contents'}}</a>"
							appendHTML += "<a  href='' ng-click='removeArrayItem($index)' class='badge'><span class='glyphicon glyphicon-remove'></span></a><a href='' ng-click='addArrayItem()' class='badge'><span class='glyphicon glyphicon-plus'></span></a>"
							appendHTML += "<div ng-repeat='obj in data.value track by $index' ng-show='kepsType.showArray'>"
							appendHTML += "<div class='input-group' style='margin-top:10px;'><span class='input-group-addon' id='counter'>{{$index}}</span>"
 							appendHTML += "<input type='text' style='height:30px;' class='form-control' aria-describedby='counter'></div></div>"
							appendHTML += "</li></ul>"
							element.append(appendHTML);
							$compile(element.contents())(scope);
						}else{
							scope.kepsType.showArray = [];
							appendHTML += "<ul class='list-group'><li class='list-group-item' ng-repeat='obj in data.value track by $index'>";
							appendHTML += "<a href='' style='color:inherit;' ng-click='kepsType.showArray[$index] = !kepsType.showArray[$index]'>";
							appendHTML += "{{$index}} {{kepsType.showArray[$index] ? 'Hide Contents' : 'Show Contents'}}</a><a href='' ng-click='removeArrayItem($index)' class='badge'><span class='glyphicon glyphicon-remove'></span></a>"
							appendHTML += "<a href='' ng-click='addArrayItem()' class='badge'><span class='glyphicon glyphicon-plus'></span></a> "
							appendHTML += "<div ng-show='kepsType.showArray[$index]'><form><keps-form keps-data='kepsType.arrayData' keps-model='obj'></keps-form></div></form></li></ul></div>";
							element.append(appendHTML);
							$compile(element.contents())(scope);
						}
					}
					return;
				}

				var drawToCanvas = function(img, canvasId){
					var width = document.createAttribute('width');
				 	var height = document.createAttribute('height'); 
				 	var canvas = document.getElementById(canvasId);
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
				//item is reference get references
				if(scope.kepsType.model){
					console.log(scope.kepsType)
				}
				//resolve type of field
				if(typeof scope.kepsType.type !== 'undefined'){
					scope.kepsType.type = scope.kepsType.type.toLowerCase();
				}

				if(itemTypes.indexOf(scope.kepsType.type) > -1){
					//handle special type preparations
					specialTypePreperations();
				}else{
					scope.typeError = true;
					scope.kepsType.type = "string";
				}

				scope.$watch('data.value', function(newVal) {
					if (typeof newVal !== 'undefined') {
						scope.kepsModel = newVal; 
					}
				})

				/*### TYPE: DATETIME STUFF ###*/
				//changing date ms number to display as date/time fields
				if(scope.kepsType.type === 'datetime'){
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
								scope.kepsModel = JSON.parse(request.responseText);
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
									scope.kepsModel = JSON.parse(request.responseText);
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
							scope.kepsModel = JSON.parse(request.responseText);
							scope.$apply();
						}
					}
					request.open('POST', '/admin/upload/file', true);
					request.send(formdata);
				}

				/*### TYPE: ARRAY stuff ###*/
				scope.addArrayItem = function(){
					if(typeof scope.kepsModel[0] === 'object'){
						scope.kepsModel.push({});
					}
					else{
						scope.kepsModel.push('');
					}
				}
				scope.removeArrayItem = function(index){
					scope.kepsModel.splice(index,1);
				}

			}
		}
	}
	
]);