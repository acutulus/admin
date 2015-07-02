'use strict';

angular.module('dbtools')
.controller('ShowTableCtrl', ['$scope', 'DataService', '$stateParams', '$modal',
	function($scope, DataService, $stateParams, $modal){


		//hold query arguments
		$scope.newQuery = {};
		$scope.newQuery.name = $stateParams.table;
		$scope.newQuery.query = {}; 

		//get first 200 entries for table
		$scope.currentData = {};
		$scope.currentData.tableHeaders = [];
		$scope.currentData.tableHeaderNames = [];

		$scope.schemas;
		DataService.getQuery('admin/schemas')
		.then(function(data){
			$scope.databaseSchemas = data;
			console.log($scope.databaseSchemas)
			DataService.getQuery('admin/rest/' + $scope.newQuery.name)
			.then(function(data){
				$scope.currentData.query = data;
				//parse 's' off of table names
				var table = $scope.newQuery.name.slice(0, $scope.newQuery.name.length - 1);
				var currentSchema = false;
				if(data.length > 0){
					currentSchema = true;
				}

				//build the headers, check if ID or not
				if(!currentSchema){
					$scope.currentData.tableHeaders.push('no data');
					$scope.currentData.query = [{'no data':'No Data in this Table'}];
				}else{
					for(var x in $scope.databaseSchemas[table]){
						if(x in $scope.databaseSchemas || $scope.databaseSchemas[table][x].type.indexOf(':') > -1){
							var schemaName = $scope.databaseSchemas[table][x].type.slice(1);
							console.log(schemaName)
							$scope.currentData.tableHeaderNames.push(x);
							$scope.currentData.tableHeaders.push({name:x,id:schemaName})
						}else{
							$scope.currentData.tableHeaderNames.push(x);
							$scope.currentData.tableHeaders.push({name:x,id:false})
						}
					}
			
				}
			});
		});

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
				if(a[key.name]<b[key.name])return -1;
				if(a[key.name]>b[key.name])return 1;
				return 0;
			})

		}

		$scope.sortDesc = function(key){
			$scope.currentData.query.sort(function(a,b){
				if(a[key.name]<b[key.name]) return 1;
				if(a[key.name]>b[key.name]) return -1;
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
						return key.name;
					}
				}
			});
			/*
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
			});*/
		}

		$scope.populateIdField = function(selectedTable){
			var table = $scope.databaseSchemas[selectedTable.id];

			var populateModal = $modal.open({
					templateUrl:'modules/dbTool/views/populate-modal.html',
					controller:'PopulateModalCtrl',
					resolve:{
						field: function(){
							return table;
						}
					}
				})
			populateModal.result.then(function(selectedField){
				var idArray = [];
				for(var x in $scope.currentData.query){
					if($scope.currentData.query[x][selectedTable.name]){
						var id = $scope.currentData.query[x][selectedTable.name];
						if(id in idArray){
						}else{
							idArray.push(id);
						}
					}
				}
				console.log(idArray);
				for(var x in idArray){
					DataService.get('admin/rest/'+selectedTable.id +'s', idArray[x]).then(function(data){
						//create object to store the new values
						var newValues = {};
						newValues[data._id] = data[selectedField]
						
						//run through currentData replacing with value
						for(x in $scope.currentData.query){
							//see if _id in newValues
							if(newValues[$scope.currentData.query[x][selectedTable.name]]){
								$scope.currentData.query[x][selectedTable.name] = newValues[$scope.currentData.query[x][selectedTable.name]];
							}
						}

					})
				}

			});
		}

		//edit with modal
		$scope.editItem = function(item){
			var editModal = $modal.open({
				templateUrl:'modules/dbTool/views/edit-modal.html',
				controller:'EditModalCtrl',
				resolve:{
					item:function(){
						return item;
					}
				}
			})

			editModal.result.then(function(updatedModel){

				DataService.update('admin/rest/' + $scope.newQuery.name + '/' + updatedModel._id, updatedModel)
				.then(function(data){
					console.log(data);
				})

			})
		}

		$scope.addItem = function(){
			var table = $scope.newQuery.name.slice(0, $scope.newQuery.name.length - 1)
			var addModal = $modal.open({
				templateUrl:'modules/dbTool/views/add-modal.html',
				controller:'AddModalCtrl',
				resolve:{
					schema:function(){
						return $scope.databaseSchemas[table];
					}
				}
			})
			//NEED TO CLEAN UP INPUT ERROR CHECKING AND ADD IN POST
			addModal.result.then(function(newItem){
				console.log(newItem);

				/*DataService.add('admin/rest/' + $scope.newQuery.name, newItem)
				.then(function(data){
					console.log(data)
				})*/

			})
		}

	}
]);