'use strict';

angular.module('spadeApp')
    .controller('LoginController', function ($rootScope, $scope, $state,$mdDialog, $timeout, Auth) {
//        $scope.osName = "None Selected";
        $scope.selectedApp = "None Selected";
        $scope.appName = "Not Yet Specified";
        $scope.replicaCount = "0";
    	
        $scope.os = {
                name: 'None Selected'
              };
        
    	
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


        
        console.log($scope.applications.items);
        
        
        
        
        $scope.user = {};
        $scope.errors = {};

        
        
        
        
        
        
        $scope.rememberMe = true;
        $timeout(function (){angular.element('[ng-model="username"]').focus();});
//        $scope.login = function () {
//            Auth.login({
//                username: $scope.username,
//                password: $scope.password,
//                rememberMe: $scope.rememberMe
//            }).then(function () {
//                $scope.authenticationError = false;
//                if ($rootScope.previousStateName === 'register') {
//                    $state.go('home');
//                } else {
//                    $rootScope.back();
//                }
//            }).catch(function () {
//                $scope.authenticationError = true;
//            });
//        };
        
        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
              .title('Would you like to delete your debt?')
              .content('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')
              .ok('Please do it!')
              .cancel('Sounds like a scam')
              .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
              $scope.alert = 'You decided to get rid of your debt.';
            }, function() {
              $scope.alert = 'You decided to keep your debt.';
            });
          };
    });
