angular.module('editor')
	.config(function($provide){
		$provide.decorator('taOptions',['taRegisterTool', 'taToolFunctions','$delegate','$kepsModal','$window',
			function(taRegisterTool, taToolFunctions, taOptions, $modal, $window){
				taRegisterTool('acutulus-youtube',{
					iconclass:'fa fa-youtube-play',
					action: function(){ 

						var that = this;
						var selectedElement = document.activeElement;

						var urlModal = $modal.open({
							templateUrl:'modules/dbTool/views/get-youtube-modal.html',
							controller:'GetYoutubeModalCtrl',
							size:'med'
						})
						urlModal.result.then(function(urlPrompt){
							console.log(urlPrompt);
							if (urlPrompt && urlPrompt !== '' && urlPrompt !== 'https://') {
								// get the video ID
								var ids = urlPrompt.match(/(\?|&)v=[^&]*/);
								/* istanbul ignore else: if it's invalid don't worry - though probably should show some kind of error message */
								if(ids && ids.length > 0){
									// create the embed link
									var urlLink = "https://www.youtube.com/embed/" + ids[0].substring(3);
									// create the HTML
									// for all options see: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
									// maxresdefault.jpg seems to be undefined on some.
									var embed = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + ids[0].substring(3) + '/hqdefault.jpg" ta-insert-video="' + urlLink + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
									// insert
									selectedElement.focus();
									that.$editor().wrapSelection('insertHTML', embed, true);
									return;
								}
							}
						});
					},
					onElementSelect: {
						element: 'img',
						onlyWithAttrs: ['ta-insert-video'],
						action: taToolFunctions.imgOnSelectAction
					}
				});
				taRegisterTool('acutulus-image',{
					iconclass:'fa fa-picture-o',
					action:function(){
						console.log(this);
						var that = this;
						var selectedElement = document.activeElement;
						var angularSelected = angular.element(document.activeElement);

						var urlModal = $modal.open({
							templateUrl:'modules/dbTool/views/get-image-modal.html',
							controller:'GetImageModalCtrl',
							size:'med'
						})
						urlModal.result.then(function(imageLink){
							console.log(imageLink.length)
							if(imageLink.length < 1000){
								if(imageLink && imageLink !== '' && imageLink !== 'http://'){
									selectedElement.focus();
									return that.$editor().wrapSelection('insertImage', imageLink, true);
								}
							}else{
								angularSelected.append('<img src="'+imageLink + '"/>') 
							}
						});
					}
				});

				taRegisterTool('acutulus-link',{
					iconclass:'fa fa-link',
					action: function(){
												console.log(this);

						console.log('in link function')
						var that = this;
						var selectedElement = document.activeElement;
						selectedElement.appendChild('<div style="position:absolute;z-index:100;min-width:200px;padding:20px;margin-left:40%"'+
											   'class="card" ng-init="showLinkInput = true" ng-show="showLinkInput">shown'+
											   '<div class="btn-large" ng-click="showLinkInput=false;">Hide</div> '+
											   '</div>')
						console.log('openin modal')
						var linkModal = $modal.open({
							templateUrl:'modules/dbTool/views/get-link-modal.html',
							controller:'GetLinkModalCtrl',
							size:'med'
						});
						linkModal.result.then(function(urlLink){
							console.log('modal result')
							if(urlLink && urlLink !== '' && urlLink !== 'http://'){
								selectedElement.focus();
								return that.$editor().wrapSelection('createLink', urlLink, true);
							}
						})
						console.log('modal did nothin')
					},
					activeState: function(commonElement){
						if(commonElement) return commonElement[0].tagName === 'A';
						return false;
					},
					onElementSelect: {
						element: 'a',
						action: taToolFunctions.aOnSelectAction
					},
					title:'Add a Link'
				});
				
				taOptions.toolbar = [
			      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p' ,'pre', 'quote','bold', 'italics', 'underline', 'strikeThrough'],
			      [ 'ul', 'ol', 'redo', 'undo', 'clear','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
			      ['html', 'acutulus-youtube','acutulus-link', 'acutulus-image']
  				];

        		return taOptions;
			}

		]);
	});