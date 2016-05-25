'use strict';

angular.module('dbtools').controller('DocumentationCtrl', ['$scope', '$http', '$anchorScroll',
  function($scope, $http, $anchorScroll){
      $scope.loadingRestRoutes = true;
      $http.get($scope.apiHost + '/admin/restRoutes')
        .then(function(response){
          $scope.loadingRestRoutes = false;
          $scope.controllers = response.data;
          addTestParams();
        });

      $http.get($scope.apiHost + '/admin/models')
      .then(function(response){
        $scope.models = response.data;
        addTestParams();
      }); 

      //add TestParams property onto controllers.functions
      //testParams turns reference type params into strings, 
      //but switch reference type to string, add subSchema onto Object type onto their label
      function addTestParams(){
        if($scope.models && $scope.controllers){
          var testParams = {};
          var params;
          for(var x in $scope.controllers){
            for(var k in $scope.controllers[x].functions){
              params = $scope.controllers[x].functions[k].params;
              for(var y in params){
                testParams[y] = modifyObjectAndReferenceParams(params[y]);
              }
              $scope.controllers[x].functions[k].testParams = testParams;
              testParams = {};
            }
          }
        }
      }
      function modifyObjectAndReferenceParams(params){
        if(typeof params === "string"){
         
          if(params.indexOf(":") === 0){
            return "string";
          }else if(params !== "_user" && params.indexOf("_") === 0){
            var modelName = params.slice(1);
            if($scope.models[modelName]){
              var subSchema = {};
              for(var x in $scope.models[modelName].schema){
                if(x.indexOf("_") === 0){

                }else{
                  subSchema[x] = $scope.models[modelName].schema[x].type;
                }
              }
              return {type:"object", subSchema:subSchema};
            }else{
              return "textarea";
            }
          }else{
            return params;
          }

        }else if(typeof params === "object"){
         
          if(params.type.indexOf(":") === 0){
            return "string";
          }else if(params.type !== "_user" && params.type.indexOf("_") === 0){
            var modelName = params.type.slice(1);
            if($scope.models[modelName]){
              var subSchema = {};
              for(var x in $scope.models[modelName].schema){
                if(x.indexOf("_") === 0){

                }else{
                  subSchema[x] = $scope.models[modelName].schema[x].type;
                }
              }
            }
            return {type:"object", subSchema:subSchema};
          }else{
            return params.type;
          }

        }else{
          console.error("Weird Arg passed in Params", params);
          return params;
        }
      }
      $scope.openAPIExplorer = function(route) {

      };
      $scope.openUnittests = function(item) {
        $http.get($scope.apiHost + '/api/v1/unitTests/testsForRoute?route='+item.route)
          .then(function(response){
            item.unitTests = response.data;
          }); 
      };

      $scope.toScroll = function(route) {
        $anchorScroll(route.restRoute);
      }; 

      $scope.testRoute = function(route){
        console.log(route);
        switch(route.method){
          case('get'): return runGetRequest(route);
          case('post'): return runPostRequest(route);
          case('put'): return runPutRequest(route);
          case('delete'): return runDeleteRequest(route);
        }
      };     

      function runGetRequest(route){
        var url = replaceIdInRoute(route);
        url += buildQuerystring(route);

        $http.get($scope.apiHost + url)
        .then(function(success){
          displayRequestResults(route, success);
        }, function(err){
          displayRequestResults(route, err);
        })
      }
      /*build request body
      */
      function runPostRequest(route){
        var url = replaceIdInRoute(route);
        var body = route.testRouteParams;
       
        $http.post($scope.apiHost + url, body)
        .then(function(success){
          displayRequestResults(route, success);
        }, function(err){
          displayRequestResults(route, err);
        });
      };

      function runPutRequest(route){
        var url = replaceIdInRoute(route);
        var body = route.testRouteParams;

        $http.put($scope.apiHost + url, body)
        .then(function(success){
          displayRequestResults(route,success);
        }, function(err){
          displayRequestResults(route, err);
        });
      };

      function runDeleteRequest(route){
        var url = replaceIdInRoute(route);
        url += buildQuerystring(route);

        $http.delete($scope.apiHost + url)
        .then(function(success){
          displayRequestResults(route, success);
        }, function(err){
          displayRequestResults(route, err);
        });
      };

      function displayRequestResults(route, response){
        route.testResults = {};
        route.testResults.statusColor = response.status === 200 ? 'green' : 'red';
        route.testResults.status = response.status;
        route.testResults.statusText = response.statusText;
        route.testResults.data = response.data;
        route.testResults.method = response.config.method;
        route.testResults.headers = response.config.headers;
        route.testResults.url = response.config.url;
      }

      //replace /:model with id in route e.g. /api/v1/candidates/:candidate turned into /api/v1/candidates/123sadasdf23
      function replaceIdInRoute(route){
        if(route.restRoute.indexOf(":") > -1){
          //split url string into array >> replace reference fields >> join array into url string
          var url = route.restRoute.split('/');
          for(var i = 0; i < url.length; i++){
            if(url[i].indexOf(":") > -1){
              var key = url[i].slice(1);
              url[i] = route.testRouteParams[key];
              delete route.testRouteParams[key]; //remove field so it doesnt get added to querystring or body
            } 
          }
          url = url.join('/');
          return url;
        }else{
          return route.restRoute;
        }
      }
      //returns "?params=value" or ""
      function buildQuerystring(route){
        var querystring = "?";
        for(var x in route.testRouteParams){
          querystring += x + "=" + route.testRouteParams[x] + "&";
        }
        if(querystring.length > 1){
          querystring = querystring.slice(0, querystring.length - 1);
        }else{
          querystring = "";
        }
        return querystring;
      }
/*
            $scope.controllers = {
              'orders':{
                "post.order.create":{
                    "name": "create",
                    "params": {
                      "name": {
                        "type":"string",
                        "required":true,
                        "description":"Name of the user",
                        "example":"Gregory Koberger"
                      },
                      "email": {
                        "type":"string",
                        "required":true,
                        "description":"The email of the user",
                        "example":"gkoberger@gmail.com"
                      },
                      "address": {
                        "type":"string",
                        "required":true,
                        "description":"The address to be shipped to",
                        "example":"123 Main St, San Francisco, CA 94117"
                      },
                      "fulfilled": {
                        "type":"boolean",
                        "required":true,
                        "default":false,
                        "description":"Has this order been fulfilled yet?",
                        "example":false
                      }
                    },
                    "method": "post",
                    "responseType": "JSON",
                    "apiVersions": "*",
                    "label": "Create a new order",
                    "description": "You can create a new order using the API.",
                    "restRoute": "/orders",
                    "results": {
                      "success":{
                        "id":1,
                        "user":{
                          "name":"Gregory Koberger",
                          "email":"greg@readme.io"
                        },
                        "createdAt":1412575067978,
                        "address":"123 Main St, San Francisco, CA",
                        "fulfilled":false
                      },
                      "failure":{
                        "error": true,
                        "message": "This could not be created"
                      }
                    }
                  },
                  "get.order.query":{
                    "name": "list",
                    "params": {
                      "pizzaType": {
                        "type":"string",
                        "required": true,
                        "description": "The style of pizza ordered",
                        "example": "Small cheese, extra sauce"
                      },
                      "name": {
                        "type":"string",
                        "required":true,
                        "description":"Name of the user",
                        "example":"Gregory Koberger"
                      },
                      "phone": {
                        "type": "string",
                        "required": true,
                        "description": "Customer phone number",
                        "example": "(555)555-5555"
                      }
                    },
                    "method": "get",
                    "responseType": "JSON",
                    "apiVersions": "*",
                    "label": "List all orders",
                    "description": "You can list all the orders using the API.",
                    "restRoute": "/orders",
                    "results": {
                      "success":{
                        "id":1,
                        "user":{
                          "name":"Gregory Koberger",
                          "email":"greg@readme.io"
                        },
                        "createdAt":1412575067978,
                        "address":"123 Main St, San Francisco, CA",
                        "fulfilled":false
                      },
                      "failure":{
                        "error": true,
                        "message": "This could not be created"
                      }
                    }
                  }
                },
                'pizza': {
                  "post.pizza.create":{
                    "name": "create",
                    "params": {
                      "name": {
                        "type":"string",
                        "required":true,
                        "description":"Name of the user",
                        "example":"Gregory Koberger"
                      },
                      "toppings": {
                        "type":"string",
                        "required":true,
                        "description":"The toppings for the pizza",
                        "example":"cheese"
                      },
                    },
                    "method": "post",
                    "responseType": "JSON",
                    "apiVersions": "*",
                    "label": "Create a new pizza",
                    "description": "You can create a new pizza using the API.",
                    "restRoute": "/pizzas",
                    "results": {
                      "success":{
                        "id":1,
                        "user":{
                          "name":"Gregory Koberger",
                          "email":"cheese"
                        },
                        "createdAt":1412575067978,
                        "address":"123 Main St, San Francisco, CA",
                        "fulfilled":false
                      },
                      "failure":{
                        "error": true,
                        "message": "This could not be created"
                      }
                    }
                  },
                }
              };
              */
        }
    ]);
