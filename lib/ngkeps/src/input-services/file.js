/*jshint browser: true */
'use strict';

angular.module('ngKeps')
.service('fileInputService',['validatorService',
  function(validatorService){
    return function(scope) {
      scope.fileChanged = function(evt){
        scope.uploadStatus = 'Checking...';
        var valid = validatorService.fileValidation(scope, evt.target.files[0]);
        if(valid){
          scope.uploadStatus = 'Uploading...';
          var formdata = new FormData();
          formdata.append('file', evt.target.files[0]);
          var request = new XMLHttpRequest();
          request.onreadystatechange = function(){
            if(request.readyState === 4){
              scope.kepsModel= JSON.parse(request.responseText);
              scope.uploadStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;
              scope.$apply();
            }
          };
          request.open('POST', '/admin/upload/file', true);
          request.send(formdata);
        }
      };
      if(scope.kepsType.fileTypes && Array.isArray(scope.kepsType.fileTypes)){
        scope.kepsAcceptFileTypes = scope.kepsType.fileTypes[0];
        for(var i = 1; i < scope.kepsType.fileTypes.length;i++){
          scope.kepsAcceptFileTypes += "," + scope.kepsType.fileTypes[i];
        }
      }
    };
  }]);
