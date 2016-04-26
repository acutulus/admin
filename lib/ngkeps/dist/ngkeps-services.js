angular.module('ngKeps', [])

.filter('keys', function() {
  return function(input) {
    if (!input) {
      return [];
    }
    return Object.keys(input);
  };
});


// add sync to restService and socketService


// finish sync
// test new sync code
// look at sync tree defaults
// make db admin flex and more like database
// make ajax content have contentToFind contentToReplace Animation(start with slide up, down, left, right)

angular.module('ngKeps')

.service('$nkAnalyticsService', ['$timeout', '$nkDataService',
  
  function($timeout, $nkDataService) {

    var publicMembers = {};
    var protectedMembers = {};

    protectedMembers.queue = [];
    protectedMembers.interval = 10000;


    // look in localstorage for user, if not found add the sessionID to tmpUserId;

    publicMembers.event = function(eventName, properties) {
      var trackObj = {
        action: 'track',
        event: name,
        properties: data,
        timestamp: (new Date()).toISOString()
      };
      if (userId) {
        trackObj.userId = userId;
      } else {
        trackObj.sessionId = sessionId;
      }
      queue.push(trackObj);
      // console.log('Tracking event', name, 'with data', data);
    };

    publicMembers.identify = function(key, traits) {
      var trackObj = {
        action: 'identify',
        traits: data,
        timestamp: (new Date()).toISOString()
      };
      if (key && key !== '') {
        userId = key;
        trackObj.userId = userId;
      } else {
        trackObj.userId = 'anonymousId';
      }
      queue.push(trackObj);
    };

    publicMembers.setInterval = function(interval) {
      protectedMembers.interval = interval;
    };

    protectedMembers.flush = function() {
      if (queue.length > 0) {
        var batchObj = {
          batch: queue,
        };
        var reqObj = JSON.parse(JSON.stringify(batchObj));
        queue = [];

        $http.post('/segment_io/import', reqObj)
        .then(function(){
          }, function(){
          });
      }

      protectedMembers.flushTimeout();
    };

    protectedMembers.flushTimeout = function() {
      $timeout(function() {
        protectedMembers.flush();
      }, protectedMembers.interval);
    };

    protectedMembers.flushTimeout();

    return publicMembers;
  }
]);

(function() {
var logoutHref = null;
var rootScope = {};
var apiPrefix = '/api/v1/';

angular.module('ngKeps').provider('$nkAuthService', [function () {
  var apiPrefix = "/api/v1/";

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.setLogoutHref = function(value) {
    logoutHref = value;
  };

  this.$get = [
  
  '$http',
  '$location',
  '$window',
  '$q',
  '$nkDataService',

  function($http, $location, $window, $q, $nkDataService) {
    var publicMembers = {};
    var user = false;
    var webalias = $location.host();
    
    publicMembers.showModal = function() {
      $nkModalService.show({content:'<div ng-app="ngkeps"><authorizationModal></authorizationModal></div>'});
    };

    publicMembers.start = function(scope){
      rootScope = scope;
      window.$http = $http;
      var userDeferred = $q.defer();
      try{
        user = JSON.parse($window.localStorage[webalias+'-user']);
      } catch (e){}
      if(user){
        $http.get(apiPrefix + 'users/me')
        .then(function(response){
          user = response.data;
          if (!user) {
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(user));
            userDeferred.resolve(user);
            scope.user = user;
          }
        }, function(err){
          if (!user) {
            userDeferred.reject(user);          
          } else {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
          }
        });
        scope.user = user;
        userDeferred.resolve(user);
      }
      return userDeferred.promise;
    };

    publicMembers.getUser = function(){
      return user;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          if(data.data === false){
            loginDeferred.reject();
          }else{
            var usr = data.data;
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
          }
        }, function(err) {
          loginDeferred.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return loginDeferred.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var loginDeferred = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(success) {
          var usr = success.data;
          if (usr === false) {
            loginDeferred.reject();
          } else {
            usr.expiration = Date.now();
            $window.localStorage.setItem(webalias+'-user', JSON.stringify(usr));
            user = usr;
            rootScope.user = user;
            loginDeferred.resolve(usr);
            }
          }, function(err) {
            loginDeferred.reject(err);        
          });
      } else {
        location.href = '/auth/'+provider;
      }
     
     return loginDeferred.promise;

    }

    publicMembers.logout =function(){
      delete $window.localStorage[webalias + '-user'];
      user = false;
    };

    publicMembers.getPaymentToken = function(){
      var token = $q.defer();
      $nkDataService.get("customers/token")
      .then(function(success){
        token.resolve(success.data);
      }, function(err){
        token.reject(err);
      });
      return token.promise;
    }

    publicMembers.checkout = function(){
      var transaction = $q.defer();
      $nkDataService.post("customers/checkoutWithPaymentMethod")
      .then(function(success){
        transaction.resolve(success.data);
      }, function(err){
        transaction.reject(err);
      });
      return transaction.promise;
    }

    publicMembers.checkPaymentMethod = function(){
      var method = $q.defer();
      $nkDataService.get('customers/checkPaymentMethod')
      .then(function(success){
        method.resolve(success.data);
      }, function(err){
        method.reject(err);
      });
      return method.promise;
    }

    publicMembers.firstTimeCheckout = function(nonce){
      var checkout = $q.defer();
      $nkDataService.post('customers/firstTimeCheckout', {'payment_method_nonce':nonce})
      .then(function(success){
        checkout.resolve(success.data);
      }, function(err){
        checkout.rejeoct(err);
      });
      return checkout.promise;
    }

    return publicMembers;
  }];
  
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
    var webalias = $location.host();

    return {
       request: function (config) {
          config.headers = config.headers || {};
          try{
            user = JSON.parse($window.localStorage[webalias+'-user']);
            if (user.token) {
               config.headers.Authorization = 'Bearer ' + user.token;
            }
          } catch (e){}

          return config;
       },
       response: function(res) {
        // should be urlPrefix
        console.log(res.config.url);
        if (res.config.url.indexOf(apiPrefix) === 0 || res.config.url.indexOf('/api/v1/') === 0) {
          console.log(res.headers('x-user-token-refresh'));
          if (res.headers('x-user-token-refresh')) {
            $window.localStorage.setItem(webalias+'-user', res.headers('x-user-token-refresh'));
            rootScope.user = JSON.parse(res.headers('x-user-token-refresh'));
          }
        }
        return res;
       },
       responseError: function (response) {
         if (response.status === 401 || response.status === 403) {
            delete $window.localStorage[webalias + '-user'];
            if (logoutHref) {
              $location.href = logoutHref;
            }
         }
         return $q.reject(response);
       }
    };
  }]);
}])

