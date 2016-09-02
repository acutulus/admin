'use strict';

angular.module('dbtools').controller('TestingCtrl', ['$scope', '$http', "$timeout", 
	function($scope, $http, $timeout){
	
	$scope.loading = {loading : true};

  $http.get($scope.apiHost + '/admin/restRoutes')
  .then(function(response){
    controllerDisplayObject(response.data);
    checkLoaded();
  }, function(err){
  	console.error(err);
  	$scope.loading = {error:err};
  });
	
  $http.get($scope.apiHost + "/api/v1/graphqls?q={users{_id,roles,displayName}}")
  .then(function(users){
    $scope.users = [{name:'Run As Admin', _id:''}];
    var users = users.data.data.users;
    for(var i = 0; i < users.length; i++){
      if(users[i].roles){
        $scope.users.push({ _id : users[i]._id, 
                            name: users[i].displayName + ' : ' + users[i].roles.join(',')
                          });
      }else{
        $scope.users.push({_id:users[i]._id, name:users[i].displayName});
      }
    }
    checkLoaded();
  }, function(err){
    console.error(err);
    $scope.loading = {error:err};
  });
  /*
    Takes controller object from server and adds to scope - controllers, routes

    e.g.  $scope.controllers = [{name:"user"},{name:"business"}], 
          $scope.routes = { user:{routes:[{name:'get.user', route:{}}]}
  */
  /* PREPARING DISPLAY DATA */
  var dontDisplayRoutes = ['auth','email','device','graphql','oauth','pushNotification','trackedEvent','user','userEvent','userToken','unitTest'];
  function controllerDisplayObject(data){
    var controllers = [];
    var routes = {};
    for(var x in data){
      if(dontDisplayRoutes.indexOf(x) > -1){
        //dont display these routes
      }else{
        //add to controllers and routes array
        controllers.push({name:x});
        for(var k in data[x].functions){
          //dont display internal routes
          if(data[x].functions[k].hasOwnProperty('internal') && data[x].functions[k].internal){

          }else{
            if(routes[x] && typeof routes[x] === 'object'){
              routes[x].routes.push({
                                      name:k, 
                                      route:addInstructionsToRoute(data[x].functions[k])
                                    });
            }else{
              routes[x] = {
                            name:x,
                            routes:[{
                                    name:k, 
                                    route:addInstructionsToRoute(data[x].functions[k])
                                    }]
                          };
            }
          }
        }
      }
    }
    $scope.controllers = controllers;
    $scope.routes = routes;
  }

  //bind descriptions to instructions for this view, this will force ngkeps to display route descriptions
  function addInstructionsToRoute(route){
    for(var x in route.params){
      if(route.params[x].hasOwnProperty('description')){
        route.params[x].instructions = route.params[x].description;
      }
    }
    return route;
  }

  $scope.getTestsForRoute = function(route){
    $scope.showCreate = false;
    $scope.showTests = false;
    $scope.activeRoute = route.route;
    $scope.newTestForm = {};
    $scope.showCreatedTests = false;
    $scope.activeTests = {};
    $scope.createdTests = {};
    if(route.hasOwnProperty('tests')){
      //tests already on route object
      $scope.activeTests = route.tests;
      for(var i = 0;i < $scope.activeTests.length; i++){
        $scope.activeTests[i].itShouldEdit = $scope.activeTests[i].itShould || '';
      }
      return;
    }else{
      //no tests get from server
      $http.get($scope.apiHost + '/api/v1/unitTests/testsForRoute?route=' + route.name)
      .then(function(response){
        route.tests = response.data;
        $scope.activeTests = route.tests;
        for(var i = 0;i < $scope.activeTests.length; i++){
          $scope.activeTests[i].itShouldEdit = $scope.activeTests[i].itShould || '';
        }
      }, function(err){
        console.error(err);
      });
    }
  }

  /* RUNNING TESTS */
  $scope.runTest = function(test){
    $http.get($scope.apiHost + "/api/v1/unitTests/" + test._id + "/runTest")
    .then(function(success){
      test.testResults = success;
      test.testResults.displayCode = JSON.stringify(success);
      test.displayResults = true;
      $timeout(function(){
        test.displayResults = false;
      }, 5000);
    }, function(err){
      console.error(err);
    });
  }
  
  /* CREATING NEW TESTS */  
  $scope.createTest = function(){
    delete $scope.testAsUser;
    $scope.newTestForm = {
      errors:{},
      values:{},
      schema:$scope.activeRoute.params
    };
    $scope.showCreate = true;
    $scope.showTests = false;
  }
  //build unit tests associated with routes
  $scope.buildUnitTest = function(route, cb){
    if($scope.apiHost.indexOf('localhost') > -1){
      var testStart = new Date().getTime();
      $http.get($scope.apiHost + '/admin/startRecordingAll')
      .then(function(response){
        testRoute(route, function(){
          finishBuildTests(testStart, cb);         
        });//end testRoute
      }, function(err){
        finishBuildTests(testStart);
        console.error(err);
      });//end start recording
    }
  }

  function finishBuildTests(testStart, cb){
    $http.get($scope.apiHost + '/admin/stopRecordingAll')
    .then(function(response){
      $http.get($scope.apiHost + "/api/v1/unitTests/recent?time=" + testStart)
      .then(function(tests){
        if(cb){
          cb(tests);
        }else{
          $scope.showCreatedTests = true;
          $scope.createdTests = tests.data;
          for(var i = 0; i < $scope.createdTests.length; i++){
            $scope.createdTests[i].output = JSON.parse($scope.createdTests[i].output);
          }
        }
      }, function(err){
        console.error(err);
      });//end get recent tests
    }, function(err){
      console.error(err);
    }); //end stop recording
  }

  //add tests to activeTests list, set all views to false
  $scope.finishCreatingTests = function(){
    $scope.showFinishedMessage = true;
    $timeout(function(){
      for(var i = 0; i < $scope.createdTests.length; i++){
        if($scope.createdTests[i].preserve){
          $scope.activeTests.push($scope.createdTests[i]);
        }else{
          $scope.deleteUnitTest($scope.createdTests[i])
        }
      }
      $scope.showFinishedMessage = false;
      $scope.showCreated = false;
      $scope.showCreatedTests = false;
      $scope.showCreate = false;
      $scope.showTests = false;

    },1000)
  }
  //add itShould field to a unitTest
  $scope.updateUnitTest = function(test){
    if(!test.itShouldEdit){
      test.msgs = {error:"ItShould field is empty"};
    }else{
      test.itShould = test.itShouldEdit
      test.output = JSON.stringify(test.output);
      $http.put($scope.apiHost + "/api/v1/unitTests/" + test._id, {unitTest:test})
      .then(function(success){
        test.output = JSON.parse(test.output);
        test.itShould = test.itShouldEdit;
        test.itShouldEdit = '';
        test.msgs = {updated:true};
        $timeout(function(){test.msgs = {}},1000);
      }, function(err){
        test.itShould = '';
        console.error(err);
        test.msgs = {error:err.data};
      });
    }
  }

  /* DELETING TESTS */ 
  //remove unit test by _id and splice from its test list
  $scope.deleteUnitTest = function(test, activeTest){
    $http.delete($scope.apiHost + "/api/v1/unitTests/" + test._id)
    .then(function(success){
      test.msgs = {deleted:true};
      
      //remove test from list
      $timeout(function(){
        if(!activeTest){
          for(var i = 0; i < $scope.createdTests.length; i++){
            if($scope.createdTests[i]._id === test._id){
              $scope.createdTests.splice(i, 1);
              return test = null;
            }
          }
        }else if(activeTest){
          for(var i = 0; i < $scope.activeTests.length; i++){
            if($scope.activeTests[i]._id === test._id){
              $scope.activeTests.splice(i,1);
              return test = null;
            }
          }
        }
      }, 1200);

    }, function(err){
      console.error(err);
      test.msgs = {error:err};
    });  
  }
  
  /* Rebuild Tests */
  $scope.rebuildTest = function(test, index){
    var testUser = JSON.parse(test.input.client);
    testUser = testUser.req.user._id;
    var testForm = JSON.parse(test.input.data);
    if(testForm.hasOwnProperty('testing_user')){
      delete testForm['testing_user'];
    }
    testForm = typeCastStrings(testForm);
    if(testUser && testForm){
      $scope.testAsUser = testUser
      $scope.newTestForm = {};
      $scope.newTestForm.values = testForm;
      //call build test flow
      $scope.buildUnitTest($scope.activeRoute, function(createdTests){

        // clean up by deleting all extra tests and old unit test, 
        // push new test into list
        createdTests = createdTests.data;
        for(var i = 0; i < createdTests.length; i++){
          if(createdTests[i].route !== test.route){
            $scope.deleteUnitTest(createdTests[i]);
          }else if(createdTests[i].route === test.route){
            $scope.deleteUnitTest(test, true);
            $scope.activeTests.push(createdTests[i]);
          }
        }

      });
    }
  }
  /*test.input field contains all values as strings, 
    converts them back to original types*/
  function typeCastStrings(testForm){
    var schema = $scope.activeRoute.params;
    for(var x in testForm){
      if(schema.hasOwnProperty(x)){
        testForm[x] = convertType(testForm[x], schema[x].type);
      }
    }
    return testForm;
  }
  function convertType(str, type){
    if(type.toLowerCase() === "number"){
      return Number(str);
    }else if(type.toLowerCase() === "boolean"){
      return (str === "true") ? true : false;
    }else if(type.toLowerCase() === "object"){
      return JSON.parse(str);
    }else{
      return str;
    }
  }
  /* Constructs correct HTTP requests using input form and route information */
  function testRoute(route, cb){
    switch(route.method){
      case('get'):    runGetRequest(route, cb);
                      break;
      case('post'):   runPostRequest(route, cb);
                      break;
      case('put'):    runPutRequest(route, cb);
                      break;
      case('delete'): runDeleteRequest(route, cb);
                      break;
    }
  };     

  function runGetRequest(route, cb){
    var request = replaceIdInRoute(route);
    request.url += buildQuerystring(route);

    $http.get($scope.apiHost + request.url)
    .then(function(success){
      //displayRequestResults(route, success);
      if(cb) cb();
    }, function(err){
      //displayRequestResults(route, err);
      if(cb) cb();
    })
  }
  /*build request body
  */
  function runPostRequest(route, cb){
    var request = replaceIdInRoute(route);
    if($scope.testAsUser){
      request.body.testing_user = $scope.testAsUser 
    }
    $http.post($scope.apiHost + request.url, request.body)
    .then(function(success){
      //displayRequestResults(route, success);
       if(cb) cb();
    }, function(err){
      //displayRequestResults(route, err);
      if(cb) cb();
    });
  };

  function runPutRequest(route, cb){
    var request = replaceIdInRoute(route);
    if($scope.testAsUser){
      request.body.testing_user = $scope.testAsUser 
    }
    
    $http.put($scope.apiHost + request.url, request.body)
    .then(function(success){
      //displayRequestResults(route,success);
      if(cb) cb();
    }, function(err){
      //displayRequestResults(route, err);
      if(cb) cb();
    });
  };

  function runDeleteRequest(route, cb){
    var request = replaceIdInRoute(route);
    request.url += buildQuerystring(route);

    $http.delete($scope.apiHost + request.url)
    .then(function(success){
      //displayRequestResults(route, success);
      if(cb) cb();
    }, function(err){
      //displayRequestResults(route, err);
      if(cb) cb();
    });
  };

  //replace /:model with id in route e.g. /api/v1/candidates/:candidate >> /api/v1/candidates/123sadasdf23
  function replaceIdInRoute(route){
    var body = $scope.newTestForm.values;
    for(var x in body){
      if(body[x] === undefined){
        delete body[x];
      }
    }
    if(route.restRoute.indexOf(":") > -1){
      var referenceIds = resolveReferenceIds($scope.newTestForm.values, route.params);
      var url = route.restRoute.split('/');
      for(var i = 0; i < url.length; i++){
        if(url[i].indexOf(":") > -1){
          delete $scope.newTestForm.values[ referenceIds[url[i]].valuesKey ];
          url[i] = referenceIds[url[i]]._id;
        } 
      }
      url = url.join('/');
      return {url:url, body:body};
    }else{
      return {url:route.restRoute, body:body};
    }
  }
  function resolveReferenceIds(values, params){
    var referenceIds = {};
    for(var x in params){
      if(params[x].type.indexOf(':') > -1){
        referenceIds[':' + x] = {};
        referenceIds[':' + x]._id = values[x] || '';
        referenceIds[':' + x].valuesKey = x;
      }
    }
    return referenceIds
  }

  //returns "?params=value" or ""
  function buildQuerystring(route){
    var querystring = "?";
    for(var x in $scope.newTestForm.values){
      querystring += x + "=" + $scope.newTestForm.values[x] + "&";
    }
    if(querystring.length > 1){
      querystring = querystring.slice(0, querystring.length - 1);
    }else{
      querystring = "";
    }
    if($scope.testAsUser){
      if(querystring.length > 1){
        querystring += "&testing_user=" + $scope.testAsUser;
      }else{
        querystring = "?testing_user=" + $scope.testAsUser;
      }
    }
    return querystring;
  }

  function buildRequestBody(request){

    if(request.body){

    }else{
      return request;
    }
  }

	function checkLoaded(){
		if($scope.controllers && $scope.users){
			$scope.loading = {completed:true};
		}
	}
  }
]);