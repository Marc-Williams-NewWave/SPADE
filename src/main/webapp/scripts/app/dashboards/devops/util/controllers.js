'use strict';

/* Controllers */

newwavedashApp.controller('AdminController',function($scope,resolvedRel,resolvecheckin,resolvedBuild,resolvedCont,$rootScope,$route,$stateParams,$http,Admin,resolveDonut){

	var issues = resolveDonut;
	$scope.chart_options = {
			data:issues,
			colors: [
			         '#0BA462',
			         '#B22222',
			         '#FC4747',
			         '#B31212'
			         ]
	}
	
            var gitData = {
        		info : []
        	};
        	var gitData1 = {
        			info : []
        		};
        	var gitData2 = {
        			info : []
        		};
        	
        	var gitData3 = {
        			info : []
        		};
        	var x="";
        
        		for (var i = 0; i < resolvedCont.length; i++) {
                	
                    var item = resolvedCont[i];
    					gitData2.info.push({
    						"name" : item.author.login.substring(0,15),
    						"commits" : item.total,
    					});
    					
    				}
            	
            	  $scope.xkey = 'name';

      	        $scope.ykeys = ['commits'];

      	        $scope.labels = ['Commits'];
      	        
      	  

      	        $scope.myModelbar = gitData2.info;

           
        	
        	
        		  var buildData= {
        	        		info : []
        	        	};
        		  for (var i = 0; i < resolvedBuild.length; i++) {
                	
                    var item = resolvedBuild[i];
                       buildData.info.push({
    						"number" : item.number+item.result.substring(0,1),
    						"time" : item.duration,
    					});
    					
    				}
            	
            	$scope.xkey = 'number';

      	        $scope.ykeys = ['time'];

      	        $scope.labels = ['Duration'];
      	        
      	        $scope.myModelbarBuild = buildData.info;

           
        	var previousItem = "";
    		var count = 1;
        	
    		 if(resolvedRel.length==2)
        	   {
        	    if(resolvedRel[0].published_at == resolvedRel[1].published_at) 
        	    	{
        	    	gitData1.info.push({
    					"d" : resolvedRel[0].published_at,
    					"visits" : 1,
    				});
        	    	}
        	    else
        	    	{
        	    	gitData1.info.push({
    					"d" : resolvedRel[1].published_at,
    					"visits" : 1,
    				});
        	    	gitData1.info.push({
    					"d" : resolvedRel[0].published_at,
    					"visits" : 1,
    				});
        	    	
        	    	}
        	 
        	    
        	    
        	   }
    		    
    		    
    		        $scope.xkey = 'd';

    	        $scope.ykeys = ['visits'];

    	        $scope.labels = ['Releases'];

    	        $scope.myModelline = gitData1.info;
        	
        
        		
//        		$scope.xkey = 'date';
//
//    	        $scope.ykeys = ['checkin'];
//
//    	        $scope.labels = ['Check-ins'];
//
//    	        $scope.myModelline1 = resolvecheckin;
//
//      	        

          

        	

     

});
newwavedashApp.controller('MainController', function ($scope) {
});

newwavedashApp.controller('SelectController', function ($state,$scope,$location,SelectService,resolvedSelect) {

	var projects = [];
	var project;
	projects.push("Select Project");
	for (var i = 0; i < resolvedSelect.length; i++) {
		projects.push(resolvedSelect[i].name);


	}


	$scope.colors = projects;


	$('select.selectpicker').on('change', function(){
		var selected = $('.selectpicker option:selected').text();
	
		$state.go("dashboard",{id:selected});

//		$location.path('/dashboard/'+selected);

	});

});


newwavedashApp.controller('LanguageController', function ($scope, $translate, LanguageService) {
	$scope.changeLanguage = function (languageKey) {
		$translate.use(languageKey);

		LanguageService.getBy(languageKey).then(function(languages) {
			$scope.languages = languages;
		});
	};

	LanguageService.getBy().then(function (languages) {
		$scope.languages = languages;
	});
});

newwavedashApp.controller('MenuController', function ($scope) {
});

