'use strict';

angular.module('dbtools')
.controller('ShowTableCtrl', ['$scope', 'DataService', '$stateParams', '$modal','$window',
	function($scope, DataService, $stateParams, $modal, $window){


		//hold query arguments, newQuery.query holds all the current data
		$scope.newQuery = {};
		$scope.newQuery.name = $stateParams.table;
		$scope.newQuery.query = {}; 

		//get first 200 entries for table
		$scope.currentData = {};
		$scope.currentData.tableHeaders = [];
		$scope.currentData.tableHeaderNames = [];
		
		//get list of schemas for project
		DataService.getQuery('admin/models')
		.then(function(data){
			$scope.databaseSchemas = data;
			//get data for selected schema
			DataService.getQuery('admin/rest/' + $scope.newQuery.name)
			.then(function(data){
				
				//set up data as objects to preserve id field
				for(var x in data){
					for(var y in data[x]){
						data[x][y] = {
							id:data[x][y],
							value:data[x][y]
						}
					}
				}
				$scope.currentData.query = data;
				//parse 's' off of table names
				var table = $scope.newQuery.name.slice(0, $scope.newQuery.name.length - 1);

				//for iterating over current schema
				var currentSchema = $scope.databaseSchemas[table].schema;
				var currentProperties;
				for(var x in currentSchema){
					if(currentSchema[x].type){
						//check if field is a reference
						if(currentSchema[x].type.indexOf(':') > -1){
							currentProperties = $scope.databaseSchemas[currentSchema[x].type.slice(1)].properties;
							$scope.currentData.tableHeaderNames.push(x);
							$scope.currentData.tableHeaders.push({name:x,
																  displayAs:currentProperties.displayAs,
																  model:currentSchema[x].type.slice(1)})
							//populate currentData.query reference fields with displayAs values
							populateDisplayAs(x, currentSchema[x].type.slice(1), currentProperties.displayAs);
						}else{
							$scope.currentData.tableHeaderNames.push(x);
							$scope.currentData.tableHeaders.push({name:x,model:false})
						}
					}else{
						$scope.currentData.tableHeaderNames.push(x);
						$scope.currentData.tableHeaders.push({name:x,model:false})
					}
				}
				
			});
		});
		
		var loadTableData = function(){
			DataService.getQuery('admin/rest/' + $scope.newQuery.name, {}, false)
			.then(function(data){		
				//set up data as objects to preserve id field
				for(var x in data){
					for(var y in data[x]){
						data[x][y] = {
							id:data[x][y],
							value:data[x][y]
						}

					}
				}
				$scope.currentData.query = data;				
			});
		}
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
				if(!a[key.name])return -1;
				if(a[key.name].value<b[key.name].value)return -1;
				if(a[key.name].value>b[key.name].value)return 1;
				return 0;
			})

		}

		$scope.sortDesc = function(key){
			$scope.currentData.query.sort(function(a,b){
				if(!a[key.name])return -1;
				if(a[key.name].value<b[key.name].value) return 1;
				if(a[key.name].value>b[key.name].value) return -1;
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
		}

		$scope.populateIdField = function(selectedTable){
			var table = $scope.databaseSchemas[selectedTable.model].schema;

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
					//has already been populated and contains id/value object
					if($scope.currentData.query[x][selectedTable.name]){
						var id = $scope.currentData.query[x][selectedTable.name].id;
						if(idArray.indexOf(id) > -1){
						}else{
							idArray.push(id);
						}
					}
				}

				for(var x in idArray){
					DataService.get('admin/rest/'+selectedTable.model +'s', idArray[x]).then(function(data){
						//create object to store the new values
						var newValues = {};
						newValues[data._id] = data[selectedField]
						//run through currentData replacing with value
						for(x in $scope.currentData.query){
							if($scope.currentData.query[x][selectedTable.name]){
								//see if _id in newValues
								if(newValues[$scope.currentData.query[x][selectedTable.name].id]){
									$scope.currentData.query[x][selectedTable.name] = {
													value : newValues[$scope.currentData.query[x][selectedTable.name].id],
													id : $scope.currentData.query[x][selectedTable.name].id
													};
								}
							}
						}

					})
				}

			});
		}

		//edit with modal
		$scope.editItem = function(item){

			var tableName = $stateParams.table.slice(0,$stateParams.table.length -1);
			console.log($scope.databaseSchemas, tableName)
			var tableSchema = $scope.databaseSchemas[tableName].schema
			var editData = [];

			editData = JSON.parse(JSON.stringify(tableSchema));
			for(var x in editData){

				if(item[x]){
					if(item[x].id){
						editData[x].data = item[x].id;
					}
				}
			}
			console.log('EDIT DATA', editData);
			var editModal = $modal.open({
				templateUrl:'modules/dbTool/views/edit-modal.html',
				controller:'EditModalCtrl',
				size: 'lg',
				resolve:{
					item:function(){
						return editData;
					}
				}
			})

			editModal.result.then(function(updatedModal){
				DataService.update('admin/rest/' + $scope.newQuery.name + '/' + item._id.id, updatedModal)
				.then(function(data){
					console.log(data);
					loadTableData();
				})

			})
		}

		$scope.addItem = function(){
			var tableName = $stateParams.table.slice(0,$stateParams.table.length -1);
			var tableSchema = $scope.databaseSchemas[tableName].schema
			var passData;
			passData = JSON.parse(JSON.stringify(tableSchema));

			var addModal = $modal.open({
				templateUrl:'modules/dbTool/views/add-modal.html',
				controller:'AddModalCtrl',
				size: 'lg',
				resolve:{
					passData:function(){
						return passData;
					}
				}
			})
			//NEED TO CLEAN UP INPUT ERROR CHECKING AND ADD IN POST
			addModal.result.then(function(newItem){
				console.log(newItem);

				DataService.add('admin/rest/' + $scope.newQuery.name, newItem)
				.then(function(data){
					console.log(data)
					loadTableData();
				})

			})
		}

		$scope.deleteItem = function(item){

			var deleteModal = $modal.open({
				templateUrl:'modules/dbTool/views/delete-item-modal.html',
				controller:'DeleteModalCtrl',
				size:"med"
			})


			deleteModal.result.then(function(choice){
				console.log(choice)
				if(choice === 'delete'){
					DataService.delete('admin/rest/' + $scope.newQuery.name, {_id:item._id.id});
					loadTableData();
				}
			})
		}

		//utility function to populate IDs on initial load
		var populateDisplayAs = function(field, model, displayAs){
			var idArray = [];
			for(var x in $scope.currentData.query){
				//has already been populated and contains id/value object
				if($scope.currentData.query[x][field]){
					var id = $scope.currentData.query[x][field].id;
					if(idArray.indexOf(id) > -1){
					}else{
						idArray.push(id);
					}
				}
			}
			for(var x in idArray){
				DataService.get('admin/rest/'+model+'s', idArray[x]).then(function(data){
					//create object to store the new values
					var newValues = {};
					newValues[data._id] = data[displayAs]
					//run through currentData replacing with value
					for(x in $scope.currentData.query){
						if($scope.currentData.query[x][field]){
							//see if _id in newValues
							if(newValues[$scope.currentData.query[x][field].id]){

								$scope.currentData.query[x][field] = {
												value : newValues[$scope.currentData.query[x][field].id],
												id : $scope.currentData.query[x][field].id
												};			
							}
						}
					}
				})
			}
		}

	}//end controller
]);