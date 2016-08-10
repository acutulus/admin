/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('imageInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.kepsType.randomCanvasId = Math.ceil(Math.random() * 9999);
      if(typeof scope.kepsModel === 'object'){
        if(scope.kepsModel.absoluteFilePath !== 'undefined'){
          // TODO add filename to file input
          var img = new Image();
          img.src = scope.kepsModel.filePath;
          img.onload = function(){
            scope.drawToCanvas(img);
          };
        }
      }

      scope.imageFileChanged = function(evt){
        if(validatorService.fileValidation(scope, evt.target.files[0])){
          var formdata = new FormData();
          scope.kepsType.imageError = false;
          var filetype;
          var ctx;  

          if(evt.target.files[0].name.includes('.jpg')){
            filetype ="image/jpg";
          }else if(evt.target.files[0].name.includes('.png')){
            filetype = "image/png";
          }else{
            window.alert('image filetype not recognized');
          }

          if(scope.kepsType.size && scope.kepsType.size < evt.target.files[0].size){
            scope.$apply(function(){
              scope.kepsType.imageUploading = false;
              scope.kepsType.imageError = "File size exceeds maximum allowed: " + scope.kepsType.size +"B";
            });
            return;
          }
            
          //draw image preview
          var img = new Image();
          img.src = URL.createObjectURL(evt.target.files[0]);

          img.onload = function() {
            scope.drawToCanvas(img);
            scope.imageStatus = 'Uploading...';
            formdata.append('file', evt.target.files[0]);
            formdata.append('data', evt.target.files[0]);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                if(request.status !== 200 && request.status !== 304){
                  if(request.status === 413){
                    scope.$apply(function(){
                     scope.kepsType.imageError = "Error uploading image: Image rejected due too image size:   " + request.responseText; 
                    });
                  }else{
                    scope.$apply(function(){
                      scope.kepsType.imageError = "Error uploading image: " + request.status + ": " + request.responseText;
                    });
                  }
                }else{
                  scope.$apply(function() {
                    scope.kepsType.imageUploading = false;
                    scope.kepsModel = JSON.parse(request.responseText);
                    scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                  });
                }
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
          };
        }
      };
      scope.getImageUrl = function(){
        if(scope.kepsType.imageUrl && scope.kepsType.imageUrl.match(/(\S+\.[^/\s]+(\/\S+|\/|))/g)){
          
          var canvas = document.getElementById(scope.kepsType.randomCanvasId);
          var filetype;
          var ctx;  
          var img = new Image();
          img.src = scope.kepsType.imageUrl;
          img.onload = function(){
            scope.imageStatus = 'Uploading...';
            //send url to backend, get image data
            var formdata = new FormData();
            formdata.append('url', scope.kepsType.imageUrl);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
              if(request.readyState === 4){
                scope.$apply(function() {
                  scope.kepsModel = JSON.parse(request.responseText);
                  scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
                });
              }
            };
            request.open('POST', '/admin/upload/image', true);
            request.send(formdata);
        
            scope.drawToCanvas(img);
          };
        }
      };
      scope.drawToCanvas = function(img, canvasId){
        var width = document.createAttribute('width');
        var height = document.createAttribute('height'); 
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
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
        ctx.fillText(img.height + ' X ' + img.width, width.value*0.05, height.value - 5);
      };

      scope.removeImage = function(){
        var canvas = document.getElementById(scope.kepsType.randomCanvasId);
        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;

        var img = ctx.createImageData(width, height);
        for (var i = img.data.length; --i >= 0; ){          
          img.data[i] = 0;
        }
        ctx.putImageData(img,0,0);
        delete scope.kepsModel;
      }

    };
  }]);