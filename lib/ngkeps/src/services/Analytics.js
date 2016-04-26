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
