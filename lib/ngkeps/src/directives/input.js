angular.module('ngKeps')
.directive('inputItem',['$nkDataService', '$http', '$compile', '$parse', '$templateCache','$window','$timeout', 'imageInputService', 'validatorService',
  function($nkDataService, $http, $compile, $parse, $templateCache, $window, $timeout, imageInputService, validatorService){
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
        kepsErrors:'=?',
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
        
        //deep watch
        if(scope.kepsType.type === 'array' || scope.kepsType.type === 'multienum'){
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            } else if(typeof newVal === 'undefined'){
              delete scope.kepsModel;
            }
          }, true);   
        //regular watch     
        }else{
          scope.$watch('data.value', function(newVal) {
            if (typeof newVal !== 'undefined') {
              scope.kepsModel = newVal; 
            } else if (typeof scope.kepsType.default !== 'undefined') {
              scope.kepsModel = scope.kepsType.default;
            }else if(typeof newVal === 'undefined'){
              delete scope.kepsModel;
            }
          });
        }
        scope.$watch('kepsModel', function(newVal){
          if(typeof newVal !== 'undefined' && scope.data.value !== newVal){
            scope.data.value = newVal;
            if (scope.kepsType.type === 'image') {
              imageInputService(scope);
            }
          }else if(typeof newVal === 'undefined'){
            delete scope.data.value;
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
                         "array", "arraymulti", "object", "time"];
         
          //resolve weird types
          if(scope.kepsType.type.slice(0,1) === ':'){
            loadTemplate(scope.kepsType.type);
          }else if(scope.kepsType.type.slice(0,1) === '_'){
            getModelSchema(function(err, schema){
              scope.kepsType.type = "object";
              scope.kepsType.subSchema = removeUneditableFields(schema);
              loadTemplate(scope.kepsType.type);
            });
          }else if(itemTypes.indexOf(scope.kepsType.type) === -1){
            scope.typeError = true;
            scope.kepsType.type = "string";
          }else{
            if(scope.kepsType.type === 'array'){
              if(typeof scope.kepsType.subSchema === 'string'){
                scope.kepsType.subSchema = {type:scope.kepsType.subSchema};
              }else{
                var size = 0;
                for(var x in scope.kepsType.subSchema){
                  size++;
                }
                size > 1 ? scope.kepsType.type = 'arraymulti' : scope.kepsType.type = 'array';
              }
            }
            
            loadTemplate(scope.kepsType.type);
            
          }
        }else{
          scope.kepsType.type = "string";
          loadTemplate(scope.kepsType.type) ;
        }
      
        function removeUneditableFields(schema){
          var blacklist = ['_id','_createdAt','_updatedAt', '_seed', '_v'];
          var newSchema = {};
          for(var x in schema){
            if(blacklist.indexOf(x) > -1){

            }else{
              newSchema[x] = schema[x];
            }
          }
          return newSchema;
        }
        /*#### END PREPROCESSING/ERROR CHECKING. REST OF CODE IS IN TYPE SPECIFIC BLOCKS #####*/
    


        //#### TYPE: REFERENCE STUFF #####
        if (typeof scope.kepsType.type !== 'undefined' && scope.kepsType.type.indexOf(':') === 0) {
          var referenceType = scope.kepsType.type.slice(1);
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x.toLowerCase() === referenceType.toLowerCase()){
                referenceType = x;
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
            $http.get($nkDataService.apiPrefix + 'rest/' + referenceType + "s")
            .then(function(data){
              scope.referenceOptions = [];
              for(var i = 0; i < data.data.length; i++){
                scope.referenceOptions.push({_id:data.data[i]._id, name:data.data[i][displayAs]});
              }
              if(scope.kepsModel){
                scope.data.value = scope.kepsModel;
                for(var i=0;i<scope.referenceOptions.length;i++){
                  if(scope.kepsModel === scope.referenceOptions[i]._id){
                    scope.data.reference = scope.referenceOptions[displayAs];
                  }
                }
              }
            });
          };/*
          scope.setReferenceData = function(){
            for(var i=0;i<scope.referenceOptions.length;i++){
              if(scope.referenceOptions[i][scope.data.displayReferenceAs] === scope.data.reference){
                scope.data.value = scope.referenceOptions[i]._id;
              }
            }
          };*/
        }
    
        /*### Mongoose Validation Type (model leads with _ or _?) ###*/
        function getModelSchema(cb){
          var referenceType;
          if(scope.kepsType.type[1] === '?'){
            referenceType = scope.kepsType.type.slice(2);
          }else{
            referenceType = scope.kepsType.type.slice(1);
          }
          $http.get($nkDataService.apiPrefix + 'models')
          .then(function(models){
            for(var x in models.data){
              if(x.toLowerCase() === referenceType || x === referenceType){
                return cb(null,models.data[x].schema);
              }
            }
          }, function(err){
            console.error(err);
            return cb(err);
          });
        }

        /*### TYPE: TIME STUFF ###*/
        if(scope.kepsType.type === 'time'){
          //populate select dropdowns
          scope.data.time = {};
          scope.data.selectHours = [];
          scope.data.selectMinutes = [];
          for(var i = 1; i < 13; i++){
            scope.data.selectHours.push(i);
          }
          for(i = 0; i < 60; i++){
            scope.data.selectMinutes.push(i);
          }

          if(scope.kepsModel && scope.kepsModel > 0){
            var minutes = scope.kepsModel / 60000;
            var hour = Math.floor(minutes/60);
            minutes = minutes % 60;
            var sign;
            if(hour === 0){
              sign = 'AM';
            }else if(hour < 12){
              sign = 'AM';
            }else if(hour > 11){
              sign = 'PM';
              hour = hour - 12;
            }
            scope.data.time.hour = hour;
            scope.data.time.minutes = minutes;
            scope.data.time.sign = sign; 
          }

          scope.timeToMs = function(){
            var time = 0;
            var hour, minute;
            if(!scope.data.time.hour){
              scope.data.time.hour = 0;
            }
            if(!scope.data.time.min){
              scope.data.time.min = 0;
            }
            if(!scope.data.time.sign){
              scope.data.time.sign = 'AM';
            }
            hour = Number(scope.data.time.hour);
            min = Number(scope.data.time.min);
            if(scope.data.time.sign === 'AM' && hour === 12){
              hour = 0;
            }else if(scope.data.time.sign === 'PM' && hour < 12){
              hour = hour + 12;
            }else{
            }
            minute = min || 0;
            time = hour * 60 + minute;
            scope.data.value = time * 60 * 1000;
          }

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
            scope.kepsModel = new Date(scope.data.date).getTime();
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
          var size = 0;
          for(var x in scope.kepsType.subSchema){
            size++;
          }
          if(size > 1){
            var obj = {};
            for (var i in scope.kepsType.subSchema) {
              if (scope.kepsType.subSchema[i].default) {
                obj[i] = scope.kepsType.subSchema[i].default;
              }
            }
            scope.showArrayItem[scope.data.value.length] = true;
            scope.data.value.push(JSON.parse(JSON.stringify(obj)));          
          }else{
            scope.showArrayItem[scope.data.value.length] = true;
            scope.data.value.push('');
          }
        };

        scope.removeArrayItem = function(index){
          scope.data.value.splice(index,1);
        };


        /*### TYPE: IMAGE STUFF ###*/
        if (scope.kepsType.type === 'image') {
          imageInputService(scope);
        }

        /*### TYPE: FILE stuff ###*/
        if(scope.kepsType.type === "file"){
          fileInputService(scope);
        }


        /*###TYPE: GEOPOINT stuff ###*/
        if(scope.kepsType.type === "geopoint"){
          geopointInputService(scope);
        }

       
        /*####TYPE: multi stuff####*/
        if(scope.kepsType.type==='multienum'){

          if(Array.isArray(scope.kepsModel)){
            scope.data.value = scope.kepsModel;
          } else{
            scope.data.value = [];
          }
          scope.checkMulti=function(opt){
            var ind = scope.data.value.indexOf(opt);
            if (ind > -1){
              scope.data.value.splice(ind, 1);
            } else {
              scope.data.value.push(opt);
            }
          };
          scope.inArray = function(specialty){
            if(scope.data.value.indexOf(specialty) > -1){
              return true;
            }else{
              return false;
            }
          }
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
            case('string'):return validatorService.stringValidation(scope);
            case('number'):return validatorService.numberValidation(scope);
            case('image'):return validatorService.fileValidation(scope);
            case('richText'):return validatorService.richTextValidation(scope);
            case('geopoint'):return validatorService.geopointValidation(scope);
            case('multienum'):return validatorService.multiValidation(scope);
            case('email'):return validatorService.emailValidation(scope);
          }
        };
      }
    };
  }]);