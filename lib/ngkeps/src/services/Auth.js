(function() {
var logoutHref = null;
var rootScope = {};
var apiPrefix = '/api/v1/';

angular.module('ngKeps').provider('$nkAuthService', [function () {

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
  '$nkModalService',
  '$rootScope',
  '$compile',

  function($http, $location, $window, $q, $nkDataService, $nkModalService, $rootScope, $compile) {
    var publicMembers = {};
    var user = false;
    var webalias = $location.host();
    
    publicMembers.showModal = function(cb) {
      if (user) {
        cb(user);
      } else {
        newElement = $compile("<authorizationmodal></authorizationmodal>")($rootScope);
        $nkModalService.show({content:newElement, source:'angular-element', close:function() {
          cb(user);
        }});        
      }
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
      var parser = document.createElement('a');
      parser.href = apiPrefix;

      $http.get(parser.origin + '/api/config')
      .then(function(response){
        $rootScope.config = response.data;
      }, function(err){
        alert('server down');
      });
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
        location.href = apiPrefix+'oauths/'+provider;
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
    };

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
    };

    publicMembers.checkout = function(){
      var transaction = $q.defer();
      $nkDataService.post("customers/checkoutWithPaymentMethod")
      .then(function(success){
        transaction.resolve(success.data);
      }, function(err){
        transaction.reject(err);
      });
      return transaction.promise;
    };

    publicMembers.checkPaymentMethod = function(){
      var method = $q.defer();
      $nkDataService.get('customers/checkPaymentMethod')
      .then(function(success){
        method.resolve(success.data);
      }, function(err){
        method.reject(err);
      });
      return method.promise;
    };

    publicMembers.firstTimeCheckout = function(nonce){
      var checkout = $q.defer();
      $nkDataService.post('customers/firstTimeCheckout', {'payment_method_nonce':nonce})
      .then(function(success){
        checkout.resolve(success.data);
      }, function(err){
        checkout.rejeoct(err);
      });
      return checkout.promise;
    };

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
        var url = document.createElement('a');
        url.href = res.config.url;
        var prefixurl = document.createElement('a');
        prefixurl.href = apiPrefix;
        if (url.href.indexOf(prefixurl.href) === 0) {
          console.log(res.config.url);
          if (res.headers('x-user-token-refresh')) {
            try{
                $window.localStorage.setItem(webalias+'-user', res.headers('x-user-token-refresh'));
                rootScope.user = JSON.parse(res.headers('x-user-token-refresh'));
            } catch(err){
              alert(err);
            }
          }
        }
        return res;
       },
       responseError: function (response) {
         if (response.status === 401) {
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
