'use strict';

angular.module('spadeApp')

.controller('TemplatesController', function($rootScope, $scope, $state, $timeout, Auth,$http,$mdDialog,$modal,templateService) {
		$http.get("http://192.168.4.8:8080/spade/api/stack_templates")
		.success(function(data) {
				$scope.plates = data.items;
			})
			
//		.error(function(data, status, headers, config) {
////			$scope.info = data;
//			$scope.plates = data.items;
//			
//			console.log("ERROR");
////			$scope.plates = [{
////				  "id": "Template A",
////				  "project": "Demo Project",
////				  "templates": [
////				    {
////				      "name": "Web Server",
////				      "os": "ubuntu",
////				      "app": "apache",
////				      "replicas": 1
////				    },
////				    {
////				      "name": "App Server",
////				      "os": "fedora",
////				      "app": "wildfly",
////				      "replicas": 1
////				    },
////				    {
////				      "name": "Database",
////				      "os": "fedora",
////				      "app": "mongoDB",
////				      "replicas": 1
////				    }
////				  ]
////				},
////				{
////					  "id": "Template B",
////					  "project": "Demo Project B",
////					  "templates": [
////					    {
////					      "name": "Web Server",
////					      "os": "fedora",
////					      "app": "tomcat",
////					      "replicas": 1
////					    },
////					    {
////					      "name": "App Server",
////					      "os": "ubuntu",
////					      "app": "nginx",
////					      "replicas": 1
////					    },
////					    {
////					      "name": "Database",
////					      "os": "fedora",
////					      "app": "mysql",
////					      "replicas": 1
////					    }
////					  ]
////					}
////				];
//	
//			
//			
//			
//			console.log(data);
////			console.log(data);
//			console.log(status);
//			console.log(headers);
//			console.log(config);
//		})
	
	 
	$scope.plates2 = [{
		  "id": "Template A",
		  "project": "Demo Project",
		  "templates": [
		    {
		      "name": "Web Server",
		      "os": "ubuntu",
		      "app": "nginx",
		      "replicas": 1
		    },
		    {
		      "name": "App Server",
		      "os": "fedora",
		      "app": "wildfly",
		      "replicas": 1
		    },
		    {
		      "name": "Database",
		      "os": "fedora",
		      "app": "mongoDB",
		      "replicas": 1
		    }
		  ]
		},
		{
			  "id": "Template B",
			  "project": "Demo Project B",
			  "templates": [
			    {
			      "name": "Web Server",
			      "os": "ubuntu",
			      "app": "nginx",
			      "replicas": 1
			    },
			    {
			      "name": "App Server",
			      "os": "fedora",
			      "app": "wildfly",
			      "replicas": 1
			    },
			    {
			      "name": "Database",
			      "os": "fedora",
			      "app": "mongoDB",
			      "replicas": 1
			    }
			  ]
			},
			{
			      "id": "Wildfly",
			      "project": "demo",
			      "templates": [
			        {
			          "name": "wildfly-apache",
			          "os": "ubuntu",
			          "app": "apache",
			          "replicas": 1,
			          "label": "web"
			        },
			        {
			          "name": "wildfly-wildfly",
			          "os": "fedora",
			          "app": "wildfly",
			          "replicas": 1,
			          "label": "app"
			        },
			        {
			          "name": "wildfly-mongodb",
			          "os": "ubuntu",
			          "app": "mongodb",
			          "replicas": 1,
			          "label": "db"
			        }
			      ]
			    },
				{
					  "id": "Template B",
					  "project": "Demo Project B",
					  "templates": [
					    {
					      "name": "Web Server",
					      "os": "ubuntu",
					      "app": "nginx",
					      "replicas": 1
					    },
					    {
					      "name": "App Server",
					      "os": "fedora",
					      "app": "wildfly",
					      "replicas": 1
					    },
					    {
					      "name": "Database",
					      "os": "fedora",
					      "app": "mongoDB",
					      "replicas": 1
					    }
					  ]
					},
					{
					      "id": "Wildfly",
					      "project": "demo",
					      "templates": [
					        {
					          "name": "wildfly-apache",
					          "os": "ubuntu",
					          "app": "apache",
					          "replicas": 1,
					          "label": "web"
					        },
					        {
					          "name": "wildfly-wildfly",
					          "os": "fedora",
					          "app": "wildfly",
					          "replicas": 1,
					          "label": "app"
					        },
					        {
					          "name": "wildfly-mongodb",
					          "os": "ubuntu",
					          "app": "mongodb",
					          "replicas": 1,
					          "label": "db"
					        }
					      ]
					    }
		];

   $scope.closeAlert = function () {
	   $scope.reason = null;
   };	

   $scope.templateFactoryService = templateService;
	 
	 
		
   $scope.open2 = function (template) {
	   console.log(template);
	   $scope.templateFactoryService.addItem(template);
       var modalInstance = $modal.open({
           templateUrl: 'scripts/app/features/iaas/iaas.html',
           controller: 'ModalCtrl2',
           controllerAs: 'modal2'
       });

       modalInstance.result
           .then(function (data) {
        	   $scope.closeAlert();
        	   $scope.summary = data;
           }, function (reason) {
        	   $scope.reason = reason;
           });
   };
   
		
				
					
					
//					$scope.open = function(){
//						$scope.templateFactoryService = templateService;
//						 
//						 
//						$scope.templateFactoryService.addItem($scope.plates[0]);	
//						
//						$rootScope.$emit('openModal');
//					}
					
//			        $scope.closeAlert = function () {
//			        	$scope.reason = null;
//			        };	
//
//			        $scope.open = function () {
//			        	$rootScope.$broadcast('testObj', 'hi!!!!');
//			        	
//			            var modalInstance = $modal.open({
//			                templateUrl: 'scripts/app/features/iaas/iaas.html',
//			                controller: 'ModalCtrl',
//			                controllerAs: 'modal'
//			            });
//
//			            modalInstance.result
//			                .then(function (data) {
//			                	$scope.closeAlert();
//			                	$scope.summary = data;
//			                }, function (reason) {
//			                	$scope.reason = reason;
//			                });
//			        };
//			    
			    
			    
			
		})

