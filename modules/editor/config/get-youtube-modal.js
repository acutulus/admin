	angular.module('editor')
		.controller("GetYoutubeModalCtrl", 
			function($scope,$modalInstance){
				$scope.close = function(){
					$modalInstance.close($scope.url);
				}
				 $scope.cancel = function () {
	      			$modalInstance.dismiss('cancel');
	    		};
		})