'use strict';

angular.module('spadeApp')
     .controller('IaasController', function ($mdDialog,$modal, $scope) {
        
    	
    	 var app = this;

        app.closeAlert = function () {
            app.reason = null;
        };	

        app.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/app/features/iaas/iaas.html',
                controller: 'ModalCtrl',
                controllerAs: 'modal'
            });

            modalInstance.result
                .then(function (data) {
                    app.closeAlert();
                    app.summary = data;
                }, function (reason) {
                    app.reason = reason;
                });
        };
    })
    .controller('ModalCtrl', function ($modalInstance,$scope,$mdDialog,$http) {
    	$scope.osOptions = ['Ubuntu','Fedora'];
    	console.log($scope.osOptions);
    	$scope.applications = 
        {
          "api": "v0.0.4",
          "time": 1426011638988,
          "label": "extra",
          "items": [
            {
              "image": "sewatech\/modcluster",
              "os": "ubuntu",
              "app": "apache",
              "type": "web"	  
            },
            {
              "image": "bradams\/devops:nginx-ubuntu",
              "os": "ubuntu",
              "app": "nginx",
             "type": "app"
            },
            {
              "image": "bradams\/devops:wildfly-ubuntu",
              "os": "ubuntu",
              "app": "wildfly",
            	  "type": "app"
            },
            {
              "image": "bradams\/devops:tomcat-ubuntu",
              "os": "ubuntu",
              "app": "tomcat",
            	  "type": "web"
            },
            {
              "image": "partlab\/ubuntu-mongodb",
              "os": "ubuntu",
              "app": "mongodb",
            	  "type": "db"
            },
            {
              "image": "bradams\/devops:mysql-ubuntu",
              "os": "ubuntu",
              "app": "mysql",
            	  "type": "db"
            },
            {
              "image": "bradams\/devops:apache-fedora",
              "os": "fedora",
              "app": "apache",
            	  "type": "web"
            },
            {
              "image": "bradams\/devops:nginx-fedora",
              "os": "fedora",
              "app": "nginx",
            	  "type": "app"
            },
            {
              "image": "bradams\/devops:cluster",
              "os": "fedora",
              "app": "wildfly",
            	  "type": "app"
            },
            {
              "image": "bradams\/devops:tomcat-fedora",
              "os": "fedora",
              "app": "tomcat",
            	  "type": "web"
            },
            {
              "image": "bradams\/devops:mongodb-fedora",
              "os": "fedora",
              "app": "mongodb",
            	  "type": "db"
            },
            {
              "image": "jdeathe\/centos-ssh-mysql",
              "os": "fedora",
              "app": "mysql",
            	  "type": "db",
            }
          ]
        };
    	
    	$scope.lamp = true;
    	
    	$scope.webDisabled = false;
    	$scope.appDisabled = false;
    	$scope.dbDisabled = false;
    	
//    	$scope.dbDisabled = false;
    	
    	$scope.switchdbDisabled = function(){
    		console.log($scope.dbDisabled);
    		return $scope.dbDisabled = !$scope.dbDisabled;
    	}

//    	$scope.test = {};
//    	$scope.test.dbDisabled = false;
    	
    	$scope.disableDB = function() {
    		console.log($scope.dbDisabled);
            return $scope.dbDisabled = !$scope.dbDisabled;
        };
    	
    	console.log($scope.webDisabled);
    	console.log($scope.appDisabled);
    	console.log($scope.dbDisabled);
    	var appFilter = function(){
    		var n = {},uniqueApps = [];
//    		var defaultApp = {
//    				"image": "",
//    	              "os": "",
//    	              "app": "Select an Application"	
//    		}
//    		uniqueApps.push(defaultApp);
    		
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
//    	console.log($scope.uniqueApps);

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
    			name : $scope.defaultPod.name,
    			os: $scope.defaultPod.os,
              	app : $scope.defaultPod.app,
              	replicas : $scope.defaultPod.replicas
              };
    	
    	$scope.webPod.name = '';
    	
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
    	};
    	
    	$scope.podArray = new Array(3);
    	$scope.podArray[0] = $scope.webPod;
    	$scope.podArray[1] = $scope.appPod
    	$scope.podArray[2] = $scope.dbPod;
    	
    	console.log("POD ARRAY " + $scope.podArray);
    	
//    	$scope.podArray = {
//    			"pods": [ {$scope.appPod}, {$scope.webPod}, {$scope.dbPod} ]};
//    			            {
//    			            	"name" : $scope.defaultPod.name,
//    			    			"os": $scope.defaultPod.os,
//    			              	"app" : $scope.defaultPod.app,
//    			              	"replicas" : $scope.defaultPod.replicas,
//    			              	"type": "web"
//    			            },
//    			            {
//    			            	"name" : $scope.defaultPod.name,
//    			    			"os": $scope.defaultPod.os,
//    			              	"app" : $scope.defaultPod.app,
//    			              	"replicas" : $scope.defaultPod.replicas,
//    			              	"type": "app"
//    			            },
//    			            {
//    			            	"name" : $scope.defaultPod.name,
//    			    			"os": $scope.defaultPod.os,
//    			              	"app" : $scope.defaultPod.app,
//    			              	"replicas" : $scope.defaultPod.replicas,
//    			              	"type": "db"
//    			            }
    	
     	 
    	
     	 $scope.launch = function(pod){
     		 console.log(pod);
     		 
     		 $http.post("http://192.168.4.8:8080/spade/api/demo/env", pod)
     		 	.success(function(data){
     	
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
//     	        .targetEvent(ev)
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
//            return (modal.isLastStep()) ? 'Launch' : 'Next';
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