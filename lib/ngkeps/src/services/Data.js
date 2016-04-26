angular.module('ngKeps')

.service('$nkDataService',['$nkSocketService', '$nkRestService', function($socket, $rest){
  if (!$socket.error) {
    return $socket;
  } else {
    return $rest;
  }
}]);
