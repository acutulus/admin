'use strict';

angular.module('dbtools').controller('ModelsCtrl', ['$scope','$http','$stateParams','$state',
	function($scope, $http, $stateParams, $state){
		$scope.modelName = $stateParams.tablename;
		$scope.showJSON = {};
		$scope.displayTable = true;
		$http.get('/admin/models')
			.then(function(response){
				console.log(response);
				$scope.model = response.data[$stateParams.tablename];
			});

    $scope.fieldBtn = function(field) {
      if ($scope.isRef(field)) {
        $state.go('models', {tablename:field.type.substr(1)});
      }
      if ($scope.isComplexType(field)) {
        field._showSubSchema = !field._showSubSchema;
      }
    };


    $scope.isRef = function(field) {
      return (field.type.charAt(0) === ':');
    };

    $scope.isComplexType = function(field) {
      return (field.type === 'object' || field.type === 'array');
    };


		$scope.buildJSON = true;
		$scope.displayJSON = function(){
			if($scope.displayTable){
				$scope.displayTable = false;
				if($scope.buildJSON){
					var str = JSON.stringify($scope.model, undefined, 4);
					$scope.jsonDisplayData = str;
					$scope.buildJSON = false;
				}
			}else{
				$scope.displayTable = true;
			}
		};
	}
	
]);