angular.module('ngKeps')
  .directive('authorizationmodal',['$nkAuthService', '$window', '$rootScope',
    function($nkAuthService, $window, $rootScope){
      return {
        restrict: 'E',
        
        templateUrl:'../templates/authModal.html',        

        scope: {
        },

        controller:function($scope){
          $scope.config = $rootScope.config;
          $scope.user = $nkAuthService.getUser();
          $scope.show = 'login';          $scope.login = {};
          $scope.signin = function(provider) {
            $nkAuthService.loginWithProvider(provider, $scope.login)
            .then(function(data){
              $scope.msgs = {};
              $scope.msgs.signedIn = 'Signed In!';
              setTimeout(function() {
                $window._ngkeps_model_hide();                
              }, 1500);
            },function(err){  
              console.log(err);
              $scope.msgs = {};
              $scope.msgs.error = err.errors[0].friendly;
            });
          };
          $scope.signout = function(){
            $nkAuthService.logout();
            location.href = "/";
          };
          $scope.register = function(){
            $scope.msgs = {};
            if($scope.registerForm.$valid){
              if($scope.newUser.password === $scope.rePassword){
                if($scope.newUser.password.length > 7) {
                  $nkAuthService.signupWithProvider('local', $scope.newUser)
                  .then(function(user){
                    console.log(user);
                    $scope.msgs.created = true;
                    setTimeout(function() {
                      $window._ngkeps_model_hide();
                    }, 1500);
                  }, function(err){
                    if(err.data.errors[0].message == 'DuplicateKey'){
                      $scope.msgs.emailUsed = true;
                    }else{
                      $scope.msgs = {error: err.data.errors[0].friendly};
                    }
                    console.log('ERR', err);            
                  });
                }else{
                  $scope.msgs.passwordShort = true;
                }
              }else{
                $scope.msgs.passwordsDontMatch = true;
              }
            }else{
              $scope.msgs.formError = true;
            }
          };
          $scope.showLogin = function() {
            $scope.show = 'login';
          };
          $scope.showRegister = function() {
            $scope.show = 'register';
          };
          $scope.showForgottenPassword = function() {
            $scope.show = 'forgottenPassword';
          };
          $scope.showTwoFactor = function() {
            $scope.show = 'twofactor';
          };
        }
      };
    }
  ]);