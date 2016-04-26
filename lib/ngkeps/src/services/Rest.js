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