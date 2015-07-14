	angular.module('dbtools')
		.controller("GetYoutubeModalCtrl", 
			function($scope,$modalInstance){
				$scope.close = function(){
					$modalInstance.close($scope.url);
				}
		})