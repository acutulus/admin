'use strict';

angular.module('dbtools')
.controller('NewTableCtrl', ['$scope', '$nkDataService', '$stateParams', '$timeout',
	function($scope, $nkDataService, $stateParams, $timeout){

		//get currentDB from URL
		$scope.currentDatabase = {};
		$scope.currentDatabase._id = $stateParams.database;

		$scope.newTable = {};
		$scope.newTable.rows = 1;
		$scope.newTable.schema = [];
		$scope.range = function(n){
			return new Array(n);
		}
		$scope.getFunctionName = function(fun) {
		  var ret = fun.toString();
		  ret = ret.substr('function '.length);
		  ret = ret.substr(0, ret.indexOf('('));
		  return ret;
		};
		$scope.checkObjProp = function(name, prop, cb) {
			if (typeof prop === 'object') {
				if (typeof prop.type === 'string' || typeof prop.type === 'function') {
					cb(name, prop);			
				} else {
					if (Object.prototype.toString.call(prop) === '[object Array]') {
						if (prop.length > 0) {
							$scope.checkObjProp(name, prop[0], cb);
						}
					} else {
						for (var i in prop) {
							$scope.checkObjProp(name+'.'+i, prop[i], cb);
						}
					}
				}
			}
		};
		$scope.addTable = function(){
			var newSchema = {}
			//handle JSON method
			if($scope.newTable.hasOwnProperty('addJSON')){
				if($scope.newTable.name === ''){
					alert('need tableName');
					return;
				}
				newSchema.name = $scope.newTable.name;
				if($scope.newTable.addJSON === ''){
					alert('JSON field is empty');
					return;
				}
				var text = $scope.newTable.addJSON;
				text = text.replace(/\n/g, "");
				text = text.replace(/\t/g, "");
				var obj = eval('('+text+')');

				for (var i in obj) {
					$scope.checkObjProp(i, obj[i], function(name, prop) {
						if (typeof obj[i].type === 'function') {
							obj[i].type = $scope.getFunctionName(obj[i].type);
						} else if (typeof obj[i].type === 'object' && Object.prototype.toString.call(prop) === '[object Array]') {
							obj[i].type = [$scope.getFunctionName(obj[i].type[0])];
						}
					});
				}
				newSchema.schemaJson = JSON.stringify(obj);
			//handle manual creation
			}else{
				if($scope.newTable.tableName === ''){
					alert('need tableName');
					return;
				}
				newSchema.name = $scope.newTable.tableName
				newSchema.schemaJson = {};
				for(var x in $scope.newTable.schemaJson){
					if($scope.newTable.schemaJson.name === ''){
						alert('A field is empty');
						return;
					}
					newSchema.data[$scope.newTable.schema[x].name] = {type:$scope.newTable.schema[x].type};
				}
			}
			$nkDataService.add('projects/addSchema/' + $scope.currentDatabase._id, newSchema)
			.then(function(data){
				if(data){
					$scope.newTable = {};
					$scope.newTable.rows = 1;
					$timeout(function(){
						$scope.newTable.success = false;
					}, 3000);
					$scope.newTable.success = true;
					$scope.newTable.failure = false;
				}else{
					$scope.newTable.failure = true;
				}
			})
			/*
			$http.post('/projects/addSchema/'+$scope.currentDatabase._id, newSchema).success(function(data,status,headers,config){
				$scope.newTable = {};
				$scope.newTable.rows = 1;
				$timeout(function(){
					$scope.newTable.success = false;
				},3000)
				$scope.newTable.success = true;
			}).error(function(data, status, headers, config){

			})*/
			
		}
	}
]);