.run(['$nkAuthService', '$rootScope', function($nkAuthService, $rootScope) {
  $nkAuthService.start($rootScope);
}]);

})();

angular.module('ngKeps')

.service('$nkCacheService', [
  
  function() {

    // add last updated time to cahce objects
    
    var publicMembers = {};
    var protectedMembers = {};
    var storage = {
      get: function(key) {
        return JSON.parse(localStorage.getItem(key));
      },
      set: function(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
      },
      check: function(key) {
        return (typeof localStorage.getItem(key) !== 'undefined' && localStorage.getItem(key) !== null);
      }
    };

    var objects;
    var indexLoaded = 0;
    var objectsLoaded = 0;

    publicMembers.storage = storage;

    protectedMembers.init = function() {
      if (storage.check('objects')) {
        var objs = storage.get('objects');
        if (variable.constructor === Array) {
          publicMembers.loadCache(objs);
        }
      }
    };

    /**
      * @method clearCache
      */
    publicMembers.clearCache = function() {
      localStorage.clear();
      loc = location.href;
      loc = loc.substr(0, loc.indexOf('#'));
      location.href = loc;
    };

    /**
      * @method loadCacheObj
      */
    publicMembers.loadCacheObj = function(type, id) {
      if (storage.check(type+'-'+id)) {
        try {
          var obj = storage.get(type+'-'+id);
          objects[type].objects[id] = obj;
          objectsLoaded++;
        } catch (e) {
          console.log('Error on parse', e);
          console.log(type+'-'+id, storage.get(type+'-'+id));
        }
      } else {
        console.log('Object', type+'-'+id, ' in index but not cache');
      }
    };

    /**
      * @method loadCacheType
      */
    publicMembers.loadCacheType = function(type) {
      objects[type] = {'objects':{}, 'schema':{}, 'objectCallbacks':[], 'index':[], 'collection':[]};
      if (!(storage.check(type+'-count'))) {
        storage.set(type+'-count', 0);
      }
      if (storage.check(type+'-index')) {
        try {
          objects[type].index = storage.get(type+'-index');
          indexLoaded++;
          for (var j = 0; j < objects[type].index.length; j++) {
            publicMembers.loadCacheObj(type, objects[type].index[j]);
          }
        } catch (e) {
          console.log('Error on index parse', e);
          console.log(type+'-index', storage.get(type+'-index'));
        }
      }
    };

    /**
      * @method loadCache
      */
    publicMembers.loadCache = function(objectsArr) {
      for (var i = 0; i < objectsArr.length; i++) {
        publicMembers.loadCacheType(objectsArr[i]);
      }
      console.log('finished loading cache', indexLoaded, 'indexes loaded', objectsLoaded, 'objects loaded', (JSON.stringify(localStorage).length/2500000)+'% of cache used');
    };

    /**
      * @method inCache
      */
    publicMembers.inCache = function(type, id) {
      if (id in objects[type].objects) {
        return true;
      } else {
        return false;
      }
    };

    /**
      * @method addObj
      */
    publicMembers.addObj = function(type, obj, dt, pending) {
      object._pending = pending;
      if (object._id in objects[objectType].objects) {
        objects[objectType].objects[object._id] = angular.extend(objects[objectType].objects[object._id], object);
      } else {
        objects[objectType].objects[object._id] = object;
      }
      protectedMembers.runObjectCallbacks(objectType, objects[objectType].objects[object._id]);
      if (!('objects-'+objectType+'-'+object._id in localStorage)) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)+1;
        localStorage[objectType+'Count'] = parseInt(localStorage[objectType+'Count'])+1;
      }
      localStorage['objects-'+objectType+'-'+object._id] = JSON.stringify(objects[objectType].objects[object._id]);
      if (objects[objectType].index.indexOf(object._id) === -1) {
        objects[objectType].index.push(object._id);
        localStorage['objects-'+objectType+'-index'] = JSON.stringify(objects[objectType].index);
      }
      if (serverdt !== false) {
        localStorage['objects-'+objectType+'-dt'] = serverdt;
      }
      return objects[objectType].objects[object._id]
    };

    /**
      * @method addArray
      */
    publicMembers.addArray = function(type, arr, dt, pending) {
      var output = [];
      for (var i = 0; i < array.length; i++) {
        publicMembers.addObject(type, arr[i], dt, pending);
        output.push(objects[objectType].objects[array[i]._id]);
      }
      return output;
    };

    /**
      * @method removeObj
      */
    publicMembers.removeObj = function(type, id, dt) {
      if (id in objects[type].objects) {
        delete objects[type].objects[id];
      }
      if ('objects-'+type+'-'+id in localStorage) {
        localStorage.objectsCount = parseInt(localStorage.objectsCount)-1;
        localStorage[type+'-count'] = parseInt(localStorage[type+'-count'])-1;
        delete localStorage[type+'-'+id]
      }
      var ind = objects[type].index.indexOf(id);
      if (ind != -1) {
        objects[type].index = objects[type].index.splice(ind, 1);
        localStorage[type+'-index'] = JSON.stringify(objects[type].index);
      }
      if (serverdt !== false) {
        localStorage[type+'-dt'] = dt;
      }
    };

    /**
      * @method getObj
      */
    publicMembers.getObj = function(type, id) {
      return objects[type].objects[id];
    };

    /**
      * @method getObjCount
      */
    publicMembers.getObjCount = function(type) {
      if (type in objects) {
        return objects[type].count;
      } else {
        return 0;
      }
    };

    /**
      * @method getObjectIndex
      */
    publicMembers.getObjectIndex = function(type) {
      if (type in objects) {
        return objects[type].index;
      } else {
        return [];
      }
    };

    /**
      * @method getCollection
      */
    publicMembers.getCollection = function(type) {
      if (type in objects) {
        return objects[type].collection;
      } else {
        return [];
      }
    };

    /**
      * @method getSyncObject
      */
    publicMembers.getSyncObject = function(type, id) {
      var output = {};
      if (typeof id !== 'undefined') {
        if (type in objects && id in objects[type].objects) {
          output[type] = {};
          output[type][id] = objects[type].objects[id];
        }
      } else if (typeof type !== 'undefined' && type in objects) {
        output[type] = {};
        for (var i = objects[type].collection.length - 1; i >= 0; i--) {
          output[type][objects[type].collection[i]._id] = objects[type].collection[i]._v;
        }
      } else {
        for (var x in objects) {
          output[x] = {};
          for (var i = objects[x].collection.length - 1; i >= 0; i--) {
            output[x][objects[x].collection[i]._id] = objects[x].collection[i]._v;
          }          
        }
      }
      return output;
    };

     /**
      * @method getTypes
      */
    publicMembers.getTypes = function() {
      var output = [];
      for (var x in objects) {
        output.push(x);
      }
      return output;
    };   

     /**
      * @method getTypes
      */
    publicMembers.addType = function(name, schema) {
      if (type in objects) {
        // update schema
      } else {
        // add type
      }
    };   


    /**
      * @method loadPostProcessObject
      */
    publicMembers.loadPostProcessObject = function(objectType, callback) {
      dataServiceReadyDeferred.promise.then(function() {
        objects[objectType].objectCallbacks.push(callback);
      });
    };

    protectedMembers.runObjectCallbacks = function(objectType, object) {
      var deferred = $q.defer();
      var promises = [];
      for (var i = 0; i < objects[objectType].objectCallbacks.length; i++) {
        promises.push(objects[objectType].objectCallbacks[i](object));
      }
      $q.all(promises).then(function() {
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.init();

    return publicMembers;
  }
]);

angular.module('ngKeps')

.service('$nkDataService',['$nkSocketService', '$nkRestService', function($socket, $rest){
  if (!$socket.error) {
    return $socket;
  } else {
    return $rest;
  }
}]);

"use strict";

angular.module('ngKeps')

.service('$nkModalService', [

  '$window',
  '$document',

  function($window, $document) {
    var closecb = null;

    var overlay;
    var content_fixed;
    var popbox;
    var overlay_wrapper;


    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    }

/*
<overlay_wrapper>
    <overlay>
</
<content_fixed>
    <popbox>
</
*/

    function init() {
        overlay = $document[0].createElement('div');
        content_fixed = $document[0].createElement('div');
        popbox = $document[0].createElement('div');
        overlay_wrapper = $document[0].createElement('div');
        content_fixed.id = 'ngkeps_content_fixed';
        content_fixed.setAttribute('style', 'position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);opacity:1;z-index:2003;background-color:white; border-radius: 6px;padding: 20px 30px;');
        popbox.id = 'ngkeps_popbox';
        overlay_wrapper.id = "ngkeps_overlay_wrapper";
        overlay_wrapper.setAttribute('style', 'position:absolute;top:0;bottom:0;left:0;right:0;z-index:2002;');
        overlay.id = "ngkeps_overlay";
        overlay.setAttribute('style', 'position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.3;width:100%;height:100%;background-color:black;z-index:2002;');
        overlay_wrapper.appendChild(overlay);
        content_fixed.appendChild(popbox);
        $document[0].body.appendChild(overlay_wrapper);
        $document[0].body.appendChild(content_fixed);
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        overlay_wrapper.addEventListener('click', hide);
        on($window, 'keypress', function(e) {
            //kill pop if button is ESC ;)
            if (e.keyCode == 27) {
                hide();
            }
        });
    }

    var show = function(config) {
        if (config) {
            var html = '<button type="button" class="close" onclick="window._ngkeps_model_hide(\'top_close\')" style="border: 1px solid #fff;border-radius: 15px;width: 32px;height: 32px;right: 0px;position: absolute;outline: none;color: #fff;transition: all 0.6s ease 0s;-webkit-transition: all 0.6s ease 0s;-moz-transition: all 0.6s ease 0s;-o-transition: all 0.6s ease 0s;-ms-transition: all 0.6s ease 0s;-webkit-backface-visibility: hidden;opacity: 0.6;filter: alpha(opacity=60);top: -40px;margin-top: -2px;"><span style="position: relative;top: -2px;">x</span></button>';

            if (typeof config.class == 'string' && config.class) {
                popbox.setAttribute('class', config.class);
            }
            if (config.keepLayout && (!config.class)) {
                popbox.setAttribute('style', 'position:relative;height:300px;width:300px;background-color:white;opacity:1;');
            }

            if (typeof config.content == 'string' && config.content && config.source == 'html') {
                html += config.content;
            }

            if (typeof config.content == 'string' && config.content && config.source == 'div') {
                html += $document[0].getElementById(config.content) ? $document[0].getElementById(config.content).innerHTML : config.content;
            }
            var buttons = '';
            if (config.buttons) {
                for (var i = 0; i < config.buttons.length; i++) {
                    if (typeof config.buttons[i] === 'object') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i].label+'\')" class="'+config.buttons[i].class+'" style="margin-left: 10px;">'+config.buttons[i].label+'</button>';
                    } else if (typeof config.buttons[i] === 'string') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i]+'\')" class="btn" style="margin-left: 10px;">'+config.buttons[i]+'</button>';
                    }
                }                
            }
            if (buttons !== '') {
                html += '<div style="text-align: right;padding-top: 10px;margin-top: 10px;">'+buttons+'</div>';
            }
            popbox.innerHTML = html;
        }
        overlay_wrapper.style.display = '';
        overlay.style.display = '';
        content_fixed.style.display = '';
        closecb = config.close;
    };

    var hide = $window._ngkeps_model_hide = function(button) {
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        if (closecb) {
            closecb(button);
        }
    };

    //init on window loaded
    init();

    return {
        show:show,
        hide:hide
    };
}]);
angular.module('ngKeps').provider('$nkRestService', function () {
  var apiPrefix = '/api/v1/';

  this.setApiPrefix = function(value) {
    apiPrefix = value;
  };

  this.$get = ['$http', '$q', "$nkCacheService",  function($http, $q, $cacheService) {
    var publicMembers = {};
    var protectedMembers = {};
    //cache will store objects keyed by:
    //1. list of items keyed by name of db
    //2. single item keyed by objectId
    //3. list of items keyed by name of db concat with query
    var cache = {};

    publicMembers.apiPrefix = apiPrefix;
    
    var inCache = function(objectType, condition, type){
      //no query or id, return full list of objects or nothing
      if(!condition){
        if(cache[objectType]){
          return cache[objectType];
        }else{
          return false;
        }       
      }
      //data is keyed by objectID
      else if(type === 'id'){
        if(cache[condition]){
          return cache[condition];
        }else{
          return false;
        }
      //data is keyed by objectType + query
      }else if(type === 'query'){
        var key = objectType + JSON.stringify(condition);
        if(cache[key]){
          return cache[key];
        }else{
          return false;
        }
      }
    };

    /**
    * @method create - http Post to server
    */
    publicMembers.post = publicMembers.create = function(objectType, object) {
      var defer = $q.defer(); 
      $http.post(apiPrefix + objectType, object)
      .then(function(data) {
        defer.resolve(data.data);
      }, function(err) {
        defer.reject(err);
      });      
      return defer.promise;
    };

    /**
    * @method update
    */
    publicMembers.put = publicMembers.update = function(objectType, object) {
      var defer = $q.defer();
      $http.put(apiPrefix + objectType + '/' + object._id, object)
      .then(function(data){
        defer.resolve(data.data);    
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method delete
    */
    publicMembers.delete = function(objectType, object) {
      var defer = $q.defer();
      $http.delete(apiPrefix + objectType + '/' + object._id)
      .then(function(data){
        defer.resolve(data.data);      
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    };

    /**
    * @method read - http get object by Id
    * 
    */
    //will get objectID item if provided or get all if no object ID
    publicMembers.get = publicMembers.read = function(objectType, objectId, useCache) {

      var defer = $q.defer();
      //get all items from model
      if (!objectId) {
        if(!useCache || !cacheData.hasOwnProperty(objectType)){
          $http.get(apiPrefix + objectType)
          .then(function(data){
            defer.resolve(data);
            cache[objectType] = data;
          }, function(err){
            defer.reject(err);
          });
        }else{
          defer.resolve(cacheData[objectType]);
        }
      //get specific id from model
      } else {
        var cacheData = false;
        //check if specific objectId exists in cache
        if(useCache === 'undefined' || useCache === true){
          cacheData = inCache(objectType, objectId, 'id');
        }
        if(cacheData){
          defer.resolve(cacheData);
        }else{
          $http.get(apiPrefix + objectType + '/' + objectId)
          .then(function(data){
            defer.resolve(data);
            cache[objectId] = data;       
          },function(err){
            defer.reject(err);
          });
        }        
      }
      return defer.promise;
    };

    /**
    * @method Query - http get single item from DB
    * @property query - hash where each item appended as key=value to url
    */
    publicMembers.query = function(objectType, query, useCache) {
      var defer = $q.defer();
      var cacheData = false;
      if(useCache === 'undefined' || useCache === true){
        cacheData = inCache(objectType, query, 'query');
      }
      if(cacheData){
        defer.resolve(cacheData);
      }else{
        var url = apiPrefix + objectType;
        if(query){
          url += '?query=' + JSON.stringify(query);
        }
        $http.get(url)
        .then(function(data){
          defer.resolve(data.data);
          if(query){
            var key = objectType + JSON.stringify(query);
            cache[key] = data;
          }else{
            cache[objectType] = data;
          }
        }, function(err){         
          defer.reject(err);
        });
      }
      return defer.promise; 
    };

    /**
    * @method runCommand
    */
    publicMembers.call = function(cmd, data) {
      var defer = $q.defer();

      var method = cmd.substr(0, cmd.indexOf('.')).toLowerCase();
      cmd = cmd.substr(cmd.indexOf('.')+1);
      var objectType = cmd.substr(0, cmd.indexOf('.'));
      cmd  = cmd.substr(cmd.indexOf('.')+1);
  
      var url = apiPrefix + objectType + 's/' + cmd;
      if (objectType in data) {
        var restId;
        if (typeof data[objectType] === 'object' && _id in data[objectType]) {
          restId = data[objectType]._id;
        } else {
          restId = data[objectType]; 
        }
        url = apiPrefix + objectType + 's/' + restId + '/' + cmd;
      }

      if (method === 'get' || method === 'delete') {
        var serialize = function(obj, prefix) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push(typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
          }
          return str.join("&");
        };
        url += '?' + serialize(data);
        $http[method](url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else if (method === 'post' || method === 'put') {
        $http[method](url, data)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      } else {
        $http.get(url)
          .then(function(data){
            defer.resolve(data.data);
          }, function(err){         
            defer.reject(err);
          });
      }
/*
      $http.post(apiPrefix + 'kepscall', {cmd:cmd, data:data})
        .then(function(data){
          defer.resolve(data.data);
        }, function(err){         
          defer.reject(err);
        });

*/
      return defer.promise; 
    };

    /**
     * @method sync
     */
    publicMembers.sync = function(type, id) {
      var defer = $q.defer();

      if (typeof type !== 'undefined') {
        var data = $cacheService.getSyncObject(type, id);
        $http.post('/' + type + '/sync', data).success(function(data){
          // add data to cache
          defer.resolve();
        }).error(function(){
          defer.reject();
          console.log('Get - Failed to retrieve data');
        });
      } else {
        var types = $cacheService.getTypes;
        var promises = [];
        for (var i = types.length - 1; i >= 0; i--) {
          promises.push(publicMembers.sync(types[i]));
        }
        $q.all(promises).then(function() {
          defer.resolve();
        });
      }

      return defer.promise;
    };

    publicMembers.loginWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signin', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    publicMembers.signupWithProvider = function(provider, data) {
      var defer = $q.defer();

      if (provider === 'local') {
        $http.post(apiPrefix + 'users/signup', data)
        .then(function(data) {
          defer.resolve(data.data);
        }, function(err) {
          defer.reject(err.data);
        });
      } else {
        location.href = '/auth/'+provider;
      }

      return defer.promise;
    };

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    return publicMembers;
  }];
  
});
angular.module('ngKeps')

.service('$nkSocketService', [

  '$window',
  '$timeout',
  '$q',
  '$nkCacheService',

  function($window, $timeout, $q, $cacheService) {
    if (!$window.io) {
      return {'error':'socket.io not available'};
    }

    var publicMembers = {};
    var protectedMembers = {};

    var socket;
    var backendVersion = 0;
    var supportedBackendVersions = 1;
    
    var socketCommands = [];
    var requests = {};
    var webalias = '';

    var requestId = 0;
    var reconnection_delay = 2000;
    var reconnectInterval;
    var reconnectingEnabled = true;
    var appScope;
    var initalConnectionTimeout;

    var loadUserDeferred = null;
    var socketConnectedDeferred = null;
    var loginDeferred = null;
    var pendingRequests = {};
    var offlineRequests = [];

    var lastRequestSent;
    var lastRequestReceived;
    var numberOfOutstandingRequests = 0;
    var numberOfRequests = 0;
    var cacheHit = 0;
    var storageCacheHit = 0;
    var duplicateRequest = 0;
    var requestsReceived = [];
    $window.socket = socket;

    var nestedLoadingRequests = [];
    var loadingObjects = false;

    var serviceStartedDeferred = $q.defer();
    var logoutCallback = function() {};
    var resync = false;


    // add object before run callbacks
    // Strip out none schema fields before caching objects
    // add mutable, pendable, offlineable to schemas
    // in schema's override _id, _created, _updated

    /**
     * @method getStatus
     */
    publicMembers.getStatus = function() {
      var output = {};
      output.lastRequestSent = lastRequestSent;
      output.lastRequestReceived = lastRequestReceived;
      output.numberOfOutstandingRequests = numberOfOutstandingRequests;
      output.numberOfRequests = numberOfRequests;
      output.cacheHit = cacheHit;
      output.requestsReceived = requestsReceived;
      output.duplicateRequest = duplicateRequest;
      return output;
    };

    /**
     * @method clearCache
     */
    publicMembers.clearCache = function(everything) {
      var loc;
      if (everything) {
        $cacheService.clearCache();
      } else {
        $cacheService.clearCache();
      }
    };

    /**
     * @method connect
     */
    publicMembers.start = function(scope, weba, version) {
      socketConnectedDeferred = $q.defer();

      appScope = scope;
      webalias = weba;
      appScope.connected = false;
      appScope.reconnect = false;
      appScope.cacheLoaded = false;
      supportedBackendVersions = version;
      
      serviceStartedDeferred.resolve();

      protectedMembers.setupSocket();

      return socketConnectedDeferred.promise;
    };

    /**
     * @method loginWithProvider
     */
    publicMembers.loginWithProvider = function(provider, data) {
      if (loginDeferred === null) {
        loginDeferred = $q.defer();
      }
      socketConnectedDeferred.promise.then(function() {
        socket.emit('login', {provider:provider, data:data, device:appScope.device});
      });
      return loginDeferred.promise;
    };

    /**
     * @method logout
     */
    publicMembers.logout = function() {
      socketConnectedDeferred.promise.then(function() {
        socket.emit('logout.me', {device:appScope.device});
      });
    };


    /**
     * @method add
     */
    publicMembers.add = function(objectType, object) {
      var cmd = 'post.'+objectType+'.create';
      var deferred = $q.defer();

      if (!('_id' in object)) {
        object._id = uuid.v4().replace(/-/g, '').substring(0, 24);
      }
      object._pending = true;
      protectedMembers.addObject(objectType, object, false, true);

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No create command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'post',
            payload: {
              objectType:objectType,
              object:object
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method update
     */
    publicMembers.update = function(objectType, object) {
      var cmd = 'put.'+objectType+'.update';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            var obj = {
              objectType:objectType,
              object:object,
              reqKey: reqKey
            };
            obj[objectType] = object._id;
            socket.emit(cmd, obj);
          } else {
            deferred.reject('No update command on server');
          }
        } else {
          var payload = {
            objectType:objectType,
            object:object
          };
          payload[objectType] = object._id;
          offlineRequests.push({
            method:cmd,
            restMethod:'put',
            payload: payload,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method delete
     */
    publicMembers.delete = function(objectType, object) {
      var cmd = 'delete.'+objectType+'.delete';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit('delete.object', {objectType:objectType, object:object, reqKey: reqKey});
          } else {
            deferred.reject('No delete command on server');
          }
        } else {
          console.log('TODO can not delete objects while offline');
          deferred.reject('TODO can not delete objects while offline');
        }
      });
      return deferred.promise;
    };

    /**
     * @method get
     */
    publicMembers.get = function(objectType, objectId) {
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (objectType in objects) {
          if (objectId in objects[objectType].objects) {
            cacheHit++;
            deferred.resolve(objects[objectType].objects[objectId]);
          } else if ('objects-'+objectType+'-'+objectId in localStorage && !appScope.connected) {
            storageCacheHit++;
            deferred.resolve(JSON.parse(localStorage['objects-'+objectType+'-'+objectId]));
            console.log('Warning: Object requested before cache loaded', objectType+'-'+objectId);
            /*
            // not necessary yet
            offlineRequests.push({
              method:'track',
              restMethod:'get',
              methodLong:'track.object',
              objectType:objectType,
              objectId:objectId,
              deferred: null
            });
            */
          } else if (pendingRequests[cmd+'-'+objectType+'-'+objectId]){
            duplicateRequest++;
            return pendingRequests[cmd+'-'+objectType+'-'+objectId];
          } else if (loadingObjects) {
            nestedLoadingRequests.push({
              objectType:objectType,
              objectId:objectId,
              deferred:deferred
            });
          } else {  
            pendingRequests[cmd+'-'+objectType+'-'+objectId] = deferred.promise;
            var payload = {
              objectType:objectType
            };
            payload[objectType] = objectId;

            if (appScope.connected) {
              if (socketCommands.indexOf(cmd)) {
                payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
                socket.emit(cmd, payload);
              } else {
                deferred.reject('No read command on server');
              }
            } else {
              offlineRequests.push({
                method:cmd,
                restMethod:'get',
                payload: payload,
                deferred: deferred
              });
            }
          }
        } else {
          deferred.reject('Not registered for object type '+objectType);
        }
      });
      return deferred.promise;
    };

    /**
     * @method getIds
     */
    publicMembers.getArray = function(objectType, objectIds) {
      // TODO look up each in cache and then only request the ones needed
      var cmd = 'get.'+objectType+'.read';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        var payload = {
          objectType:objectType
        };
        payload[objectType] = objectIds;

        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            payload.reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, payload);
          } else {
            deferred.reject('No read command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'read',
            payload: payload,
            deferred: deferred
          });
        }
      });

      return requests[reqKey].promise;
    };

    /**
     * @method getQuery
     */
    publicMembers.getQuery = function(objectType, query) {
      var cmd = 'get.'+objectType+'.query';
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            var reqKey = protectedMembers.getReqKey(cmd, deferred);
            socket.emit(cmd, {objectType:objectType, query:query, reqKey: reqKey});
          } else {
            deferred.reject('No query command on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'get',
            payload: {
              objectType:objectType,
              query:query
            },
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };

    /**
     * @method localQuery
     */
    publicMembers.localQuery = function(objectType, query) {
      var deferred = $q.defer();
      serviceStartedDeferred.promise.then(function() {
        var output = [];
        for (var i in objects[objectType].objects) {
          /*
          var add = false;
          if (query) {
            var path;
            var count = 0;
            for (path in query) {
              count++;
              var values = findValues(obj, path);
              var i;
              var reject = false;
              for (i = 0; i < values.length; i++) {
                if (values[i] === query[path]) {
                  add++;
                  break;
                }
              }
            }
            if (add === count) {
              add = true;
            } else {
              add = false;
            }
          } else {
            add = true;
          }
          if (add) {
            */
            output.push(objects[objectType].objects[i]);
          //}
        }
        deferred.resolve(output);
      });
      return deferred.promise;
    };

    /**
     * @method runCommand
     */
    publicMembers.runCommand = function(cmd, data) {
      var deferred = $q.defer();

      serviceStartedDeferred.promise.then(function() {
        if (appScope.connected) {
          if (socketCommands.indexOf(cmd) !== -1) {
            data.reqKey = protectedMembers.getReqKey('callback', deferred);
            console.log('*** emit', cmd, data);
            socket.emit(cmd, data);
          } else {
            deferred.reject('No command "' + cmd + '"on server');
          }
        } else {
          offlineRequests.push({
            method:cmd,
            restMethod:'callback',
            payload: data,
            deferred: deferred
          });
        }
      });
      return deferred.promise;
    };  

    /**
     * @method loadPostProcessObject
     */
    publicMembers.loadPostProcessObject = $cacheService.loadPostProcessObject;

    /**
     * @method sync
     */
    publicMembers.sync = function(user) {
      var payload = {};
      payload.objects = $cacheService.getSyncObject();
      if (user) {
        payload.user = user;
      }
      socket.emit('sync', payload);
    };

    protectedMembers.findValues = function(obj, key, path, memo) {
      _.isArray(memo) || (memo = []);
      _.isString(path) || (path = '');
      _.forOwn(obj, function(val, i) {
        if (path+i === key) {
          memo.push(val);
        } else {
          findValues(val, key, (_.isArray(obj) ? path : path+i+'.'), memo);
        }
      });
      return memo;
    };

    protectedMembers.initalConnect = function() {
      console.log('trying to connect');
      if (socket) {
        socket.io.connect();
      } else {      
        $window.socket = socket = io.connect('http://'+webalias+'/',{
          'sync disconnect on unload': false,
          'reconnect': false,
          'transports': ['websocket', 'polling']
        });
      }
      initalConnectionTimeout = $timeout(function() {
        if (!appScope.connected) {
          reconnectingEnabled = false;
          if(reconnectInterval) {
            clearInterval(reconnectInterval);
          }
          // if (offlinemode) {
            protectedMembers.initalConnect();
          //} else {
          //  socketConnectedDeferred.reject();            
          //}
        }
      }, 15000);
    };

    protectedMembers.addObjects = function(objects, serverdt) {
      var deferred = $q.defer();
      var promises = [];
      var i, j;
      nestedLoadingRequests = [];
      loadingObjects = true;

      for (i in objects) {
        for (j = 0; j < objects[i].length; j++) {
          promises.push(protectedMembers.addObject(i, objects[i][j], serverdt, false));
        }
      }

      if (nestedLoadingRequests.length > 0) {
        protectedMembers.runNestedLoadingRequests();
      }

      $q.all(promises).then(function() {
        loadingObjects = false;
        deferred.resolve();
      });
      return deferred.promise;
    };

    protectedMembers.runNestedLoadingRequests = function() {
      for (var i = 0; i < nestedLoadingRequests.length; i++) {
        var req = nestedLoadingRequests[i];
        if (req.objectId in objects[req.objectType].objects) {
          req.deferred.resolve(objects[req.objectType].objects[req.objectId]);
        } else {
          publicMembers.get(req.objectType, req.objectId).then(function(obj) {
            req.deferred.resolve(obj)
          });
        }
      }
    };

    protectedMembers.getReqKey = function(msg, deferred) {
      var key = msg+'-'+socket.io.engine.id+'-'+requestId;
      requests[key] = deferred;
      lastRequestSent = key;
      requestId++;
      numberOfRequests++;
      numberOfOutstandingRequests++;
      return key;
    };

    protectedMembers.processReqKey = function(reqKey, payload, objectType) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].resolve(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
        if (objectType === 'objects') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' objects');
        } else if (objectType === 'callback') {
          requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' callback');
        } else if (typeof payload === 'object') {
          if (Object.prototype.toString.call(payload) === '[object Array]') {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' array');
          } else if ('_id' in payload) {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' '+payload._id);
          } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
          }
        } else {
            requestsReceived.push(reqKey.substr(0, reqKey.indexOf('-'))+' '+objectType+' unknown');
        }
      }
    };

    protectedMembers.rejectReqKey = function(reqKey, reason) {
      if (reqKey in requests) {
        lastRequestReceived = reqKey;
        requests[reqKey].reject(payload);
        numberOfOutstandingRequests--;
        delete requests[reqKey];
      }
    };

    protectedMembers.flushOfflineRequests = function() {
      if (offlineRequests.length > 0) {
        var i;
        for (i = 0; i < offlineRequests.length; i++) {
          var o = offlineRequests[i];
          if (o.objectType in objects && o.objectId in objects[o.objectType].objects && o.restMethod === 'get') {
            if (o.deferred !== null) {
              o.deferred.resolve(objects[o.objectType].objects[o.objectId]);                
            }
          } else {
            if (socketCommands.indexOf(o.method)) {  
              var reqKey = protectedMembers.getReqKey(o.method, o.deferred);
              o.payload.reqKey = reqKey;
              socket.emit(o.method, o.payload);
            } else {
              o.deferred.reject('Command not on server');
            }
          }
        }
      }
      offlineRequests = [];
    };

    protectedMembers.setupSocket = function() {
      protectedMembers.initalConnect();
      socket.on('error', function (data) {
        console.error('Socket Error', JSON.stringify(data));
      });
      socket.on('disconnect', function (data) {
        appScope.connected = false;
        resync = true;
        if (reconnectingEnabled) {
          reconnectInterval = setInterval(function() {
            socket.io.connect();
          }, reconnection_delay);
        }
      });
      socket.on('reconnect', function (data) {
      });
      socket.on('reconnecting', function (data) {
        if (reconnectingEnabled) {
          appScope.reconnect = true;
        }
      });
      socket.on('connect', function (data) {
        console.log('connected');
        if(reconnectInterval) {
          clearInterval(reconnectInterval);
        }
        $timeout.cancel(initalConnectionTimeout);

        socket.emit('client.register', {'device':appScope.device});

        appScope.$safeApply(function() {
          appScope.connected = true;
          if (resync && appScope.user) {
            publicMembers.loadUser();
          }
          appScope.reconnect = false;
        });
      });
      socket.on('client.objects', function (data) {
        backendVersion = data.backendVersion;
        if (backendVersion > supportedBackendVersions) {
          socketConnectedDeferred.reject('backendVersion');
        } else {
          for (var i in data.objects) {
            $cacheService.addType(i, data.objects[i].schema);
          }
          $cacheService.storage.set('commands', data.commands);
          socketCommands = data.commands;
          socketConnectedDeferred.resolve();
          publicMembers.sync();
        }
      });
      socket.on('err', function (data) {
        if (data.func.indexOf('get.me') !== -1) {
          loadUserDeferred.reject();
          if (resync) {
            resync = false;
            logoutCallback();
          }
        }
        if (data.reqKey) {
          protectedMembers.rejectReqKey(data.reqKey, data.message);
        }
        console.error('Socket Server Error', JSON.stringify(data));
      });

      socket.on('get.me', function (data) {
        resync = false;
        appScope.user = data.user;
        objects.user.objects[data.user._id] = data.user;
        protectedMembers.addObject('user', data.user, data.dt, false);

        if (data.objects) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            protectedMembers.flushOfflineRequests();
            loadUserDeferred.resolve();
          });  
        } else {
          protectedMembers.flushOfflineRequests();
          loadUserDeferred.resolve();
        }
      });

      socket.on('login.successful', function (data) {
        loginDeferred.resolve(data);
        publicMembers.sync();
      });
      socket.on('login.unsuccessful', function (data) {
        loginDeferred.resolve(false);
      });

      socket.on('remove', function (data) {
        if (data.objectType in objects) {
          protectedMembers.removeObject(data.objectType, data.object, data.dt);
          if (data.reqKey) {
            protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
          }
        }
      });

      socket.on('update', function (data) {
        if (data.objectType in objects) {
          if ('object' in data) {
            if (Object.prototype.toString.call(data.object) === '[object Array]') {
              var output = protectedMembers.addArray(data.objectType, data.object);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, output, data.objectType);
              }
            } else {
              protectedMembers.addObject(data.objectType, data.object, data.dt, false);
              if (data.reqKey) {
                protectedMembers.processReqKey(data.reqKey, objects[data.objectType].objects[data.object._id], data.objectType);
                var cmd = data.reqKey.substring(0, data.reqKey.indexOf('-'));
                if (cmd+'-'+data.objectType+'-'+data.objectId in pendingRequests) {
                  delete pendingRequests[cmd+'-'+data.objectType+'-'+data.objectId];              
                }
              }
            }
          }
        }
        if ('objects' in data) {
          protectedMembers.addObjects(data.objects, data.dt).then(function() {
            if (data.reqKey) {
              protectedMembers.processReqKey(data.reqKey, output, 'objects');
            }
          });
        }
      });

      socket.on('callback', function (data) {
        if (data.reqKey) {
          protectedMembers.processReqKey(data.reqKey, data.payload, 'callback');
        }
      });

    };

    return publicMembers;

  }
 ]);