newwavedashApp.controller('LoginController', function ($scope, $location, AuthenticationSharedService) {
	$scope.rememberMe = true;
	$scope.login = function () {
		AuthenticationSharedService.login({
			username: $scope.username,
			password: $scope.password,
			rememberMe: $scope.rememberMe
		});
	}
});

newwavedashApp.controller('LogoutController', function ($location, AuthenticationSharedService) {
	AuthenticationSharedService.logout();
});

newwavedashApp.controller('SettingsController', function ($scope, Account) {
	$scope.success = null;
	$scope.error = null;
	$scope.settingsAccount = Account.get();

	$scope.save = function () {
		$scope.success = null;
		$scope.error = null;
		$scope.errorEmailExists = null;
		Account.save($scope.settingsAccount,
				function (value, responseHeaders) {
			$scope.error = null;
			$scope.success = 'OK';
			$scope.settingsAccount = Account.get();
		},
		function (httpResponse) {
			if (httpResponse.status === 400 && httpResponse.data === "e-mail address already in use") {
				$scope.errorEmailExists = "ERROR";
			} else {
				$scope.error = "ERROR";
			}
		});
	};
});

newwavedashApp.controller('RegisterController', function ($scope, $translate, Register) {
	$scope.success = null;
	$scope.error = null;
	$scope.doNotMatch = null;
	$scope.errorUserExists = null;
	$scope.register = function () {
		if ($scope.registerAccount.password != $scope.confirmPassword) {
			$scope.doNotMatch = "ERROR";
		} else {
			$scope.registerAccount.langKey = $translate.use();
			$scope.doNotMatch = null;
			$scope.success = null;
			$scope.error = null;
			$scope.errorUserExists = null;
			$scope.errorEmailExists = null;
			Register.save($scope.registerAccount,
					function (value, responseHeaders) {
				$scope.success = 'OK';
			},
			function (httpResponse) {
				if (httpResponse.status === 400 && httpResponse.data === "login already in use") {
					$scope.error = null;
					$scope.errorUserExists = "ERROR";
				} else if (httpResponse.status === 400 && httpResponse.data === "e-mail address already in use") {
					$scope.error = null;
					$scope.errorEmailExists = "ERROR";
				} else {
					$scope.error = "ERROR";
				}
			});
		}
	}
});

newwavedashApp.controller('ActivationController', function ($scope, $routeParams, Activate) {
	Activate.get({key: $routeParams.key},
			function (value, responseHeaders) {
		$scope.error = null;
		$scope.success = 'OK';
	},
	function (httpResponse) {
		$scope.success = null;
		$scope.error = "ERROR";
	});
});

newwavedashApp.controller('PasswordController', function ($scope, Password) {
	$scope.success = null;
	$scope.error = null;
	$scope.doNotMatch = null;
	$scope.changePassword = function () {
		if ($scope.password != $scope.confirmPassword) {
			$scope.doNotMatch = "ERROR";
		} else {
			$scope.doNotMatch = null;
			Password.save($scope.password,
					function (value, responseHeaders) {
				$scope.error = null;
				$scope.success = 'OK';
			},
			function (httpResponse) {
				$scope.success = null;
				$scope.error = "ERROR";
			});
		}
	};
});

newwavedashApp.controller('SessionsController', function ($scope, resolvedSessions, Sessions) {
	$scope.success = null;
	$scope.error = null;
	$scope.sessions = resolvedSessions;
	$scope.invalidate = function (series) {
		Sessions.delete({series: encodeURIComponent(series)},
				function (value, responseHeaders) {
			$scope.error = null;
			$scope.success = "OK";
			$scope.sessions = Sessions.get();
		},
		function (httpResponse) {
			$scope.success = null;
			$scope.error = "ERROR";
		});
	};
});

newwavedashApp.controller('HealthController', function ($scope, HealthCheckService) {
	$scope.updatingHealth = true;

	$scope.refresh = function() {
		$scope.updatingHealth = true;
		HealthCheckService.check().then(function(promise) {
			$scope.healthCheck = promise;
			$scope.updatingHealth = false;
		},function(promise) {
			$scope.healthCheck = promise.data;
			$scope.updatingHealth = false;
		});
	}

	$scope.refresh();

	$scope.getLabelClass = function(statusState) {
		if (statusState == 'UP') {
			return "label-success";
		} else {
			return "label-danger";
		}
	}
});

