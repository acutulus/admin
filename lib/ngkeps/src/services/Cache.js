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
