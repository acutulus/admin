'use strict';

angular.module('dbtools')
.controller('ShowTableCtrl', ['$scope', 'DataService', '$stateParams', '$modal','$window', '$http',
	function($scope, DataService, $stateParams, $modal, $window, $http){


		//hold query arguments, newQuery.query holds all the current data
		$scope.table = $stateParams.tablename;
	


		//get first 200 entries for table
		$scope.tableHeaders = [];

		$scope.readOnlyData = [];
		$scope.displayData = [];
		
		//get list of schemas for project
		DataService.getQuery('admin/models')
		.then(function(data){
			$scope.databaseSchemas = data;
			console.log(data, $scope.table)
			$scope.schema = $scope.databaseSchemas[$scope.table].schema;

			loadTableData();
		});
		
		var loadTableData = function(){
			DataService.getQuery('admin/rest/' + $scope.table + 's', {}, false)
			.then(function(data){		
				$scope.readOnlyData = data;
				$scope.displayData = JSON.parse(JSON.stringify(data));

				if ($scope.tableHeaders.length === 0) {
					//for iterating over current schema
					for(var x in $scope.schema){
						if(typeof $scope.schema[x].type === 'string'){
							//check if field is a reference
							if($scope.schema[x].type.indexOf(':') > -1){
								var ref = $scope.schema[x].type.slice(1);
								var properties = $scope.databaseSchemas[ref].properties;
								$scope.tableHeaders.push({
									name:x,
								  displayAs:properties.displayAs,
								  ref:ref
								});
								//populate currentData.query reference fields with displayAs values
								populateDisplayAs(x, ref, properties.displayAs);
							}else{
								$scope.tableHeaders.push({name:x,ref:false})
							}
						}else{
							$scope.tableHeaders.push({name:x,ref:false})
						}
					}
				}
			});
		}

		//remove item from query list
		$scope.removeItem = function(row) {
        var index = $scope.displayData.indexOf(row);
        if (index !== -1) {
            $scope.displayData.splice(index, 1);
        }
	   }

		$scope.removeColumn = function(column){
			var index = $scope.tableHeaders.indexOf(column);
      if (index !== -1) {
				$scope.tableHeaders.splice(index,1);
			}
		}

		$scope.sortAsc = function(key){
			$scope.displayData.sort(function(a,b){
				if(!a[key.name])return 1;
				if(!b[key.name])return -1;
				if(a[key.name].toLowerCase()<b[key.name].toLowerCase())return 1;
				if(a[key.name].toLowerCase()>b[key.name].toLowerCase())return -1;
				return 0;
			})

		}

		$scope.sortDesc = function(key){
			$scope.displayData.sort(function(a,b){
				if(!a[key.name])return -1;
				if(!b[key.name])return 1;
				if(a[key.name].toLowerCase()<b[key.name].toLowerCase())return -1;
				if(a[key.name].toLowerCase()>b[key.name].toLowerCase())return 1;
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
		};

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
				populateDisplayAs(field, model, selectedField);
			});
		}

		//edit with modal
		$scope.editItem = function(item){
			var tableSchema = JSON.parse(JSON.stringify($scope.databaseSchemas[$scope.table].schema));
			var editData = item;

			console.log('EDIT DATA', editData);
			var modal = $modal.open({
				templateUrl:'modules/dbTool/views/modal.html',
				controller:'ModalCtrl',
				size: 'lg',
				resolve:{
					schema:function(){
						return tableSchema;
					},
					item:function(){
						return editData;
					},
					title:function(){
						return 'Edit Item';
					}
				}
			});

			modal.result.then(function(updatedModal){
				DataService.update('admin/rest/' + $scope.table + '/' + item._id, updatedModal)
				.then(function(data){
					console.log(data);
					//loadTableData();
				})

			})
		}

		$scope.addItem = function(){
			var tableSchema = JSON.parse(JSON.stringify($scope.databaseSchemas[$scope.table].schema));

			var modal = $modal.open({
				templateUrl:'modules/dbTool/views/modal.html',
				controller:'ModalCtrl',
				size: 'lg',
				resolve:{
					schema:function(){
						return tableSchema;
					},
					item:function(){
						return {};
					},
					title:function(){
						return 'Create a new entry';
					}
				}
			});

			//NEED TO CLEAN UP INPUT ERROR CHECKING AND ADD IN POST
			modal.result.then(function(newItem){
				console.log(newItem);

				DataService.add('admin/rest/' + $scope.table, newItem)
				.then(function(data){
					console.log(data)
					//loadTableData();
				})

			})
		}

		$scope.deleteItem = function(item){
			console.log(item);
			var deleteModal = $modal.open({
				templateUrl:'modules/dbTool/views/delete-item-modal.html',
				controller:'DeleteModalCtrl',
				size:"med"
			})


			deleteModal.result.then(function(choice){
				console.log(choice)
				if(choice === 'delete'){
					DataService.delete('admin/rest/' + $scope.table, {_id:item._id});
					loadTableData();
				}
			})
		}

		//devices table specific function
		$scope.pushNotification = function(device){
			$http.get('admin/devices/push/' + device._id) //made up fake route for now
				.then(function(response){
					console.log(response);
				})
		}

		//utility function to populate IDs on initial load
		var populateDisplayAs = function(field, model, displayAs){
			var idArray = [];
			for(var x in $scope.readOnlyData){
				//has already been populated and contains id/value object
				if($scope.readOnlyData[x][field]){
					var id = $scope.readOnlyData[x][field];
					if(idArray.indexOf(id) > -1){
					}else{
						idArray.push(id);
					}
				}
			}
			console.log('populating display with ', idArray);
			DataService.get('admin/rest/'+model+'s', idArray).then(function(data){
				var refTable = {};
				for(var y in data){
					if(idArray.indexOf(data[y]._id) > -1){
						refTable[data[y]._id] = data[y][displayAs]
					} 
				}
				for(y in $scope.readOnlyData){
					$scope.displayData[y][field] = refTable[$scope.readOnlyData[y][field]] || $scope.readOnlyData[y][field];	
				}
			});
			
		}



	}//end controller
]);