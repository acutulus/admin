'use strict';

angular.module('dbtools')
	.controller('GraphController',['$scope', '$http', '$timeout', '$stateParams','$nkAuthService', 
		function($scope, $http, $timeout, $stateParams,$nkAuthService){

			$scope.user = $nkAuthService.getUser();
			if(!$scope.user || !$scope.user.admin){
				alert("No permissions");
				location.href = "/admin/dbtools/signin";
			}

			$scope.trackedEvents = [];  		//trackedEvent names for selecting trackedEvent to view
			$scope.trackedEventsDisplay = []; 	//trackedEvent display properties - e.g. [{display:true, color:#34343D, name:"View", data:[]}]
			
			//get trackedEvent names
			$scope.msgs = {loading:true};
			$http.get($scope.apiHost + '/admin/events/unique')
			.then(function(success){
				$scope.msgs = {};
				$scope.trackedEvents = success.data;
				drawGraph();
			}, function(err){
				console.log(err);
				$scope.msgs = {error:"Error occured " +  err};
			});

			/*### EVENT STUFF ###*/
			//get data for a specific trackedEvent and add it to graph
			$scope.getTrackedEventData = function(evt){
				if(evt){
					$http.get($scope.apiHost+'/api/v1/trackedEvents/byEventName?event=' + evt + "&start=" + $scope.timePeriod.start + "&end=" + $scope.timePeriod.end)
					.then(function(data){
						
						$scope.trackedEvents.splice($scope.trackedEvents.indexOf(evt), 1);
						$scope.trackedEventsDisplay.push({name:evt, display:true,
														  color:getRandomColor(), data:data.data});
						//call first draw of line
						for(var i = 0; i < $scope.trackedEventsDisplay.length; i++){
							if(evt === $scope.trackedEventsDisplay[i].name){
								toggleLine($scope.trackedEventsDisplay[i]);
							}
						}
					}, function(err){
						console.error(err)
					});
					$scope.trackedEventToAdd = null;
				}
			}
			
			function getRandomColor(){
				for(var i = 0; i < lineColors.length; i++){
					if(!lineColors[i].inUse){
						lineColors[i].inUse = true;
						return lineColors[i].value;
					}
				}
				return "#000000"; //out of colors, default black
			}
			var lineColors = [	{inUse:false, value:'#ff9933'}, {inUse:false, value:'#33cc33'}, 
								{inUse:false, value:'#00cccc'}, {inUse:false, value:'#0066ff'},
								{inUse:false, value:'#6600ff'}, {inUse:false, value:'#9900cc'}, 
								{inUse:false, value:'#e6e600'}, {inUse:false, value:'#e60000'},
								{inUse:false, value:'#86592d'}, {inUse:false, value:'#6699ff'}, 
								{inUse:false, value:'#ff3399'}, {inUse:false, value:'#33ff99'},
								{inUse:false, value:'#ff66ff'}, {inUse:false, value:'#99d6ff'}, 
								{inUse:false, value:'#996633'}, {inUse:false, value:'#666699'}
							 ];

			$scope.removeTrackedEvent = function(evt){
				for(var i = 0; i < $scope.trackedEventsDisplay.length; i++){
					if(evt.name === $scope.trackedEventsDisplay[i].name){
						$scope.trackedEventsDisplay.splice(i,1);
						$scope.trackedEvents.push(evt.name);
					}
				}
				removeLine(evt);

				if(!linesLeftOnGraph()){
					yAxisMax = 1;
					updateGraph();
				}
			}
			
			function linesLeftOnGraph(){
				for(var x in $scope.trackedEventsDisplay){
					if($scope.trackedEventsDisplay[x].display){
						return true;
					}
				}
				return false;
			}

			$scope.toggleEvent = function(evt){
				evt.display = !evt.display;
				toggleLine(evt);
			}
			/* #### END EVENT STUFF #####*/


			/* ############## D3 GRAPH STUFF #################*/
			
			//GRAPH GLOBAL VARIABLES
			var svg = false;
			var yAxisMax = 1;
			var xScale;
			var yScale;
			var xAxis;
			var yAxis;

			/*## Graph Time Stuff ##*/
			$scope.timeStep;
			$scope.timePeriod;
			var prettyDate = function(time){
				var date = new Date(time);
				return (1+ date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear());
			}
		    function timePeriodToMs(time){
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
			$scope.timePeriod = {period:'week'};
			$scope.timePeriod.ms = timePeriodToMs('week');
			$scope.timePeriod.end = new Date().getTime();
			$scope.timePeriod.start = $scope.timePeriod.end - $scope.timePeriod.ms;
			$scope.timePeriod.endPretty = prettyDate($scope.timePeriod.end);
			$scope.timePeriod.startPretty = prettyDate($scope.timePeriod.start);

			$scope.setTimePeriod = function(period, date){
				if(date){
					$scope.timePeriod.end = new Date(date).getTime();
					$scope.timePeriod.endPretty = prettyDate($scope.timePeriod.end);
				}
				if(period){
					$scope.timePeriod.period = period;
					$scope.timePeriod.ms = timePeriodToMs(period);
				}
				$scope.timePeriod.start = $scope.timePeriod.end - $scope.timePeriod.ms;
				$scope.timePeriod.startPretty = prettyDate($scope.timePeriod.start);

				if(date || period){
					drawGraph();
					redrawLines();
				}
			}

			/*## Graph Dimensions and X/Y axis stuff ##*/
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

			function drawGraph(){
				if(svg){
					updateGraph();
					redrawLines();
				}else{
					createGraph();
				}

			}
			function createGraph(){
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
			}	


			function updateGraph(){
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

				yScale = d3.scale.linear().domain([0,yAxisMax]).range([dimensions.height, 0]);

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

			/*timeout screen adjustment redraw graph stuff
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
			*/


		    /*### Line drawing/updating ####*/
		   	function toggleLine(evt){
		   		if(evt.display){
		   			if(evt.name.indexOf('.') > -1){
			    		evt.lineId = evt.name.split('.').join('-');
			    	}else if(evt.name.indexOf(' ') > -1){
			    		evt.lineId = evt.name.split(' ').join('-');
			    	}else if(evt.name.indexOf('_') > -1){
			    		evt.lineId = evt.name.split('_').join('-');
			    	}else{
			    		evt.lineId = evt.name;
			    	}
			    	drawLine(evt);
			    }else if(!evt.display){
			    	removeLine(evt);
			    }
		    }
		    
		    function removeLine(evt){
		    	d3.selectAll('#'+evt.lineId).remove();
		    }

		    function removeAllLines(){
		    	d3.selectAll('.k-line').remove();
		    	d3.selectAll('circle').remove();
		    }

		    function redrawLines(){
		    	removeAllLines();
		    	for(var x in $scope.trackedEventsDisplay){
		    		if($scope.trackedEventsDisplay[x].display){
		    			drawLine($scope.trackedEventsDisplay[x]);
		    		}
		    	}
		    }

		    /*Looks at time scale and draws a line map with #trackedEvents as Y and X as an incremental timeScale step*/
		    function drawLine(evt){
		    	var dimensions = getGraphDimensions();
		    	var pointCount = Math.floor(Math.floor(dimensions.width/30));
		    	var pointStepWidth = Math.floor( ($scope.timePeriod.end - $scope.timePeriod.start)/pointCount);
		    	var pointSize = 5;
		    	
		    	var uniqueClassName = evt.name.split('.').join('-'); //unique name for d3 selectors to latch onto
		    	var points = [];	//data to plug into graph


		    	if(evt.data){
		    		
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
		    		var dataInTimeRange = [];
		    		//get sorted events in each time range
		    		for(i = 0; i < evt.data.length; i++){
		    			if(evt.data[i]._createdAt >= $scope.timePeriod.start && evt.data[i]._createdAt <= $scope.timePeriod.end){
		    				dataInTimeRange.push(evt.data[i]);
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

					//update yAxis if new max
					if(yAxisMax < highestValueY){
						yAxisMax = highestValueY;
						yScale.domain([0,yAxisMax])

						yAxis = d3.svg.axis().scale(yScale)
    						.orient("left").ticks(Math.floor(dimensions.height/50));

    					d3.selectAll('g .y.axis')
    						.attr("transform", "translate(0,0)")
				       		.call(yAxis)
				       	redrawLines();
					}

					//draw dots
				    svg.selectAll("dot")
				        .data(points)
				      	.enter().append("circle")
				      	.attr('id', evt.lineId)
				        .attr("r", pointSize)
				        .attr("cx", function(d) { return xScale(d.x); })
				        .attr("cy", function(d) { return yScale(d.y); })

				    //draw line
		    		var lineFunction = d3.svg.line()
                        .x(function(d) { return xScale(d.x); })
                        .y(function(d) { return yScale(d.y); })
                        .interpolate("linear");
		    		
		    		svg.append("path")
		    			.attr('class', 'k-line ' + evt.lineId)
		    			.attr('id', evt.lineId)
                        .attr("d", lineFunction(points))
                        .attr("stroke", evt.color)
                        .attr("stroke-width", 2)
                        .attr("fill", "none");
		    	}


		    }
			/* ############## END D3 GRAPH STUFF #################*/
		}
	]); 