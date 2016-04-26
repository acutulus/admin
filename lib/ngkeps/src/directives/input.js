angular.module('ngKeps')
.directive('inputItem',['$nkDataService','$http', '$compile', '$parse', '$templateCache','$window','$timeout',
  function($nkDataService, $http, $compile, $parse, $templateCache, $window, $timeout){
    return {
      restrict: 'E',
      
      /*kepsType: OBJECT: 
      Property- displayAs: Optional, used for modifying reference types
      Property- displayType: Optional, will define field type, set to type if not provided
      Property- options: Optional, array of id/value that matches the reference type

      Property- name: Not Optional, will be used as label if no displayAs
      Property- type: Not Optional, will be field type if no displayType provided
      Property- model: Not Optional, value or false if not a reference field*/

      scope:{
        kepsType:'&',
        kepsModel:'=',
        kepsName:'&',
        kepsGroupClass:'@',
        kepsInputClass:'@',
        kepsLabelClass:'@',
        kepsSubLabelClass:'@',
        kepsButtonClass:'@',
        kepsLabel:'@',
        kepsInstructions:'@',
        kepsErrors:'=',
        kepsHideErrors:'&',
        kepsFramework:'@',
        kepsReadonly:'@'
      },

      link: function(scope,element,attrs){
        //setup display object
        if(scope.hasOwnProperty('kepsErrors')){
          scope.kepsErrors = {};
        }
        if(typeof scope.kepsType === 'function'){
          scope.kepsType = scope.kepsType();
        }

        if(typeof scope.kepsType === 'string'){
          scope.kepsType = {type:scope.kepsType};
        }
        if(typeof scope.kepsName === 'function'){
          scope.kepsName = scope.kepsName();
        }
        //resolve label value
        if(scope.kepsLabel === "''"){
          scope.kepsType.label = '';
        }else if(typeof scope.kepsLabel !== 'undefined' && scope.kepsLabel.length > 0){
          scope.kepsType.label = scope.kepsLabel;
        }else if(scope.kepsType){
          if(!scope.kepsType.label || scope.kepsType.label === ''){
            scope.kepsType.label = scope.kepsName;
          }
        }else{
          if(scope.kepsType){
            scope.kepsType.label = scope.kepsName;
          }else{
            scope.kepsType = {};
            scope.kepsType.label = scope.kepsName;
          }
        }
        //resolve instructions value
        if(scope.kepsInstructions === ''){
          scope.kepsType.instructions = '';
        }else if(typeof scope.kepsInstructions !== 'undefined'){
          scope.kepsType.instructions = scope.kepsInstructions;
        }else if(!scope.kepsType.hasOwnProperty('instructions')){
          scope.kepsType.instructions = '';
        }

        //setup data watch object
        scope.data = {};
        scope.data.id = Math.random();
        if(typeof scope.kepsType.required === 'object') {
          scope.data.subrequired = true;
        }
        if (scope.kepsModel) {
          if (scope.kepsType.type && scope.kepsType.type === 'image') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'file') {
            scope.data.value = scope.kepsModel;
          } else if (scope.kepsType.type && scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type && scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        scope.$watch('data.value', function(newVal) {
          if (typeof newVal !== 'undefined') {
            scope.kepsModel = newVal; 
          } else if (typeof scope.kepsType.default !== 'undefined') {
            scope.kepsModel = scope.kepsType.default;
          }
        });
        scope.$watch('kepsModel', function(newVal){
          if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
            scope.data.value = newVal;
          }
        });
        /*setup template stuff for different css frameworks
        var framework = $parse(attrs.data)(scope);
        if (framework !== 'bootstrapv3' &&
            framework !== 'materialize') {
          framework = 'bootstrapv3';
        }*/
        if(typeof scope.kepsFramework === 'function'){
          scope.kepsFramework = scope.kepsFramework();
        }
        var framework = scope.kepsFramework ? scope.kepsFramework : 'bootstrapv3';
        if(typeof framework !== 'string'){
          framework = 'bootstrapv3';
        }
        if(framework !== 'materialize' && framework !== 'bootstrapv3'){
          framework = 'bootstrapv3';
        }
        var loadTemplate = function(type) {
          if(type.slice(0,1) === ':'){
            $http.get("../templates/"+framework+'/referenceObject.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));
            });
          }else{
            $http.get("../templates/"+framework+'/'+type+'.html', {cache: $templateCache}).success(function(tplContent){
              element.replaceWith($compile(tplContent)(scope));                
            }); 
          }
        };

        //catch bad/incomplete models
        if (typeof scope.kepsType.type !== 'undefined') {
          scope.kepsType.type = scope.kepsType.type.toLowerCase();
          if (typeof scope.kepsType.default !== 'undefined' && typeof scope.data.value === 'undefined') {
            scope.data.value = scope.kepsType.default;
          }

          //add new types here
          var itemTypes=["html","url","geopoint","email","datetime","date","richtext","phone",
                         "image","file","string","number","boolean","enum","multienum","address",
                         "array", "arraymulti", "object"];
         
          //resolve weird types
          if(scope.kepsType.type.slice(0,1) === ':'){
            loadTemplate(scope.kepsType.type);
          }else if(itemTypes.indexOf(scope.kepsType.type) === -1){
            scope.typeError = true;
            scope.kepsType.type = "string";
          }else{
            if(scope.kepsType.type === 'array'){
              var size = 0;
              for(var x in scope.kepsType.subSchema){
                size++;
              }
              size > 1 ? scope.kepsType.type = 'arraymulti' : scope.kepsType.type = 'array';
            }
            
            loadTemplate(scope.kepsType.type);
            
          }
        }else{
          scope.kepsType.type = "string";
          loadTemplate(scope.kepsType.type) ;
        }
        /*#### END PREPROCESSING/ERROR CHECKING. REST OF CODE IS IN TYPE SPECIFIC BLOCKS #####*/
    


        //#### TYPE: REFERENCE STUFF #####
        if (typeof scope.kepsType.type !== 'undefined' && scope.kepsType.type.indexOf(':') > -1) {
          var referenceType = scope.kepsType.type.slice(1);
          $http.get('/admin/models')
          .then(function(models){
            for(var x in models.data){
              if(x === referenceType){
                if(models.data[x].properties){
                  if(models.data[x].properties.displayAs){
                    scope.data.displayReferenceAs = models.data[x].properties.displayAs;
                    return getReferenceData(referenceType, scope.data.displayReferenceAs);
                  }
                }
                if(models.data[x].schema.name){
                  scope.data.displayReferenceAs = 'name';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.title){
                  scope.data.displayReferenceAs = 'title';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                if(models.data[x].schema.displayName){
                  scope.data.displayReferenceAs = 'displayName';
                  return getReferenceData(referenceType, scope.data.displayReferenceAs);
                }
                scope.data.displayReferenceAs = '_id';
                return getReferenceData(referenceType, scope.data.displayReferenceAs);
              }
            }
          });
          var getReferenceData = function(referenceType, displayAs){
            $http.get("/admin/rest/" + referenceType + "s?returns[" + displayAs + "]=1")
            .then(function(data){
              scope.referenceOptions = data.data;
              if(scope.kepsModel){
                scope.data.value = scope.kepsModel;
                for(var i=0;i<scope.referenceOptions.length;i++){
                  if(scope.kepsModel === scope.referenceOptions[i]._id){
                    scope.data.reference = scope.referenceOptions[displayAs];
                  }
                }
              }
            });
          }
          scope.setReferenceData = function(){
            for(var i=0;i<scope.referenceOptions.length;i++){
              if(scope.referenceOptions[i][scope.data.displayReferenceAs] === scope.data.reference){
                scope.data.value = scope.referenceOptions[i]._id;
              }
            }
          };
        }
   

        /*### TYPE: DATETIME STUFF ###*/
        //blur function to combine date/time strings to ms number
        if (scope.kepsModel) {
          if (scope.kepsType.type === 'datetime') {
            //changing date ms number to display as date/time fields
            scope.data.date = new Date(scope.kepsModel);
            scope.data.time = new Date(scope.kepsModel);
          } else if (scope.kepsType.type === 'date') {
            //changing date ms number to display as date/time fields
            scope.data.value = scope.kepsModel;
            scope.data.date = new Date(scope.kepsModel);
          } else {
            scope.data.value = scope.kepsModel;            
          }
        }
        scope.makeTime = function(){
          if(scope.data.time && scope.data.date){
            scope.kepsModel = 
             new Date(scope.data.date.toString().slice(0,15) + scope.data.time.toString().slice(15)).getTime();

          }else{
            scope.kepsModel = new Date(scope.data.date).getTime();;
          }
        };

        /*### TYPE: ARRAY stuff ###*/
        var i, len;
        if(scope.kepsType.type === 'array'){
          scope.data.value = scope.kepsModel || []; 
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for (i = 0; i < len; i++) {
            scope.showArrayItem.push(false);
          }        
        }else if(scope.kepsType.type === 'arraymulti'){
          scope.data.value = scope.kepsModel || [];
          scope.showArrayItem = [];
          len = scope.data.value.length;
          for(i = 0; i < len; i++){
            scope.showArrayItem.push(false);
          }  
        }
        scope.addArrayItem = function(){
          var obj = {};
          for (var i in scope.kepsType.subSchema) {
            if (scope.kepsType.subSchema[i].default) {
              obj[i] = scope.kepsType.subSchema[i].default;
            }
          }
          scope.showArrayItem[scope.data.value.length] = true;
          scope.data.value.push(JSON.parse(JSON.stringify(obj)));

        };
        scope.removeArrayItem = function(index){
          scope.data.value.splice(index,1);
        };


        /*### TYPE: IMAGE STUFF ###*/
        if (scope.kepsType.type === 'image') {
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
        }
        scope.imageFileChanged = function(evt){
          if(fileValidation(evt.target.files[0])){
            var formdata = new FormData();

            var filetype;
            var ctx;  

            if(evt.target.files[0].name.includes('.jpg')){
              filetype ="image/jpg";
            }else if(evt.target.files[0].name.includes('.png')){
              filetype = "image/png";
            }else{
              alert('image filetype not recognized');
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
                  scope.$apply(function() {
                    scope.kepsModel = JSON.parse(request.responseText);
                    scope.imageStatus = 'Filename: ' + scope.kepsModel.fileName + ', File size: ' + scope.kepsModel.fileSize;

                  });
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

                /*### TYPE: FILE stuff ###*/
        if(scope.kepsType.type === "file"){
          scope.fileChanged = function(evt){
            scope.uploadStatus = 'Checking...';
            var valid = fileValidation(evt.target.files[0]);
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
        }


        /*###TYPE: GEOPOINT stuff ###*/
        var firstMapRun = true;
        var map;
        var marker;
        if(scope.kepsType.type === "geopoint"){
          if(scope.kepsModel){
            scope.data.value = scope.kepsModel;
            scope.data.lat = scope.kepsModel[0];
            scope.data.lng = scope.kepsModel[1];
          }
          scope.testLatLng = function(){
            if(scope.data.lat <= 85 && scope.data.lat >= -85  &&
               scope.data.lng <= 180 && scope.data.lng >= -180){

              if(scope.data.lat && scope.data.lng && firstMapRun){
                $window.initMap = function(){
                  var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
                    map = new google.maps.Map(document.getElementById('map'),
                    {
                      center:latLng,
                      zoom:6
                    });
                    marker = new google.maps.Marker(
                    {
                      position: latLng,
                      map: map,
                    });
                  firstMapRun = false;
                };
                if(typeof(google) === 'undefined'){
                  var s = document.createElement('script');
                  s.src = window.location.protocol + "//maps.googleapis.com/maps/api/js?callback=initMap";
                  document.body.appendChild(s);
                }else{
                  initMap();
                }

              }else{
                if(scope.data.lat && scope.data.lng){
                  var latLng = new google.maps.LatLng(scope.data.lat, scope.data.lng);
                  marker.setMap(null);
                  marker = new google.maps.Marker({
                    position:latLng,
                    map:map
                  });
                  map.setCenter(marker.getPosition());
                  scope.data.value = [scope.data.lat, scope.data.lng];
                }
              }
            }
          };
        }

       
        /*####TYPE: multi stuff####*/
        if(scope.kepsType.type==='multienum'){

          scope.data.value = scope.kepsModel || [];
          scope.checkMulti=function(opt){
            var ind = scope.data.value.indexOf(opt);
            if (ind === -1){
              scope.data.value.push(opt);
            } else {
              scope.data.value.splice(ind, 1);
            }
          };
        }
    

        /*### TYPE address stuff ###*/
       /* var timeoutPromise;
        scope.checkAddress = function(evt){
          if(!scope.data.value) scope.data.value = {};
          
          if(scope.data.value.address1 && scope.data.value.city && scope.data.value.region){
            if(scope.data.value.address1.length > 3 && scope.data.value.city.length > 2 && scope.data.value.region.length > 0){
              if(timeoutPromise){
                $timeout.cancel(timeoutPromise);
              }

              timeoutPromise = $timeout(function(){
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + scope.data.value.address1 + ',+' + scope.data.value.city + ',+' + scope.data.value.region)
                  .then(function(mapInfo){

                    if(mapInfo.status === 200){
                      var addressInfo = mapInfo.data.results[0].address_components;
                      for(var x in addressInfo){
                        if(addressInfo[x].types[0] === 'postal_code'){
                          scope.data.value.postal = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('zipLabel').className = "active";
                        } else if(addressInfo[x].types[0] === 'country'){
                          scope.data.value.country = addressInfo[x].long_name;
                          if(scope.kepsFramework === 'materialize') document.getElementById('countryLabel').className = "active";
                        }
                      }
                      $window.initMapAddress = function(){
                        var latLng = new google.maps.LatLng( mapInfo.data.results[0].geometry.location.lat,
                                                             mapInfo.data.results[0].geometry.location.lng);

                        var addressMap = new google.maps.Map(document.getElementById('addressMap'),
                          {
                            center:latLng,
                            zoom:8
                          });
                        var marker = new google.maps.Marker(
                          {
                            position: latLng,
                            map: addressMap,
                          });
                      };
                      if(typeof(google) === 'undefined'){
                        var s = document.createElement('script');
                        s.src = "https://maps.googleapis.com/maps/api/js?callback=initMapAddress";
                        document.body.appendChild(s);
                      }else{
                        initMapAddress();
                      }
                    }
                    scope.data.value.lat = mapInfo.data.results[0].geometry.location.lat;
                    scope.data.value.lng = mapInfo.data.results[0].geometry.location.lng;

                  });
              }, 1000);

            }
          }
        };*/


        /*### TYPE richtext stuff ###*/
        if(scope.kepsType.type === 'richtext'){
          scope.richToolbar = [ ['keps-fontsize','bold', 'italics', 'underline', 'strikeThrough','keps-alignment','wordcount']
          ];

        }

        /*ERROR CHECKING*/
        scope.errorChecking = function(){
          scope.kepsErrors = {};
          switch(scope.kepsType.type){
            case('string'):return stringValidation();
            case('number'):return numberValidation();
            case('image'):return fileValidation();
            case('richText'):return richTextValidation();
            case('geopoint'):return geopointValidation();
            case('multienum'):return multiValidation();
            case('email'):return emailValidation();

          }
        };

        var stringValidation = function(){
          scope.errorMsg = false;
          
          if(scope.kepsType.match){
            var regex;
            if(typeof scope.kepsType.match === 'string'){
              regex = new RegExp(scope.kepsType.match);
            }else{
              return;
            }
            console.log(regex.test(scope.data.value));
            if(!regex.test(scope.data.value)){
              if(scope.kepsErrors){scope.kepsErrors.pattern = 'Input does not match pattern';}
              return scope.errorMsg = 'Input does not match pattern';
            }
          }

          if(scope.kepsType.maxlength){
            if(scope.data.value.length > scope.kepsType.maxlength){
              if(scope.kepsErrors){scope.kepsErrors.maxlength = 'Input must be shorter than ' + scope.kepsType.maxlength;}; 
              return scope.errorMsg = 'Input must be shorter than ' + scope.kepsType.maxlength; 
            }
          }

          if(scope.kepsType.minlength){
            if(scope.data.value.length < scope.kepsType.minlength){
               if(scope.kepsErrors){scope.kepsErrors.minlength = 'Input must be longer than ' + scope.kepsType.minlength;}
              return scope.errorMsg = 'Input must be longer than ' + scope.kepsType.minlength;
            }
          }
        };

        var numberValidation = function(){
          scope.errorMsg = false;
          if(scope.kepsType.max){
            if(scope.data.value > scope.kepsType.max){
              if(scope.kepsErrors){scope.kepsErrors.max = 'Number must be smaller than '  + scope.kepsType.max;}
              return scope.errorMsg = 'Number must be smaller than '  + scope.kepsType.max;
            }
          }
          if(scope.kepsType.min){
            if(scope.data.value < scope.kepsType.min){
              if(scope.kepsErrors){scope.kepsErrors.min = 'Number must be bigger than ' + scope.kepsType.min};
              return scope.errorMsg = 'Number must be bigger than ' + scope.kepsType.min;
            }
          }
        };

        var fileValidation = function(file){
          if(scope.kepsType.hasOwnProperty('filetype')){
            if(file.type !== scope.kepsType.filetype){
              if(scope.kepsErrors){scope.kepsErrors.filetype = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;}
              scope.errorMsg = ' Incorrect filetype:' + file.type + ' , must be of type ' + scope.kepsType.filetype ;
              scope.$apply();
              return false;
            }
          }
          if(scope.kepsType.hasOwnProperty('maxsize')){
            if(file.size > scope.kepsType.maxsize){
              if(scope.kepsErrors){scope.kepsErrors.maxsize = 'File size too large, max size ' + scope.kepsType.maxsize;}
              scope.errorMsg = 'File size too large, max size ' + scope.kepsType.maxsize;
              scope.$apply();
              return false;
            }
          }
          return true;
        };

        var geopointValidation = function(){
          scope.errorMsg = false
          if(scope.kepsType.hasOwnProperty('minlat')){
            if(scope.data.value.lat < scope.kepsType.minlat){
              if(scope.kepsErrors){scope.kepsErrors.minlat = 'Latitude must be greater than ', scope.kepsType.minlat;}
              return scope.errorMsg = 'Latitude must be greater than ' + scope.kepsType.minlat;
            }
          }
          if(scope.kepsType.hasOwnProperty('maxlat')){
            if(scope.data.value.lat > scope.kepsType.maxlat){
              if(scope.kepsErrors){scope.kepsErrors.maxlat = 'Latitude must be less than ', scope.kepsType.maxlat;}
              return scope.errorMsg = 'Latitude must be less than ' + scope.kepsType.maxlat;
            }
          }
          if(scope.kepsType.hasOwnProperty('minlng')){
            if(scope.data.value.lng < scope.kepsType.minlng){
              if(scope.kepsErrors){scope.kepsErrors.minlng = 'Longitude must be greater than ', scope.kepsType.minlng;}
              return scope.errorMsg = 'Longitude must be greater than ' + scope.kepsType.minlng;
            }
          }
          if(scope.kepsType.hasOwnProperty('maxlng')){
            if(scope.data.value.lng > scope.kepsType.maxlng){
              if(scope.kepsErrors){scope.kepsErrors.maxlng = 'Latitude must be less than ', scope.kepsType.maxlng;}
              return scope.errorMsg = 'Longitude must be less than ' + scope.kepsType.maxlng;
            }
          }
        };

        var emailValidation = function(){
          scope.errorMsg = '';
          var reg = /@/
          if(reg.test(scope.data.value)){

          }else{
            if(scope.kepsErrors){scope.kepsErrors.emailInvalid = 'Invalid email format';}
            return scope.errorMsg = 'Invalid email format';
          }
        };

        var multiValidation = function(){
          scope.errorMsg = '';

          if(scope.kepsType.maxpicked || scope.kepsType.minpicked){
            var test = scope.data.value.length > 0 ? scope.data.value.split(',').length : 0;
            if(test > scope.kepsType.maxpicked){
              if(scope.kepsErrors){
                scope.kepsErrors.maxpicked= 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
              }
              return scope.errorMsg = 'Too many selected maximum selections allowed ' + scope.kepsType.maxpicked;
            }
            if(test < scope.kepsType.minpicked){
              if(scope.kepsErrors){
                scope.kepsErrors.maxpicked= 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;
              }
              return scope.errorMsg = 'Too few selected minimum selections allowed ' + scope.kepsType.minpicked;
 
            }
          }
        };
      }
    };
  }]);