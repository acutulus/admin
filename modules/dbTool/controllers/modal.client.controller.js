'use strict';

angular.module('dbtools').controller('ModalCtrl',  
	function($scope, $modalInstance, schema, item, title, $nkDataService, $stateParams, $timeout){
	
		$scope.schema = schema;
		$scope.item = item;
		$scope.title = title;
		$scope.errors = {};
		$scope.table = $stateParams.tablename;
		


		$scope.submit = function(){
			$scope.msgs = {};

			for(var x in $scope.errors){
				if($scope.errors[x] !== {}){
					for(var i in $scope.errors[x]){
						$scope.msgs.errorMessage = true;
						return;
					}
				}
			}
			if(!$scope.msgs.errorMessage){
				if(updating){
					$nkDataService.update($scope.table + 's', $scope.item)
					.then(function(data){
						$scope.msgs = {};
						$scope.msgs.successMessage = $stateParams.tablename + " Entry Updated Successfully";
						$timeout(function(){
							$modalInstance.close(data);
						},1500);
					}, function(err){
						$scope.msgs = {};
						$scope.msgs.serverError = true;
						$scope.serverErrors = err.data;
					});
				}else{
					$nkDataService.create($scope.table + 's', $scope.item)
					.then(function(data){
						$scope.msgs = {};
						$scope.msgs.successMessage = $stateParams.tablename + " Entry Created Successfully";
						$timeout(function(){
							$modalInstance.close(data);
						},1500);
					}, function(err){
						$scope.msgs = {};
						$scope.msgs.serverError = true;
						$scope.serverErrors = err.data;
					});
				}
			}
		};
		$scope.testEmpty = function(obj){
			for(var x in obj){
				return true;
			}
			return false;
		};
		$scope.resolveErrors = function(){
			if($scope.msgs.errorMessage.length > 0){
				for(var i=0,len=$scope.msgs.errorMessage.length; i < len; i++){
					$scope.msgs.errorMessage[i] = $scope.errors[$scope.msgs.errorMessage[i]] 
				}
			}
		};

  	$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		if($scope.testEmpty(item)){
			var updating = true;
		}
	});
