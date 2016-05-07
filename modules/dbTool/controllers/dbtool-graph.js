'use strict';

angular.module('dbtools')
	.controller('GraphController',['$scope', '$http', '$timeout', '$stateParams','$nkAuthService', 
		function($scope, $http, $timeout, $stateParams,$nkAuthService){

			$scope.user = $nkAuthService.getUser();
			if(!$scope.user || !$scope.user.admin){
				alert("No permissions");
				location.href = "/admin/dbtools/signin";
			}

			//Get data for graph
			var processData = function(data){
				$scope.graphData = {};
				$scope.eventTypes = [];
				for(var i = 0; i < data.length; i++){
					if($scope.graphData.hasOwnProperty(data[i].event)){
						$scope.graphData[data[i].event].push(data[i]);
					}else{
						$scope.eventTypes.push(data[i].event);
						$scope.graphData[data[i].event] = [];
						$scope.graphData[data[i].event].push(data[i]);
					}
				}
				$scope.msgs = false;
			}

			$scope.msgs = {loading:true};
			$http.get('/api/v1/trackedEvents')
			.then(function(success){
				processData(success.data);
			}, function(err){
				console.error(err);
				$scope.msgs = {error:err};
			});

			$scope.selectTimes = function(){
				if($scope.startTime && $scope.endTime){
					var start = new Date($scope.startTime).getTime();
					var end = new Date($scope.startTime).getTime();
					if(start > end){
					}else{
						if(start === end){
							end = start + 8640000;
						}
						$scope.times = {start:$scope.startTime, startMs:start, end:$scope.endTime, endMs:end, valid:true};
					}
				}
			}

			//holds selected events and their display/hide toggle
			//selectedEvents = [{display:boolean, event:String}]
			$scope.selectedEvents = [];
			$scope.updateSelectedEvent = function(ev){
				var found = $scope.selectedEvents.find(function(elem, index){
					if(elem.name === $scope.selectedEvent){
						return true;
					}
				});
				if(!found) {
					$scope.selectedEvents.push({display:false, name:$scope.selectedEvent});
				}
				$scope.selectedEvent = "";
			}

			/*GRAPH STUFF*/
			
			var svg = false;

			function setSize(){
				var size = {};
				var width = document.getElementById('graphArea').offsetWidth * 0.9;
				var height = width * 0.6;
				var margin = {};
				margin.left = width * 0.04;
				margin.right = width * 0.04;
				margin.top = height * 0.04;
				margin.bottom = width * 0.04;
				size.width = width;
				size.height = height;
				size.margin = margin;
				return size;
			}

			/*timeout screen adjustment redraw graph stuff*/
			var resizing = false;
			var time;
			var resizeGraph = function(){
				if(resizing){
					clearTimeout(resizing);
				}
				resizing = setTimeout(function() {
					drawGraph();
				}, 500);
			}
			window.addEventListener('resize', resizeGraph)

			/*Initialize and build D3 Stuff*/
			var drawGraph = $scope.drawGraph = function(){
				if($scope.times && $scope.times.valid){
					if(svg){
						updateGraph();
					}else{
						createGraph();				
					}
				}
			}

			/*Draw graph once for a time period*/
			/*
			*
			*/
			function createGraph(){
				var size = setSize();
				var ticksX = Math.floor(size.width/100);
				var periods = Math.floor(size.width/15);

				svg = d3.select("#graphArea")
				    		.append("svg")
				        	.attr("width", size.width + size.margin.left + size.margin.right)
				        	.attr("height", size.height + size.margin.top + size.margin.bottom)
				        	.attr("padding","20px")
				    		.append("g")
				        	.attr("transform", 
				              "translate(" + size.margin.left + "," + size.margin.top + ")");


				var x = d3.time.scale().domain([$scope.times.start, $scope.times.end])
						.range([0, size.width]);

				var y = d3.scale.linear().range([size.height, 0]);

				// Define the axes
				var xAxis = d3.svg.axis().scale(x)
				    		.orient("bottom").ticks(ticksX);

				var yAxis = d3.svg.axis().scale(y)
    						.orient("left").ticks(2);

			   	// Add the X Axis
			    svg.append("g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + size.height + ")")
			        .call(xAxis);
				
			    svg.append("g")
			        .attr("class", "y axis")
			        .call(yAxis);
			}

			function updateGraph(){
				var size = setSize();
				var ticksX = Math.floor(size.width/100);
				var periods = Math.floor(size.width/15);
				d3.selectAll('svg')
		        	.attr("width", size.width + size.margin.left + size.margin.right)
		        	.attr("height", size.height + size.margin.top + size.margin.bottom)			

		        d3.selectAll('svg g')
		        	.attr("transform",
		        		"translate(" + size.margin.left + "," + size.margin.top + ")");

				var x = d3.time.scale().domain([$scope.times.start, $scope.times.end])
						.range([0, size.width]);

				var y = d3.scale.linear().range([size.height, 0]);

				var xAxis = d3.svg.axis().scale(x)
				    		.orient("bottom").ticks(ticksX);

				var yAxis = d3.svg.axis().scale(y)
    						.orient("left").ticks(2);

		       	d3.selectAll('g .x.axis')
		       		.attr("transform", "translate(0," + size.height + ")")
		       		.call(xAxis)

		       	d3.selectAll('g .y.axis')
		       		.attr("transform", "translate(0,0)")
		       		.call(yAxis)
		    }
		}
	]) 