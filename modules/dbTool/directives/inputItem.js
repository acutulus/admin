angular.module('dbtools')
	.directive('inputItem',['$modal','DataService','$http',
		function($modal, DataService, $http){
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
								"image","file","string","number","buffer","boolean"];

				scope.typeError = false;
				scope.setReferenceData = function(){
					for(var x in scope.inputField.options){
						if(scope.inputField.options[x].value === scope.inputField.showOption){
							scope.inputField.data = scope.inputField.options[x].id;
						}
					}
				}


				/*INTENSE DATA MASSAGING  ;) */
				//item already populated edit loop
				if(scope.inputField.model){
					if(scope.inputField.data){
						console.log('scope.inputField.name',scope.inputField.data)
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


				/*TYPE: DATETIME STUFF*/
				//changing date ms number to display as date/time fields
				if(scope.inputField.displayType === 'datetime'){
					scope.inputField.date = new Date(scope.inputField.data);
					scope.inputField.time = new Date(scope.inputField.data);
				}
				//blur function to combine date/time strings to ms number
				scope.makeTime = function(){
					console.log(scope.inputField.time, 'TIME', scope.inputField.date, 'DATE');
					if(scope.inputField.time && scope.inputField.date){
						scope.inputField.data = 
						 new Date(scope.inputField.date.toString().slice(0,15) + scope.inputField.time.toString().slice(15)).getTime();

					}
				}

				/*TYPE: image STUFF*/
			 	scope.fileChanged = function(evt){
			 		var formdata = new FormData();
			 		var width = document.createAttribute('width');
				 	var height = document.createAttribute('height'); 
				 	var canvas = document.getElementById('previewCanvas');
				 	var filetype;
				 	var ctx;	

			 		if(evt.target.files[0].name.includes('.jpg')){
			 			filetype ="image/jpg";
			 		}else if(evt.target.files[0].name.includes('.png')){
			 			filetype = "image/png";
			 		}else{
			 			console.log('IMAGE FILETYPE NOT FOUND');
			 		}
				 		console.log(evt.target.files[0])
				 		//draw image preview
	   					var img = new Image;
					    img.src = URL.createObjectURL(evt.target.files[0]);
					    img.onload = function() {
					    	

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
					    	ctx.clearRect(0, 0, ctx.width, ctx.height);
					        ctx.drawImage(img, 0,0, width.value, height.value);
			 				ctx.fillStyle = "black";
			 				ctx.font = "bold 16px serif";
			 				ctx.fillText(img.height + " X " + img.width, width.value * 0.5, height.value-5);
							
							formdata.append('file', evt.target.files[0]);
							formdata.append('data', evt.target.files[0]);
							//formdata.append('filename', evt.target.files[0].name);
							//formdata.append('size', evt.target.files[0].size);
							var request = new XMLHttpRequest();
							request.open('POST', '/admin/upload/image', true);
							request.send(formdata);
					    }

				}

				/*	
				function getBase64Image(img) {

				    var dataURL = canvas.toDataURL("image/png");

				    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
				}*/
			}
		}
	}
	
]);