angular.module('dbtools')
	.controller('GetImageModalCtrl', function($scope, $modalInstance, imageFormat){
	 	$scope.image = {};

	 	var file = document.getElementById('imageUpload');
	 	$scope.fileChanged = function(evt){
	 	    var files = evt.target.files;
		     currentFile = files[0];
		    
		    console.log(currentFile);
		    if (files && currentFile) {
        		var read = new FileReader();
		        
		       	read.onload = function(readerEvt) {
		            $scope.image.file = read.result;
		        }
		        if(imageFormat === 'buffer'){
		        	read.readAsArrayBuffer(currentFile);
		        }else{
		        	read.readAsDataURL(currentFile);
		        }
	        }
	 	};

	 	$scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };

	    $scope.submit = function(){
	    	if($scope.import){
	    		if(imageFormat === 'buffer'){
	    			$modalInstance.close({arrayBuffer:$scope.image.file, type:currentFile.type});
	    		}else{
	    			$modalInstance.close($scope.image.file);
	    		}
	    	}else{
	    		$modalInstance.close($scope.image.url);
	    	}
	    }

	})