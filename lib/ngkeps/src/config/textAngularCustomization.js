angular.module('ngKeps')
	.config(['$provide', function($provide){
		$provide.decorator('taOptions',['taRegisterTool', 'taToolFunctions', 'taTranslations', '$delegate','$window','$nkModalService',
			function(taRegisterTool, taToolFunctions, taTranslations, taOptions, $window, $nkModalService){
				//add css rule to display wordcount correctly
				document.styleSheets[0].insertRule("#toolbarWC{font-size:10px;}", 1);

				taRegisterTool('keps-pre', {
					display: '<button class="btn btn-default" style="font-size:1em;">pre</button>',
					tooltiptext: taTranslations.pre.tooltip,
					action: function(){
						return this.$editor().wrapSelection("formatBlock", "<PRE>");
					},
					activeState: function(){ return this.$editor().queryFormatBlockState('pre'); }
				});


				taRegisterTool('keps-youtube',{
					iconclass:'fa fa-youtube-play',
					action: function(){ 

						var that = this;
						var selectedElement = document.activeElement;
						var getUrl = function(button){
							var url = document.getElementById('_youtube-input').value;
							if(url && url !== "" && url !== "https://"){
								var ids = url.match(/(\?|&)v=[^&]*/);
								if(ids && ids.length > 0){
									var urlLink = "https://www.youtube.com/embed/" + ids[0].substring(3);
									var embed = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + ids[0].substring(3) + '/hqdefault.jpg" ta-insert-video="' + urlLink +'"contenteditable="false" allowfullscreen="true" frameborder="0"/>';
									selectedElement.focus();
									that.$editor().wrapSelection('insertHTML', embed, true);
									return; 
								}
							}
						}
						$nkModalService.show({content:"<div style='padding:10px;'><label>Youtube Video URL:</label>" +
													  "<input type='text' id='_youtube-input'></input></div>", source:"div", 
													  close:getUrl,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					onElementSelect: {
						element: 'img',
						onlyWithAttrs: ['ta-insert-video'],
						action: taToolFunctions.imgOnSelectAction
					}
				});
				taRegisterTool('keps-image',{
					iconclass:'fa fa-picture-o',
					action:function(){
						var that = this;
						var selectedElement = document.activeElement;
						var angularSelected = angular.element(document.activeElement);
						
						var getImage = function(){
							var file = document.getElementById("_image-input").files[0];
							var reader = new FileReader();

							reader.onloadend = function(){
								var embed = '<img class="ta-insert-image" src="' + reader.result + '"></img>'
								selectedElement.focus();
								that.$editor().wrapSelection('insertImage', reader.result, true);
							}
							if(file){
								reader.readAsDataURL(file);
							}
						}

						$nkModalService.show({content:"<div style='padding:10px;'><label>Upload Image:</label>" +
													  "<input type='file' id='_image-input'></input></div>", source:"div", 
													  close:getImage,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					onElementSelect: {
						element: 'img',
						action: taToolFunctions.imgOnSelectAction
					}
				});

				taRegisterTool('keps-link',{
					iconclass:'fa fa-link',
					action: function(){
						var that = this;
						var selectedElement = document.activeElement;

						var addLink = function(){
							var link = document.getElementById("_link-input").value;
							return that.$editor().wrapSelection('createLink', link, true);
						}
				
						$nkModalService.show({content:"<div style='padding:10px;'><label>Add Link:</label>" +
							  "<input type='text' id='_link-input'></input></div>", source:"div", 
								close:addLink,buttons:[{label:'Close',class:'btn btn-default btn-theme'},{label:'submit',class:'btn btn-success btn-theme'}]});
					},
					activeState: function(commonElement){
						if(commonElement) return commonElement[0].tagName === 'A';
						return false;
					},
					onElementSelect: {
						element: 'a',
						action: taToolFunctions.aOnSelectAction
					}
				});

				//FONT SIZE TOOL
		 		var fontSizeMethods = {};
        var addFontSizeMethod = function(font){
        	return	this.$editor().wrapSelection('formatBlock', font);
        };
        fontSizeMethods.h1 = function(){
        	return addFontSizeMethod.call(this, "<h1>");
        };
        fontSizeMethods.h2 = function(){
        	return addFontSizeMethod.call(this, "<h2>");
        };
        fontSizeMethods.h3 = function(){
        	return addFontSizeMethod.call(this, "<h3>");
        };
        fontSizeMethods.h4 = function(){
        	return addFontSizeMethod.call(this, "<h4>");
        };
        fontSizeMethods.h5 = function(){
        	return addFontSizeMethod.call(this, "<h5>");
        };
        fontSizeMethods.h6 = function(){
        	return addFontSizeMethod.call(this, "<h6>");
        };
        fontSizeMethods.p = function(){
        	return addFontSizeMethod.call(this, "<p>");
        };


        var fontSizeTemplate = '';
        fontSizeTemplate += '<div class="btn-group" style="padding:0px;border:0px;"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-mouseup="focusHack()"ng-disabled="isDisabled()"  style="font-size:11px;">';
        fontSizeTemplate += 'Font Size<span class="caret"></span>';
        fontSizeTemplate += '</button>';
        fontSizeTemplate += '<ul class="dropdown-menu" style="position:absolute;background:white;">';
        fontSizeTemplate += '<li><a ng-click="h1()">36pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h2()">30pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h3()">24pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h4()">18pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h5()">14pt</a></li>';
        fontSizeTemplate += '<li><a hg-click="p()">13pt</a></li>';
        fontSizeTemplate += '<li><a ng-click="h6()">12pt</a></li>';
        fontSizeTemplate += '</ul></div>';
                fontSizeTemplate += '';
        
        // register the tool with textAngular
        taRegisterTool('keps-fontsize', {
            display: fontSizeTemplate,
            disabled: function(disabled) {
                
                // runs as an init function
                
                // hack to get around the errors thrown by textAngular
                // because it didn't get to store a pointer to the editor,
                // because it's not focused.
                this.focusHack = function() {
                    $('.ta-scroll-window [contenteditable]')[0].focus();
                };
                
                var self = this;
                
                // insert all qtMethods into the scope
                Object.keys(fontSizeMethods).forEach(function(key) {
                    self[key] = fontSizeMethods[key];
                });
                
                this.isDisabled = function() {
                    return disabled;
                };

            },
            action: function(){}
        });

        //ALIGN TEXT DROPDOWN TOOL
        var alignMethods = {};
        var addAlignMethods = function(location){
        	return this.$editor().wrapSelection( location, null);
        };
        alignMethods.center = function(){
        	return addAlignMethods.call(this, "justifyCenter");
        };
        alignMethods.left = function(){
        	return addAlignMethods.call(this, "justifyLeft");
        };       
        alignMethods.right = function(){
        	return addAlignMethods.call(this, "justifyRight");
        };
        alignMethods.indent = function(){
        	return addAlignMethods.call(this, "indent");
        };
        alignMethods.outdent = function(){
        	return addAlignMethods.call(this, "outdent");
        };

        var alignTemplate = '<div class="btn-group" style="padding:0px;border:0px;"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-mouseup="focusHack()" ng-disabled="isDisabled()" style="font-size:11px;">';
            alignTemplate += 'Text Alignment<span class="caret"></span>';
            alignTemplate += '</button>';
            alignTemplate += '<ul class="dropdown-menu" style="position:absolute;background:white;">';
            alignTemplate += '<li><a ng-click="left()">Align Left</a></li>';
            alignTemplate += '<li><a ng-click="center()">Align Center</a></li>';
            alignTemplate += '<li><a ng-click="right()">Align Right</a></li>';
            alignTemplate += '<li><a ng-click="indent()">Indent</a></li>';
            alignTemplate += '<li><a ng-click="outdent()">Outdent</a></li>';            
            alignTemplate += '</ul></div>';
			
        taRegisterTool('keps-alignment', {
            display: alignTemplate,
            disabled: function(disabled) {
                this.focusHack = function() {
                    $('.ta-scroll-window [contenteditable]')[0].focus();
                };
                
                var self = this;
                
                // insert all qtMethods into the scope
                Object.keys(alignMethods).forEach(function(key) {
                    self[key] = alignMethods[key];
                });
                
                this.isDisabled = function() {
                    return disabled;
                };

            },
            action: function(){}
        });

				taOptions.toolbar = [
			      ['keps-pre'], ['keps-fontsize'],['quote','bold', 'italics', 'underline', 'strikeThrough'], ['keps-alignment'],
			      [ 'ul', 'ol', 'redo', 'undo', 'clear'],['html','keps-youtube','keps-link', 'keps-image']
  				];
        		return taOptions;
			}

		]);
	}]);