'use strict';

angular.module('spadeApp')
     .controller('LoginController', function ($modal, $scope) {
        
    	
    	 var app = this;

        app.closeAlert = function () {
            app.reason = null;
        };

        app.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/app/account/login/login.html',
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
    .controller('ModalCtrl', function ($modalInstance,$scope,$mdDialog) {
    	$scope.applications = 
        {
          "api": "v0.0.4",
          "time": 1426011638988,
          "label": "extra",
          "items": [
            {
              "image": "sewatech\/modcluster",
              "os": "ubuntu",
              "app": "apache"
            },
            {
              "image": "bradams\/devops:nginx-ubuntu",
              "os": "ubuntu",
              "app": "nginx"
            },
            {
              "image": "bradams\/devops:wildfly-ubuntu",
              "os": "ubuntu",
              "app": "wildfly"
            },
            {
              "image": "bradams\/devops:tomcat-ubuntu",
              "os": "ubuntu",
              "app": "tomcat"
            },
            {
              "image": "partlab\/ubuntu-mongodb",
              "os": "ubuntu",
              "app": "mongodb"
            },
            {
              "image": "bradams\/devops:mysql-ubuntu",
              "os": "ubuntu",
              "app": "mysql"
            },
            {
              "image": "bradams\/devops:apache-fedora",
              "os": "fedora",
              "app": "apache"
            },
            {
              "image": "bradams\/devops:nginx-fedora",
              "os": "fedora",
              "app": "nginx"
            },
            {
              "image": "bradams\/devops:cluster",
              "os": "fedora",
              "app": "wildfly"
            },
            {
              "image": "bradams\/devops:tomcat-fedora",
              "os": "fedora",
              "app": "tomcat"
            },
            {
              "image": "bradams\/devops:mongodb-fedora",
              "os": "fedora",
              "app": "mongodb"
            },
            {
              "image": "jdeathe\/centos-ssh-mysql",
              "os": "fedora",
              "app": "mysql"
            }
          ]
        };

    	$scope.isDisabled = true;
    	
    	$scope.pod = {
              	osName: ' None Selected',
              	selectedApp : 'None Selected',
              	appName : 'Not Yet Specified',
              	replicaCount : '0'
              };
     	 
    	
     	 $scope.launch = function(pod){
//      		var pod = {
//      	    		os: name,
//      	    		app: selectedApp,
//      	    		name: appName,
//      	    		replicas: replicaCount,
//      	    	}
      		alert("Pod Stats\n" + pod.osName + "\n" +  pod.selectedApp + "\n" + pod.appName + "\n" + pod.replicaCount + "\n");
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
        modal.wizard = {tacos: 2};

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
            return (modal.isLastStep()) ? 'Launch' : 'Next';
        };

        modal.handlePrevious = function () {
            modal.step -= (modal.isFirstStep()) ? 0 : 1;
        };

        modal.handleNext = function () {
            if (modal.isLastStep()) {
            	$scope.isDisabled = false;
//            	$scope.showAlert();
//                $modalInstance.close(modal.wizard);
            } else {
                modal.step += 1;
            }
        };

        modal.dismiss = function(reason) {
            $modalInstance.dismiss(reason);
        };
    });