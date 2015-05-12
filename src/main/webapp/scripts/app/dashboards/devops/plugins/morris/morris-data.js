// Morris.js Charts sample data for SB Admin template

$(function() {

	var gitData = {
		info : []
	};
	var gitData1 = {
			info : []
		};
	var gitData2 = {
			info : []
		};
	$
			.ajax({
				url : "https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/commits",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic "
							+ btoa("nwt-buildserver:NWT91life"));
				},
				type : 'GET',
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				data : '{"foo":"bar"}',
				success : function(data1) {
					var previousItem = "";
					var count = 1;
					for ( var i in data1) {

						var item = data1[i];
						if (i > 0
								&& previousItem == item.commit.author.date
										.substring(0, 10)) {
							count += 1;

							previousItem = item.commit.author.date.substring(0,
									10);

						} else {
							if (i == 0) {
								previousItem = item.commit.author.date
										.substring(0, 10)
							} else {
								gitData.info.push({
									"d" : previousItem,
									"visits" : count,
								});
								count = 1;
								previousItem = item.commit.author.date
										.substring(0, 10);
							}

						}

					}
					
				

					Morris.Line({
						element : 'morris-line-chart',

						data : gitData.info,
						// The name of the data record attribute that contains x-visitss.
						xkey : 'd',
						// A list of names of data record attributes that contain y-visitss.
						ykeys : [ 'visits' ],
						// Labels for the ykeys -- will be displayed when you hover over the
						// chart.
						labels : [ 'Check-ins' ],
						// Disables line smoothing
						smooth : false,
						resize : true
					});

				},
				error : function() {
					alert("Cannot get data");
				}
			});
	
	$
	.ajax({
		url : "https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/releases",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic "
					+ btoa("nwt-buildserver:NWT91life"));
		},
		type : 'GET',
		dataType : 'json',
		contentType : 'application/json',
		processData : false,
		data : '{"foo":"bar"}',
		success : function(data1) {
			var previousItem = "";
			var count = 1;
			
			
			 if(data1.length==2)
	    	   {
	    	    if(data1[0].published_at == data1[1].published_at) 
	    	    	{
	    	    	gitData1.info.push({
						"d" : data1[0].published_at,
						"visits" : 1,
					});
	    	    	}
	    	    else
	    	    	{
	    	    	gitData1.info.push({
						"d" : data1[1].published_at,
						"visits" : 1,
					});
	    	    	gitData1.info.push({
						"d" : data1[0].published_at,
						"visits" : 1,
					});
	    	    	
	    	    	}
	    	 
	    	    
	    	    
	    	   }
//			 else
//				 {
//			for ( var i in data1) {
//               alert(data1.length)
//				var item = data1[i];
//				alert(item.published_at
//								.substring(0, 10))
//								
//								
//		      
//				if (i > 0
//						&& previousItem == item.published_at
//								.substring(0, 10)) {
//					count += 1;
//
//					previousItem = item.published_at.substring(0,
//							10);
//
//				} else {
//					
//					if (i == 0) {
//						previousItem = item.published_at
//								.substring(0, 10)
//					} 
//					
//					else {
//						gitData1.info.push({
//							"d" : previousItem,
//							"visits" : count,
//						});
//						count = 1;
//						previousItem = published_at
//								.substring(0, 10);
//					}
//					
//				}
//
//			}
//			
//				 }

			Morris.Line({
				element : 'morris-line-chart1',

				data : gitData1.info,
				// The name of the data record attribute that contains x-visitss.
				xkey : 'd',
				// A list of names of data record attributes that contain y-visitss.
				ykeys : [ 'visits' ],
				// Labels for the ykeys -- will be displayed when you hover over the
				// chart.
				labels : [ 'Releases' ],
				// Disables line smoothing
				smooth : false,
				resize : true
			});

		},
		error : function() {
			alert("Cannot get data");
		}
	});
	