newwavedashApp.controller('ConfigurationController', function ($scope, resolvedConfiguration) {
	$scope.configuration = resolvedConfiguration;
});

newwavedashApp.controller('MetricsController', function ($scope, MetricsService, HealthCheckService, ThreadDumpService) {
	$scope.metrics = {};
	$scope.updatingMetrics = true;

	$scope.refresh = function() {
		$scope.updatingMetrics = true;
		MetricsService.get().then(function(promise) {
			$scope.metrics = promise;
			$scope.updatingMetrics = false;
		},function(promise) {
			$scope.metrics = promise.data;
			$scope.updatingMetrics = false;
		});
	};

	$scope.$watch('metrics', function(newValue, oldValue) {
		$scope.servicesStats = {};
		$scope.cachesStats = {};
		angular.forEach(newValue.timers, function(value, key) {
			if (key.indexOf("web.rest") != -1 || key.indexOf("service") != -1) {
				$scope.servicesStats[key] = value;
			}

			if (key.indexOf("net.sf.ehcache.Cache") != -1) {
				// remove gets or puts
				var index = key.lastIndexOf(".");
				var newKey = key.substr(0, index);

				// Keep the name of the domain
				index = newKey.lastIndexOf(".");
				$scope.cachesStats[newKey] = {
						'name': newKey.substr(index + 1),
						'value': value
				};
			};
		});
	});

	$scope.refresh();

	$scope.refreshThreadDumpData = function() {
		ThreadDumpService.dump().then(function(data) {
			$scope.threadDump = data;

			$scope.threadDumpRunnable = 0;
			$scope.threadDumpWaiting = 0;
			$scope.threadDumpTimedWaiting = 0;
			$scope.threadDumpBlocked = 0;

			angular.forEach(data, function(value, key) {
				if (value.threadState == 'RUNNABLE') {
					$scope.threadDumpRunnable += 1;
				} else if (value.threadState == 'WAITING') {
					$scope.threadDumpWaiting += 1;
				} else if (value.threadState == 'TIMED_WAITING') {
					$scope.threadDumpTimedWaiting += 1;
				} else if (value.threadState == 'BLOCKED') {
					$scope.threadDumpBlocked += 1;
				}
			});

			$scope.threadDumpAll = $scope.threadDumpRunnable + $scope.threadDumpWaiting +
			$scope.threadDumpTimedWaiting + $scope.threadDumpBlocked;

		});
	};

	$scope.getLabelClass = function(threadState) {
		if (threadState == 'RUNNABLE') {
			return "label-success";
		} else if (threadState == 'WAITING') {
			return "label-info";
		} else if (threadState == 'TIMED_WAITING') {
			return "label-warning";
		} else if (threadState == 'BLOCKED') {
			return "label-danger";
		}
	};
});

newwavedashApp.controller('LogsController', function ($scope, resolvedLogs, LogsService) {
	$scope.loggers = resolvedLogs;

	$scope.changeLevel = function (name, level) {
		LogsService.changeLevel({name: name, level: level}, function () {
			$scope.loggers = LogsService.findAll();
		});
	}
});

newwavedashApp.controller('AuditsController', function ($scope, $translate, $filter,$timeout,$rootScope,AuditsService) {
	$scope.onChangeDate = function() {
		AuditsService.findByDates($scope.fromDate, $scope.toDate).then(function(data){
			$scope.audits = data;
		});
	};

	// Date picker configuration
	$scope.today = function() {
		// Today + 1 day - needed if the current day must be included
		var today = new Date();
		var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1); // create
		// new
		// increased
		// date

		$scope.toDate = $filter('date')(tomorrow, "yyyy-MM-dd");
	};

	$scope.previousMonth = function() {
		var fromDate = new Date();
		if (fromDate.getMonth() == 0) {
			fromDate = new Date(fromDate.getFullYear() - 1, 0, fromDate.getDate());
		} else {
			fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
		}

		$scope.fromDate = $filter('date')(fromDate, "yyyy-MM-dd");
	};

	$scope.today();
	$scope.previousMonth();

	AuditsService.findByDates($scope.fromDate, $scope.toDate).then(function(data){
		$scope.audits = data;
	});


});
