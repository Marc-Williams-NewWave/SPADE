'use strict';

angular.module('spadeApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal, $modal) {
    	$scope.app = this;
    	
    	$scope.app.closeAlert = function(){
    		$scope.app.reason = null;
    	}
    	
    	$scope.app.open = function(){
    		var modalInstance = $modal.open({
    			templateUrl: 'scripts/app/account/login/login.html',
    			controller: 'ModalCtrl',
    			controllerAs: 'modal'
    		});
    		
    		modalInstance.result
            .then(function (data) {
            	$scope.app.closeAlert();
            	$scope.app.summary = data;
            }, function (reason) {
            	$scope.app.reason = reason;
            });
    		
    	}
    	
    	
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.isInRole = Principal.isInRole;
        $scope.$state = $state;

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
    })
    
//.controller('ModalCtrl', function ($modalInstance) {
//        var modal = this;
//
//        modal.steps = ['one', 'two', 'three'];
//        modal.step = 0;
//        modal.wizard = {tacos: 2};
//
//        modal.isFirstStep = function () {
//            return modal.step === 0;
//        };
//
//        modal.isLastStep = function () {
//            return modal.step === (modal.steps.length - 1);
//        };
//
//        modal.isCurrentStep = function (step) {
//            return modal.step === step;
//        };
//
//        modal.setCurrentStep = function (step) {
//            modal.step = step;
//        };
//
//        modal.getCurrentStep = function () {
//            return modal.steps[modal.step];
//        };
//
//        modal.getNextLabel = function () {
//            return (modal.isLastStep()) ? 'Submit' : 'Next';
//        };
//
//        modal.handlePrevious = function () {
//            modal.step -= (modal.isFirstStep()) ? 0 : 1;
//        };
//
//        modal.handleNext = function () {
//            if (modal.isLastStep()) {
//                $modalInstance.close(modal.wizard);
//            } else {
//                modal.step += 1;
//            }
//        };
//
//        modal.dismiss = function(reason) {
//            $modalInstance.dismiss(reason);
//        };
//    });
