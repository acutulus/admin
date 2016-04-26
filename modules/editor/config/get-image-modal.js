angular.module('editor')
	.controller('GetImageModalCtrl', function($scope, $modalInstance){
	 	$scope.image = {};

	 	var file = document.getElementById('imageUpload');
	 	$scope.fileChanged = function(evt){
	 	    var files = evt.target.files;
		     currentFile = files[0];
		    
		    console.log(currentFile);
		    if (files && currentFile) {
		    	console.log(files)
        		var read = new FileReader();
		        
		       	read.onload = function(readerEvt) {
		            $scope.image.file = read.result;
		        }
		 
		        read.readAsDataURL(currentFile);
		        
	        }
	 	};

	 	$scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

	    $scope.submit = function(){
	    	if($scope.import){
	    		//$modalInstance.close({arrayBuffer:$scope.image.file, type:currentFile.type});
	    		$modalInstance.close($scope.image.file);
	    	
	    	}else{
	    		$modalInstance.close($scope.image.url);
	    	}
	    }

	})