.controller('ModalCtrl2', function ($modalInstance,$scope,$mdDialog,$http,templateService) {
	
	$scope.osOptions = ['Ubuntu','Fedora'];
	console.log($scope.osOptions);
	
	$scope.oneOS;
	
	$scope.applications = 
	{
			  "api": "v0.0.4",
			  "time": 1427390606456,
			  "label": "extra",
			  "items": [
			    {
			      "image": "sewatech\/modcluster",
			      "os": "ubuntu",
			      "app": "apache",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "6.8"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:nginx-ubuntu",
			      "os": "ubuntu",
			      "app": "nginx",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "1.1.2"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:wildfly-ubuntu",
			      "os": "ubuntu",
			      "app": "wildfly",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "8.0.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:tomcat-ubuntu",
			      "os": "ubuntu",
			      "app": "tomcat",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "8.5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "partlab\/ubuntu-mongodb",
			      "os": "ubuntu",
			      "app": "mongodb",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.1.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:mysql-ubuntu",
			      "os": "ubuntu",
			      "app": "mysql",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:apache-fedora",
			      "os": "fedora",
			      "app": "apache",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:nginx-fedora",
			      "os": "fedora",
			      "app": "nginx",
			      "type": "web",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "2.0.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:cluster",
			      "os": "fedora",
			      "app": "wildfly",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.8.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:tomcat-fedora",
			      "os": "fedora",
			      "app": "tomcat",
			      "type": "app",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "7.0.3"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "bradams\/devops:mongodb-fedora",
			      "os": "fedora",
			      "app": "mongodb",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "6.3.0"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    },
			    {
			      "image": "jdeathe\/centos-ssh-mysql",
			      "os": "fedora",
			      "app": "mysql",
			      "type": "db",
			      "info": [
			        {
			          "key": "app_version",
			          "val": "5.5"
			        },
			        {
			          "key": "heap_size",
			          "val": "1024MB"
			        },
			        {
			          "key": "storage_size",
			          "val": "100MB"
			        }
			      ]
			    }
			  ]
			}
	
	$scope.lamp = true;
	
	$scope.webDisabled = false;
	$scope.appDisabled = false;
	$scope.dbDisabled = false;
	
//	$scope.dbDisabled = false;
	
	$scope.switchdbDisabled = function(){
		console.log($scope.dbDisabled);
		return $scope.dbDisabled = !$scope.dbDisabled;
	}

//	$scope.test = {};
//	$scope.test.dbDisabled = false;
	
	$scope.disableDB = function() {
		console.log($scope.dbDisabled);
        return $scope.dbDisabled = !$scope.dbDisabled;
    };
	
	console.log($scope.webDisabled);
	console.log($scope.appDisabled);
	console.log($scope.dbDisabled);
	var appFilter = function(){
		var n = {},uniqueApps = [];
//		var defaultApp = {
//				"image": "",
//	              "os": "",
//	              "app": "Select an Application"	
//		}
//		uniqueApps.push(defaultApp);
		
		for(var i = 0; i < $scope.applications.items.length; i++){
			if(!n[$scope.applications.items[i].app]){
				n[$scope.applications.items[i].app] = true;
				uniqueApps.push($scope.applications.items[i]);
			}
		}
		
		
		return uniqueApps;
	}
	
	$scope.uniqueApps = appFilter();
	
	$scope.switchLamp = function(){
		console.log($scope.lamp);
		return $scope.lamp = !$scope.lamp;
	}
	
	$scope.appTypeFiler = function(){
		var webApps = [];
		var appApps = [];
		var dbApps = [];
		
		
		for(var i = 0; i < $scope.uniqueApps.length; i++){
			if($scope.uniqueApps[i].type == 'web'){
				webApps.push($scope.uniqueApps[i]);
			} else {
				if($scope.uniqueApps[i].type == 'app'){
					appApps.push($scope.uniqueApps[i]);
				} else {
					if($scope.uniqueApps[i].type == 'db'){
    					dbApps.push($scope.uniqueApps[i]);
				}
			}
		}
	}
		$scope.webApps = webApps;
		$scope.appApps = appApps;
		$scope.dbApps = dbApps;
}
	
	$scope.appTypeFiler();
	
	console.log("Web apps " + $scope.webApps);
	console.log("App apps " + $scope.appApps);
	console.log("DB apps " + $scope.dbApps);
	
	
	for(var i = 0; i < $scope.uniqueApps.length;i++){
		console.log($scope.uniqueApps[i]);
	}
	
	for(var i = 0; i < $scope.uniqueApps.length;i++){
		if($scope.uniqueApps[i].type == 'web')
		console.log($scope.uniqueApps[i]);
	}
	
//	console.log($scope.uniqueApps);

	$scope.isDisabled = true;
	
	$scope.defaultPod = {
			name : '',
			os: 'None Selected',
          	app : 'None Selected',
          	replicas : 0
          };
	
	$scope.pod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	$scope.appPod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	
	$scope.webPod = {
			name : 'Your Web Server',
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	$scope.data = {
		      selectedIndex : 0,
		      secondLocked : false,
		      secondLabel : "Item Two"
		    };
		    $scope.next = function() {
		      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
		    };
		    $scope.previous = function() {
		      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
		    };
	
	
	$scope.dbPod = {
			name : $scope.defaultPod.name,
			os: $scope.defaultPod.os,
          	app : $scope.defaultPod.app,
          	replicas : $scope.defaultPod.replicas
          };
	
	$scope.setPodsOS = function(os){
		$scope.webPod.os = os;
		$scope.appPod.os = os;
		$scope.dbPod.os = os;
		
		console.log($scope.oneOS);
	};
	
	console.log(templateService.items());
	
	if(templateService.items().length > 0){
		$scope.webPod = templateService.items()[0].templates[0];
		$scope.appPod = templateService.items()[0].templates[1];
		$scope.dbPod = templateService.items()[0].templates[2];
		
		templateService.clear();
//		clear
	}
	
//	$scope.webConfig = 'n/a';
	
	$scope.conf = false;
	
	$scope.setWebConfig = function(item){
		var conf = [];
		for(i in $scope.webApps){
			if($scope.webApps[i].app == item){
				console.log('EUREKA!');
//				$scope.webConfig = $scope.webApps[i];
//				console.log($scope.webApps[i]);
//				console.log($scope.webConfig);
				for(var x = 0; x <  $scope.webApps[i].info.length; x++){
//					dbApps.push($scope.uniqueApps[i]);
					conf.push($scope.webApps[i].info[x]);
//					console.log(conf);
				}
			}
		}
		
		$scope.webConfig = conf;
		console.log('&&&&&&&');
		console.log($scope.webConfig);
		
		for(var y = 0; y < $scope.webConfig.length; y++){
			console.log($scope.webConfig[y]);
		}
		
//		var currentApp = JSON.stringify($scope.webPod.app);
//		console.log("Current app is " + currentApp);
		
	};
	
	$scope.setAppConfig = function(item){
		var conf = [];
		for(i in $scope.appApps){
			if($scope.appApps[i].app == item){
				console.log('EUREKA!');
//				$scope.webConfig = $scope.webApps[i];
//				console.log($scope.webApps[i]);
//				console.log($scope.webConfig);
				for(var x = 0; x <  $scope.appApps[i].info.length; x++){
//					dbApps.push($scope.uniqueApps[i]);
					conf.push($scope.appApps[i].info[x]);
//					console.log(conf);
				}
			}
		}
		
		$scope.appConfig = conf;
		console.log('*****');
		console.log($scope.appConfig);
		
		for(var y = 0; y < $scope.appConfig.length; y++){
			console.log($scope.appConfig[y]);
		}
		
//		var currentApp = JSON.stringify($scope.webPod.app);
//		console.log("Current app is " + currentApp);
		
	};
	
   	$scope.setDBConfig = function(item){
		console.log(item);
   		var conf = [];
		for(i in $scope.dbApps){
			if($scope.dbApps[i].app == item){
				console.log('EUREKA!');
//				$scope.webConfig = $scope.webApps[i];
//				console.log($scope.webApps[i]);
//				console.log($scope.webConfig);
				for(var x = 0; x <  $scope.dbApps[i].info.length; x++){
//					dbApps.push($scope.uniqueApps[i]);
					conf.push($scope.dbApps[i].info[x]);
//					console.log(conf);
				}
			}
		}
		
		$scope.dbConfig = conf;
		console.log('+++++');
		console.log($scope.dbConfig);
		
		for(var y = 0; y < $scope.dbConfig.length; y++){
			console.log($scope.dbConfig[y]);
		}
		
//		var currentApp = JSON.stringify($scope.webPod.app);
//		console.log("Current app is " + currentApp);
		
	};
	
	
	
	
	$scope.podArray = new Array(3);
	$scope.podArray[0] = $scope.webPod;
	$scope.podArray[1] = $scope.appPod
	$scope.podArray[2] = $scope.dbPod;
	
	console.log("POD ARRAY " + $scope.podArray);
	
//	$scope.podArray = {
//			"pods": [ {$scope.appPod}, {$scope.webPod}, {$scope.dbPod} ]};
//			            {
//			            	"name" : $scope.defaultPod.name,
//			    			"os": $scope.defaultPod.os,
//			              	"app" : $scope.defaultPod.app,
//			              	"replicas" : $scope.defaultPod.replicas,
//			              	"type": "web"
//			            },
//			            {
//			            	"name" : $scope.defaultPod.name,
//			    			"os": $scope.defaultPod.os,
//			              	"app" : $scope.defaultPod.app,
//			              	"replicas" : $scope.defaultPod.replicas,
//			              	"type": "app"
//			            },
//			            {
//			            	"name" : $scope.defaultPod.name,
//			    			"os": $scope.defaultPod.os,
//			              	"app" : $scope.defaultPod.app,
//			              	"replicas" : $scope.defaultPod.replicas,
//			              	"type": "db"
//			            }
	
 	 
	
	 $scope.launch = function(){
 		 console.log($scope.podArray);
 		 for(var x = 0; x < $scope.podArray.length; x++){
 			 if($scope.podArray[x].name != ''){
 				$http.post("http://192.168.4.8:8080/spade/api/demo/env", $scope.podArray[x])
     		 	.success(function(data){
     		 		console.log("success data returned ====> " + data);
     		 });
 			 }
 		 }
 		 
  	}
 	 
 	$scope.deletePod = function(pod){
 		 console.log(pod);
 		 $http.delete("http://192.168.0.95:8080/spade/api/env", pod)
 		 	.success(function(data){
 		 		console.log("successfully deleted ====> " + data.name + '\npod.appName');
 		 });
 	}
 	 
 	$scope.alert = '';
 	  $scope.showAlert = function() {
 	    $mdDialog.show(
 	      $mdDialog.alert()
 	        .title('This is an alert title')
 	        .content('You can specify some description text in here.')
 	        .ariaLabel('Password notification')
 	        .ok('Got it!')
// 	        .targetEvent(ev)
 	    );
 	  };
 	  
	var modal = this;

    modal.steps = ['one', 'two', 'three'];
    modal.step = 0;


    modal.isFirstStep = function () {
        return modal.step === 0;
    };

    modal.isLastStep = function () {
        return modal.step === (modal.steps.length - 1);
    };

    modal.isCurrentStep = function (step) {
        return modal.step === step;
    };

    modal.setCurrentStep = function (step) {
        modal.step = step;
    };

    modal.getCurrentStep = function () {
        return modal.steps[modal.step];
    };

    modal.getNextLabel = function () {
    	if(modal.isLastStep()){
    		$scope.isDisabled = !modal.launchReady();
    		return 'Click Above To Launch Your Pod';
    	} else{
    		return 'Next'
    	}
//        return (modal.isLastStep()) ? 'Launch' : 'Next';
    };
    
    modal.launchReady = function(){
    	if(angular.equals($scope.pod.os,$scope.defaultPod.os) ||
    			angular.equals($scope.pod.app,$scope.defaultPod.app) ||
    			angular.equals($scope.pod.name,$scope.defaultPod.name) ||
    			angular.equals($scope.pod.replicas,$scope.defaultPod.replicas ||
    			$scope.pod.replicas < 0		) 
    	){
    		return false;
    	} else {
    		return true;
    	}
    }

    modal.handlePrevious = function () {
        modal.step -= (modal.isFirstStep()) ? 0 : 1;
    };

    modal.handleNext = function () {
        if (modal.isLastStep()) {
            $modalInstance.close(modal.wizard);
        } else {
            modal.step += 1;
        }
    };
    


    modal.dismiss = function(reason) {
        $modalInstance.dismiss(reason);
    };
});