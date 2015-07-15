angular.module('dbtools')
	.controller('GetImageModalCtrl', function($scope, $modalInstance, fileReader){
	 	$scope.image = {};

	 	var file = document.getElementById('imageUpload');
	 	$scope.fileChanged = function(evt){
	 	    var files = evt.target.files;
		    var file = files[0];
		    
		    console.log(file);
		    if (files && file) {
        		var read = new FileReader();
		        
		       	read.onload = function(readerEvt) {
		            $scope.image.file = read.result;
		        }
		        read.readAsDataURL(file);
	        }
	 	};

	 	$scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

	    $scope.submit = function(){
	    	if($scope.import){
	    		$modalInstance.close($scope.image.file);
	    	}else{
	    		$modalInstance.close($scope.image.url);
	    	}
	    }

	})