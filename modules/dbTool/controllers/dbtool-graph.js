'use strict';

angular.module('dbtools')
	.controller('GraphController',['$scope', '$http', '$timeout', '$stateParams','$nkAuthService', 
		function($scope, $http, $timeout, $stateParams,$nkAuthService){

			$scope.user = $nkAuthService.getUser();
			if(!$scope.user || !$scope.user.admin){
				alert("No permissions");
				location.href = "/admin/dbtools/signin";
			}

			//Retrieve and process graph data into $scope.graphData = {eventName:trackedEventObject}
			$scope.msgs = {loading:true};
			$http.get('/api/v1/trackedEvents')
			.then(function(success){
				processData(success.data);
			}, function(err){
				console.error(err);
				$scope.msgs = {error:err};
			});
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

			//list of colors, random generation too often results in black/white/brown/grey which sucks
			$scope.lineColors = [{inUse:false, value:'#ff9933'},{inUse:false, value:'#33cc33'},{inUse:false, value:'#00cccc'},{inUse:false, value:'#0066ff'},
								 {inUse:false, value:'#6600ff'}, {inUse:false, value:'#9900cc'}, {inUse:false, value:'#e6e600'}, {inUse:false, value:'#e60000'},
								 ,{inUse:false, value:'#86592d'}, {inUse:false, value:'#6699ff'}, {inUse:false, value:'#ff3399'}, {inUse:false, value:'#33ff99'}]

			function getRandomColor(){
				for(var i = 0; i < $scope.lineColors.length; i++){
					if(!$scope.lineColors[i].inUse){
						$scope.lineColors[i].inUse = true;
						return $scope.lineColors[i].value;
					}
				}
			}
			//holds selected events and their display/hide toggle
			//selectedEvents = [{display:boolean, event:String, color:#fffff}]
			$scope.selectedEvents = [];
			$scope.updateSelectedEvent = function(ev){
				if($scope.selectedEvent){
					var found = $scope.selectedEvents.find(function(elem, index){
						if(elem.name === $scope.selectedEvent){
							return true;
						}
					});
					if(!found) {
						var color = getRandomColor();
						var newEvent = {display:true, name:$scope.selectedEvent, color:color};
						$scope.selectedEvents.push(newEvent);
						drawLine(newEvent);
					}
					$scope.selectedEvent = "";
				}
			}

			/* ############## D3 GRAPH STUFF #################*/
			
			//GRAPH GLOBAL VARIABLES
			var svg;
			var yAxisMax = 1; 
			var xScale;
			var yScale;
			var xAxis;
			var yAxis;
			$scope.timeStep;
			$scope.timePeriod;

			var prettyDate = function(time){
				var date = new Date(time);
				return (1+ date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
			}

		    function timeStepToMs(time){
		    	switch(time){
		    		case("hour"):
		    			return 3600000;
		    		case("day"):
		    			return 86400000;
		    		case("week"):
		    			return 604800000;
		    		case("month"):
		    			return 2419200000;
		    		case("year"):
		    			return 31536000000;
		    		default:
		    			return false;
		    	}
		    }

		    //default initialize timeStep to weeks
			$scope.timeStep = {step:'week'};
			$scope.timeStep.stepMs = timeStepToMs('week');
			$scope.setTimeStep = function(step){
				$scope.timeStep = {step:step};
				$scope.timeStep.stepMs = timeStepToMs(step);
				$scope.setTimePeriod();
			}

			//$scope.timePeriod = x axis start/end of width, time defaults to lastweek - today
			$scope.setTimePeriod = function(time){
				if(time){
					$scope.currentPeriodEndTime = new Date(time).getTime();
				}
				if(!$scope.currentPeriodEndTime){
					$scope.currentPeriodEndTime = new Date().getTime();
				}
					
				$scope.timePeriod = {};
				$scope.timePeriod.end = $scope.currentPeriodEndTime;
				$scope.timePeriod.start = $scope.timePeriod.end - $scope.timeStep.stepMs;
				$scope.timePeriod.endPretty = prettyDate($scope.timePeriod.end);
				$scope.timePeriod.startPretty = prettyDate($scope.timePeriod.start);

				$scope.timePeriodSelecter = false;
				$scope.drawGraph();
				removeAllLines();
				drawAllLines();

			}

			//build graph dimensions based on window width/height
			function getGraphDimensions(){
				var dimensions = {};
				var width = document.getElementById('graphArea').offsetWidth * 0.9;
				var height = width * 0.6;
				var margin = {};
				margin.left = width * 0.04;
				margin.right = width * 0.04;
				margin.top = height * 0.04;
				margin.bottom = width * 0.04;
				dimensions.width = width;
				dimensions.height = height;
				dimensions.margin = margin;
				return dimensions;
			}

			//TODO - Dynamic X-axis should resolve between width, start, end times
			function getxAxisTicks(dimensions){

			}

			$scope.createGraph = function(){
				var dimensions = getGraphDimensions();

				var ticksX = Math.floor(dimensions.width/80);
				var ticksY = Math.floor(dimensions.height/50);
				var pointSpacing = Math.floor(dimensions.width/15);


				svg = d3.select("#graphArea")
				    		.append("svg")
				        	.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
				        	.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
				        	.attr("style","padding-left:10px")
				    		.append("g")
				        	.attr("transform", 
				              "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");


				xScale = d3.time.scale().domain([$scope.timePeriod.start, $scope.timePeriod.end])
						.range([0, dimensions.width]);

				yScale = d3.scale.linear().range([dimensions.height, 0]);

				// Define the axes
				xAxis = d3.svg.axis().scale(xScale)
				    		.orient("bottom").ticks(ticksX);

				yAxis = d3.svg.axis().scale(yScale)
    						.orient("left").ticks(ticksY);

			   	// Add the X Axis
			    svg.append("g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + dimensions.height + ")")
			        .call(xAxis);
				
			    svg.append("g")
			        .attr("class", "y axis")
			        .call(yAxis);

				$scope.graphDrawn = true;
			}	


			$scope.updateGraph = function(){
				var dimensions = getGraphDimensions();
				var ticksX = Math.floor(dimensions.width/80);
				var ticksY = Math.floor(dimensions.height/50);
				var pointSpacing = Math.floor(dimensions.width/15);

				svg.attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
		        	.attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)			

		        /*d3.selectAll('svg g')
		        	.attr("transform",
		        		"translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");*/

				xScale = d3.time.scale().domain([$scope.timePeriod.start, $scope.timePeriod.end]).range([0, dimensions.width]);

				yScale = d3.scale.linear().range([dimensions.height, 0]);

				xAxis = d3.svg.axis().scale(xScale)
				    		.orient("bottom").ticks(ticksX);

				yAxis = d3.svg.axis().scale(yScale)
    						.orient("left").ticks(ticksY);

		       	d3.selectAll('g .x.axis')
		       		.attr("transform", "translate(0," + dimensions.height + ")")
		       		.call(xAxis)

		       	d3.selectAll('g .y.axis')
		       		.call(yAxis)
		    }

			/*timeout screen adjustment redraw graph stuff*/
			var resizing = false;
			var resizeGraph = function(){
				if(resizing){
					clearTimeout(resizing);
				}
				resizing = setTimeout(function() {
					$scope.drawGraph();
				}, 500);
			}
			window.addEventListener('resize', resizeGraph)

			$scope.drawGraph = function(){
				yAxisMax = 1;
				if($scope.graphDrawn){
					$scope.updateGraph();
				}else{
					$scope.createGraph();
				}
			}

		    /*### Line drawing/updating ####*/
		    $scope.toggleLine = function(event){
		    	var uniqueClassName = event.name.split('.').join('-');
		    	var removes = d3.selectAll('.'+uniqueClassName);
		    	if(removes[0].length > 0){
		    		removes.remove();
		    	}else{
		    		drawLine(event);
		    	}
		    	//reset y-axis if no lines remain on graph
		    	if($scope.selectedEvents.length === 0){
		    		yAxisMax = 1;
		    	}
		    }
		    
		    function removeAllLines(){
		    	d3.selectAll('.k-line').remove();
		    	d3.selectAll('circle').remove();
		    }

		    function drawAllLines(){
		    	for(var i = 0; i < $scope.selectedEvents.length; i++){
		    		if($scope.selectedEvents[i].display){
		    			drawLine($scope.selectedEvents[i]);
		    		}
		    	}
		    }

		    /*Looks at time scale and draws a line map with #trackedEvents as Y and X as an incremental timeScale step*/
		    function drawLine(evt){
		    	var dimensions = getGraphDimensions();
		    	var pointCount = Math.floor(Math.floor(dimensions.width/30));
		    	var pointStepWidth = Math.floor( ($scope.timePeriod.end - $scope.timePeriod.start)/pointCount);
		    	var pointSize = 5;
		    	
		    	//create a classname using - instead of ., cannot use . for selectors
		    	var uniqueClassName = evt.name.split('.').join('-');

		    	var points = [];	//data to plug into graph
		    	var dataInTimeRange = [];
		    	//var timeScale = {};
		    	//var timeStep = resolveTimeStep($scope.timeStep);
		    	var data = $scope.graphData[evt.name];

		    	if(data){
		    		
		    		//build points array, set x value of each point
		    		var currentStartTime = $scope.timePeriod.start;
		    		for(var i = 0; i < pointCount; i++){
		    			points[i] = {
		    						start:currentStartTime, 
		    						end:currentStartTime + pointStepWidth,
		    						}
		    			points[i].x = points[i].start + (points[i].end - points[i].start) / 2;

		    			currentStartTime = points[i].end + 1;
		    		}

		    		//get sorted events in each time range
		    		for(i = 0; i < data.length; i++){
		    			if(data[i]._createdAt >= $scope.timePeriod.start && data[i]._createdAt <= $scope.timePeriod.end){
		    				dataInTimeRange.push(data[i]);
		    			}
		    		}
		    		dataInTimeRange.sort(function(a,b){
		    			return a._createdAt - b._createdAt;
		    		});

		    		//add y-value as count of events that occured in each time range.
		    		var pointValueY = 0;
		    		var highestValueY = 0;
		    		for(i = 0; i < points.length; i++){
		    			for(var k = 0; k < dataInTimeRange.length; k++){

		    				if(dataInTimeRange[k]._createdAt > points[i].end){
		    					k = dataInTimeRange.length;
		    				}else if (dataInTimeRange[k]._createdAt >= points[i].start && dataInTimeRange[k]._createdAt <= points[i].end ){
		    					pointValueY++;
		    				}
		    			}
		    			if(pointValueY > highestValueY){
		    				highestValueY = pointValueY
		    			}
		    			points[i].y = pointValueY;

		    			pointValueY = 0;

		    		}

					//update yAxis
					if(yAxisMax < highestValueY){
						yAxisMax = highestValueY;
						yScale.domain([0,yAxisMax])

						yAxis = d3.svg.axis().scale(yScale)
    						.orient("left").ticks(Math.floor(dimensions.height/50));

    					d3.selectAll('g .y.axis')
    						.attr("transform", "translate(0,0)")
				       		.call(yAxis)
					}

					//draw dots
				    svg.selectAll("dot")
				        .data(points)
				      	.enter().append("circle")
				      	.attr('class', uniqueClassName)
				        .attr("r", pointSize)
				        .attr("cx", function(d) { return xScale(d.x); })
				        .attr("cy", function(d) { return yScale(d.y); })

				    //draw line
		    		var lineFunction = d3.svg.line()
                        .x(function(d) { return xScale(d.x); })
                        .y(function(d) { return yScale(d.y); })
                        .interpolate("linear");
		    		
		    		svg.append("path")
		    			.attr('class', 'k-line ' + uniqueClassName)
                        .attr("d", lineFunction(points))
                        .attr("stroke", evt.color)
                        .attr("stroke-width", 2)
                        .attr("fill", "none");
		    	}


		    }

		    //launch graph by setting default time period and triggering a redraw
			$scope.setTimePeriod(false);

			/* ############## END D3 GRAPH STUFF #################*/


		}
	]); 