/*
Socket security code, too be implemented later, please remove winston and underscore if you can
+ remove timeout so users can get through login screen

var _ = require('underscore');
var winston = require('winston');

function forbidConnections(nsp) {
  //Set a listener so connections from unauthenticated sockets are not
  //considered when emitting to the namespace. The connections will be
  //restored after authentication succeeds.

  nsp.on('connection', function(socket){
    if (!socket.auth) {
      winston.debug("removing socket from", nsp.name);
      delete nsp.connected[socket.id];
    }
  });
}

function restoreConnection(nsp, socket) {
  // If the socket attempted a connection before authentication, restore it.
  if(_.findWhere(nsp.sockets, {id: socket.id})) {
    winston.debug("restoring socket to", nsp.name);
    nsp.connected[socket.id] = socket;
  }
}

module.exports = function(io, config){
  //Adds connection listeners to the given socket.io server, so clients
  //are forced to authenticate before they can receive events.

  var config = config || {};
  var timeout = config.timeout || 1000;
  var postAuthenticate = config.postAuthenticate || function(){};

  _.each(io.nsps, forbidConnections);
  io.on('connection', function(socket){
    
    socket.auth = false;
    socket.on('authentication', function(data){
      
      config.authenticate(data, function(err, success){
        if (success) {
          winston.debug("Authenticated socket ", socket.id);
          socket.auth = true;
          _.each(io.nsps, function(nsp) {
            restoreConnection(nsp, socket);
          });
          socket.emit('authenticated');
          return postAuthenticate(socket, data);
        }
        socket.disconnect('unauthorized', {err: err});
      });

    });

    setTimeout(function(){
      //If the socket didn't authenticate after connection, disconnect it
      if (!socket.auth) {
        winston.debug("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, timeout);

  });
}
*/