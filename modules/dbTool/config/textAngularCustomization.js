angular.module('dbtools')
	.config(function($provide){
		$provide.decorator('taOptions',['taRegisterTool', 'taToolFunctions','$delegate','$modal','$window',
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
						var that = this;
						var selectedElement = document.activeElement;

						var urlModal = $modal.open({
							templateUrl:'modules/dbTool/views/get-image-modal.html',
							controller:'GetImageModalCtrl',
							size:'med',
							resolve:{
								modalReturnType:function(){
									return 'Enter Image Url';
								}
							}
						})
						urlModal.result.then(function(imageLink){
							if(imageLink && imageLink !== '' && imageLink !== 'http://'){
								return this.$editor().wrapSelection('insertImage', imageLink, true);
							}
						});
					}
				})
				taOptions.toolbar[1].push('acutulus-youtube');
				taOptions.toolbar[1].push('acutulus-image');
        		return taOptions;
			}

		]);
	});