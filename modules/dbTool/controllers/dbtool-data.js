'use strict';

angular.module('dbtools')
.controller('ShowTableCtrl', ['$scope', '$nkDataService', '$stateParams', '$modal','$window', '$http', '$nkAuthService',
	function($scope, $nkDataService, $stateParams, $modal, $window, $http, $nkAuthService){

		$scope.user = $nkAuthService.getUser();
		if(!$scope.user || !$scope.user.admin){
			alert("No permissions");
			location.href = "/admin/dbtools/signin";
		}
		//hold query arguments, newQuery.query holds all the current data
		$scope.table = $stateParams.tablename;
	


		//get first 200 entries for table
		$scope.tableHeaders = [];

		$scope.readOnlyData = [];
		$scope.displayData = [];
		$scope.loadingMessage = "Loading Table Data";
		$scope.queryBuilder = {};
		
		$http.get('/admin/rest/'+$scope.table+'s/count')
			.then(function(data){
				if(data.data.count > 300){	
					$scope.largeDataSet = data.data.count;
				}
				if($scope.$parent.databaseSchemas){
					$scope.databaseSchemas = $scope.$parent.databaseSchemas;
					$scope.schema = $scope.databaseSchemas[$scope.table].schema;
					//delete $scope.schema._id;
					$scope.loadTableData();
				}else{
					$scope.$on('models', function(){
						$scope.databaseSchemas = $scope.$parent.databaseSchemas;
						$scope.schema = $scope.databaseSchemas[$scope.table].schema;
						//delete $scope.schema._id;
						$scope.loadTableData();
					});
				}
			});
		
		$scope.loadTableData = function(){
			if(!$scope.largeDataSet){
				$http.get("/admin/rest/" +$scope.table + 's')
				.then(function(data){	
					$scope.readOnlyData = data.data;
					$scope.displayData = JSON.parse(JSON.stringify(data.data));
					$scope.loadingMessage = false;

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
									$scope.tableHeaders.push({name:x,ref:false, type:$scope.schema[x].type});
								}
							}else{
								$scope.tableHeaders.push({name:x,ref:false, type:$scope.schema[x].type});
							}
						}
					}
				});
			}
		};

		//remove item from query list
		$scope.removeItem = function(row) {
        var index = $scope.displayData.indexOf(row);
        if (index !== -1) {
            $scope.displayData.splice(index, 1);
        }
	   };

		$scope.removeColumn = function(column){
			var index = $scope.tableHeaders.indexOf(column);
    	if (index !== -1) {
				$scope.tableHeaders.splice(index,1);
			}
		};

		$scope.sortAsc = function(key){
			$scope.displayData.sort(function(a,b){
				if(!a[key.name])return 1;
				if(!b[key.name])return -1;
				if(a[key.name].toLowerCase()<b[key.name].toLowerCase())return 1;
				if(a[key.name].toLowerCase()>b[key.name].toLowerCase())return -1;
				return 0;
			});

		};

		$scope.sortDesc = function(key){
			$scope.displayData.sort(function(a,b){
				if(!a[key.name])return -1;
				if(!b[key.name])return 1;
				if(a[key.name].toLowerCase()<b[key.name].toLowerCase())return -1;
				if(a[key.name].toLowerCase()>b[key.name].toLowerCase())return 1;
				return 0;
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
				});

			populateModal.result.then(function(selectedField){
				populateDisplayAs(field, model, selectedField);
			});
		};

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
				item = updatedModal;
			});
		};

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
				$scope.displayData.push(newItem);
			});
		};

		$scope.deleteItem = function(item){
			console.log(item);
			var deleteModal = $modal.open({
				templateUrl:'modules/dbTool/views/delete-item-modal.html',
				controller:'DeleteModalCtrl',
				size:"med"
			});


			deleteModal.result.then(function(choice){
				console.log(choice)
				if(choice === 'delete'){
					$nkDataService.delete( $scope.table + 's', {_id:item._id});
					for(var i=0;i<$scope.displayData.length;i++){
						if($scope.displayData[i]._id === item._id){
							return $scope.displayData.splice(i,1);
						}
					}
				}
			});
		};

		//devices table specific function
		$scope.pushNotification = function(device){
			$http.get('admin/devices/push/' + device._id) //made up fake route for now
				.then(function(response){
					console.log(response);
				});
		};

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
			$nkDataService.read(model+'s', idArray).then(function(data){
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
		$scope.getLastNData = function(){
			if($scope.dataCount){
				$http.get("/admin/rest/" + $scope.table + "s",{
					params:{limit:$scope.dataCount}
				}) //?limit=" + $scope.dataCount)
				.then(function(data){
					$scope.readOnlyData = data.data;
					$scope.displayData = JSON.parse(JSON.stringify(data.data));
					$scope.loadingMessage = false;				

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
									$scope.tableHeaders.push({name:x,ref:false});
								}
							}else{
								$scope.tableHeaders.push({name:x,ref:false});
							}
						}
					}				
				}
				,function(err){
					alert('err getting data', err);
					console.log(err);
				});

			}
		}

		$scope.makeQuery = function(){
			var query = "{";
			for(var x in $scope.queryBuilder){
				if($scope.queryBuilder[x].condition){
					if($scope.queryBuilder[x].condition === "$exists"){
						query += '"' + x + '":{"' + $scope.queryBuilder[x].condition + '":true},'

					}else{
						query += '"' + x + '":{"' + $scope.queryBuilder[x].condition + '":"' + $scope.queryBuilder[x].query + '"},'
					}
				}else if(!$scope.queryBuilder[x].condition){
					query += '"' +  x + '":"' + $scope.queryBuilder[x].query + '",';
				}
			}
			query = query.slice(0, query.length - 1) +  "}";
					alert(query);

			var queryObject = {query: JSON.parse(query), limit:100, returns:{name:1}};
			$http.get('/admin/rest/' + $scope.table + "s", {params:queryObject})
			.then(function(data){
				console.log(data);
			})
		}

		$scope.searchBy = function(search){
			$scope.showSearch = search;
		}
	}//end controller
]);