//	$
//	.ajax({
//		url : "https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/stats/contributors",
//		beforeSend : function(xhr) {
//			xhr.setRequestHeader("Authorization", "Basic "
//					+ btoa("nwt-buildserver:NWT91life"));
//		},
//		type : 'GET',
//		dataType : 'json',
//		contentType : 'application/json',
//		processData : false,
//		data : '{"foo":"bar"}',
//		success : function(data1) {
//			for ( var i in data1) {
//   
//				var item = data1[i];
//				gitData2.info.push({
//					"name" : item.author.login,
//					"commits" : item.total,
//				});
//				
//			}
//			Morris.Bar({
//				element : 'morris-bar-chart1',
//				data :gitData2.info,
//				xkey : 'name',
//				ykeys : [ 'commits' ],
//				labels : [ 'Commits' ],
//				barRatio : 0.4,
//				xLabelAngle : 35,
//				hideHover : 'auto',
//				resize : true
//			});
//
//		},
//		error : function() {
//			alert("Cannot get data");
//		}
//	});

	//		for (i = 0; i < data.length; i++) { 
	//			gitdata[i].d=data.commit.author.date;
	//             alert(gitdata[i].d.substring(10));
	//			
	//		
	//
	//
	//		}
	//		for (var item in data) {
	//			 gitdata.push({ "d" : data[item].commit.author.date , "visits" : 1});

	// Area Chart
//	Morris.Area({
//		element : 'morris-area-chart',
//		data : [ {
//			period : '2010 Q1',
//			iphone : 2666,
//			ipad : null,
//			itouch : 2647
//		}, {
//			period : '2010 Q2',
//			iphone : 2778,
//			ipad : 2294,
//			itouch : 2441
//		}, {
//			period : '2010 Q3',
//			iphone : 4912,
//			ipad : 1969,
//			itouch : 2501
//		}, {
//			period : '2010 Q4',
//			iphone : 3767,
//			ipad : 3597,
//			itouch : 5689
//		}, {
//			period : '2011 Q1',
//			iphone : 6810,
//			ipad : 1914,
//			itouch : 2293
//		}, {
//			period : '2011 Q2',
//			iphone : 5670,
//			ipad : 4293,
//			itouch : 1881
//		}, {
//			period : '2011 Q3',
//			iphone : 4820,
//			ipad : 3795,
//			itouch : 1588
//		}, {
//			period : '2011 Q4',
//			iphone : 15073,
//			ipad : 5967,
//			itouch : 5175
//		}, {
//			period : '2014 Q1',
//			iphone : 10687,
//			ipad : 4460,
//			itouch : 2028
//		}, {
//			period : '2014 Q2',
//			iphone : 8432,
//			ipad : 5713,
//			itouch : 1791
//		} ],
//		xkey : 'period',
//		ykeys : [ 'iphone', 'ipad', 'itouch' ],
//		labels : [ 'iPhone', 'iPad', 'iPod Touch' ],
//		pointSize : 2,
//		hideHover : 'auto',
//		resize : true
//	});

	// Donut Chart
	Morris.Donut({
		element : 'morris-donut-chart',
		data : [ {
			label : "Complaint Code",
			value : 12
		}, {
			label : "Non-complaint code",
			value : 30
		}, {
			label : "Errors",
			value : 20
		} ],
		resize : true
	});

	// Line Chart
	// Bar Chart
//	Morris.Bar({
//		element : 'morris-bar-chart',
//		data : [ {
//			device : 'Jan',
//			geekbench : 5
//		}, {
//			device : 'Feb',
//			geekbench : 10
//		}, {
//			device : 'March',
//			geekbench : 9
//		}, {
//			device : 'April',
//			geekbench : 7
//		}, {
//			device : 'May',
//			geekbench : 6
//		}, {
//			device : 'June',
//			geekbench : 11
//		} ],
//		xkey : 'device',
//		ykeys : [ 'geekbench' ],
//		labels : [ 'Deployments' ],
//		barRatio : 0.4,
//		xLabelAngle : 35,
//		hideHover : 'auto',
//		resize : true
//	});



});
