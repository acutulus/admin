'use strict';

angular.module('dbtools')
.controller('ShowTableCtrl', ['$scope', 'DataService', '$stateParams', '$modal',
	function($scope, DataService, $stateParams, $modal){
		//store db id
		$scope.currentDatabase = {};
		$scope.currentDatabase._id = $stateParams.database;

		//hold query arguments
		$scope.newQuery = {};
		$scope.newQuery.name = $stateParams.table;
		$scope.newQuery.query = {}; 

		//get first 200 entries for table
		$scope.currentData = {};
		$scope.currentData.tableHeaders = [];
		DataService.getQuery('projects/queryModel/' + $scope.currentDatabase._id,
							 {table:$scope.newQuery.name, query:$scope.newQuery.query})
		.then(function(data){

			for(var x in data[0]){
				if(x !== '__v'){
					$scope.currentData.tableHeaders.push(x);

				}
			}
			//parse __v out of data, dont need to display it
			for(var i=0;i<data.length;i++){
				data[i].__v = undefined;
			}
			$scope.currentData.query = data;
		})


		//remove item from query list
		$scope.removeItem = function(row) {
	        var index = $scope.currentData.query.indexOf(row);
	        if (index !== -1) {
	            $scope.currentData.query.splice(index, 1);
	        }
	    }

		$scope.removeColumn = function(column){

			for(var i=0; i < $scope.currentData.query.length; i++){
				$scope.currentData.query[i][column] = undefined; 
			}

			var index = $scope.currentData.tableHeaders.indexOf(column);
			$scope.currentData.tableHeaders.splice(index,1);
		}

		$scope.sortAsc = function(key){
			$scope.currentData.query.sort(function(a,b){
				if(a[key]<b[key])return -1;
				if(a[key]>b[key])return 1;
				return 0;
			})

		}

		$scope.sortDesc = function(key){
			$scope.currentData.query.sort(function(a,b){
				if(a[key]<b[key]) return 1;
				if(a[key]>b[key]) return -1;
				return 0;
			})
		}

		/** query DB functions */
		$scope.showQueryModal = function(key){
			var queryModal = $modal.open({
				templateUrl: 'modules/dbTool/views/queryModal.html',
				controller:'QueryModalCtrl',
				resolve:{
					field:function(){
						return key;
					}
				}
			});
			queryModal.result.then(function(queryString){

				$scope.newQuery.query = queryString;
				$scope.currentData.tableHeaders = [];

				DataService.getQuery('projects/query/' + $scope.currentDatabase._id,
									 {table:$scope.newQuery.name, query:$scope.newQuery.query})
				.then(function(data){

					for(var x in data[0]){
						if(x !== '__v'){
							$scope.currentData.tableHeaders.push(x);

						}
					}
					//parse __v out of data, dont need to display it
					for(var i=0;i<data.length;i++){
						data[i].__v = undefined;
					}
					$scope.currentData.query = data;
				})			
			});
		}
	}
]);