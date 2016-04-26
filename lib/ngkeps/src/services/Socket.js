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