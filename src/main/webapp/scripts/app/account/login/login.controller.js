'use strict';

angular.module('spadeApp')
     .controller('LoginController', function ($modal, $scope) {
        
    	 $scope.pod = {
             	osName: ' None Selected',
             	selectedApp : 'None Selected',
             	appName : 'Not Yet Specified',
             	replicaCount : '0'
             };
    	 
    	 $scope.launch = function(){
//     		var pod = {
//     	    		os: name,
//     	    		app: selectedApp,
//     	    		name: appName,
//     	    		replicas: replicaCount,
//     	    	}
     		alert("Pod Stats\n" + $scope.pod.osName + "\n" +  $scope.pod.selectedApp + "\n" + $scope.pod.appName + "\n" + $scope.pod.replicaCount + "\n");
     	}
    	 
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
    .controller('ModalCtrl', function ($modalInstance) {
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
            return (modal.isLastStep()) ? 'Submit' : 'Next';
        };

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