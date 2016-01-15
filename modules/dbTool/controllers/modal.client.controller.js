'use strict';

angular.module('dbtools').controller('ModalCtrl',  
	function($scope, $modalInstance, schema, item, title, $nkDataService, $stateParams, $timeout){
	
		$scope.schema = schema;
		$scope.item = item;
		$scope.title = title;
		$scope.errors = {};
		$scope.table = $stateParams.tablename;
		//check if edit/new
		var updating = false;
		for(var x in item){
			updating = true;
			break;
		}


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
						$scope.msgs.success = $stateParams.tablename + " Entry Updated Successfully";
						$timeout(function(){
							$modalInstance.close(data);
						},1500);
					}, function(err){
						$scope.msgs = {};
						$scope.msgs.error = "Error editing item: "
						for(var i=0;i<err.data.errors.length;i++){
							$scope.msgs.error += err.data.errors[i].friendly ;
						}
					});
				}else{
					$nkDataService.create($scope.table + 's', $scope.item)
					.then(function(data){
						$scope.msgs = {};
						$scope.msgs.success = $stateParams.tablename + " Entry Created Successfully";
						$timeout(function(){
							$modalInstance.close(data);
						},1500);
					}, function(err){
						$scope.msgs = {};
						$scope.msgs.error = "Error creating item: "
						for(var i=0;i<err.data.errors.length;i++){
							$scope.msgs.error += err.data.errors[i].friendly ;
						}
					});
				}
			}
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
	});
