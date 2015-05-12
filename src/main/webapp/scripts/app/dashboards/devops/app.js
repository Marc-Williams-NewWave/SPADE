'use strict';

/* App Module */



var newwavedashApp = angular.module('newwavedashApp', ['http-auth-interceptor', 'tmh.dynamicLocale',
    'ngResource', 'ngRoute','ui.router', 'ngCookies', 'newwavedashAppUtils', 'pascalprecht.translate', 'truncate', 'ngCacheBuster','angular-bootstrap-select','ChartAngular']);

//newwavedashApp.directive('barchart', function() {
//
//	return {
//
//	    // required to make it work as an element
//	    restrict: 'E',
//	    template: '<div></div>',
//	    replace: true,
//	    // observe and manipulate the DOM
//	    link: function($scope, element, attrs) {
//	        $scope.$watch('flag', function() {
//
//	    $scope.myModel = [
//	       { range: 'January', total_tasks: $scope.values[0], total_overdue: 5 },
//	       { range: 'January', total_tasks: $scope.values[1], total_overdue: 8 },
//	       { range: 'January', total_tasks: $scope.values[2], total_overdue: 1 },
//	       { range: 'January', total_tasks: $scope.values[3], total_overdue: 6 }
//	     ];
//
//	    console.log($scope.flag + $scope.values+' The one we want watch')
//
//	    $scope.xkey = 'range';
//
//	    $scope.ykeys = ['total_tasks',     'total_overdue'];
//
//	    $scope.labels = ['Total Tasks', 'Out of Budget Tasks'];
//
//	        var data = $scope[attrs.data],
//	            xkey = $scope[attrs.xkey],
//	            ykeys= $scope[attrs.ykeys],
//	            labels= $scope[attrs.labels];
//
//	            var setData = function(){
//	            console.log('inside setData function');
//
//	        Morris.Bar({
//	                element: element,
//	                data: data,
//	                xkey: xkey,
//	                ykeys: ykeys,
//	                labels: labels
//	            });
//	            };
//	        if ($scope.flag == 1) {    
//	            attrs.$observe('data',setData)  
//	            }               
//	            });
//
//	    }
//
//	};
//
//	});
newwavedashApp.directive('selectpicker', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.selectpicker($parse(attrs.selectpicker)());
          element.selectpicker('refresh');
          
          scope.$watch(attrs.ngModel, function (newVal, oldVal) {
            scope.$parent[attrs.ngModel] = newVal;
            scope.$evalAsync(function () {
              if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
              element.selectpicker('refresh');
            });
          });
          
          scope.$on('$destroy', function () {
            scope.$evalAsync(function () {
              element.selectpicker('destroy');
            });
          });
        }
      };
    }]);

newwavedashApp.directive('barchart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Bar({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels],

                        horizontal:true,	
                        barRatio: 1.4,
                        xLabelAngle: 65,
                        hideHover: 'auto'
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
});

newwavedashApp.directive('barchart1', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Bar({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels],
                        barColors: function (row, series, type) {
                        	 var str= row.label;
                        	if(row.label.indexOf("S")> -1) return "#1AB244";
                        	else if(row.label.indexOf("F")> -1) return "#AD1D28";   	
                        	else return "#DEBB27";
                        	},
                        horizontal:true,	
                        barRatio: 1.4,
                        xLabelAngle: 65,
                        hideHover: 'auto'
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
});
angular.module('angular-bootstrap-select', []).directive('linechart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Line({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels]
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
});
//newwavedashApp.directive('donutchart', function ($window) {
//
//    return {
//        restrict: 'E',
//        template: '<div></div>',
//        replace: true,
//        link: function ($scope, element, attrs) {
//            var morris;
//            angular.element($window).bind('resize', function () {
//                if (morris) {
//                    console.log('morris resized');
//                    morris.redraw();
//                }
//            });
//
//            attrs.$observe('value', function (val) {
//                if (!morris) {
//                    console.log('creating donut chart');
//                    morris = Morris.Donut({
//                        element: element,
//                        data: angular.fromJson(val),
//                        label: $scope[attrs.label],
//                        value: $scope[attrs.value],
//                        labelColor: '#060',
//                        colors: [
//                          '#0BA462',
//                          '#B22222',
//                          '#FC4747',
//                          '#B31212'
//                        ]
//                    });
//                } else {
//                    console.log('setting chart values');
//                    morris.setData(angular.fromJson(val));
//                }
//            });
//        }
//    };
//});

newwavedashApp
    .config(function ($stateProvider,$urlRouterProvider,$routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider, USER_ROLES) {

            //Cache everything except rest api requests
            httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*rest.*/],true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
            
            // route to show our basic form (/form)
            .state('site', {

                url: '/',
              resolve:{

                resolvedSelect:['SelectService', function (SelectService) {
                    return SelectService.findAllProj();
                }]
                
                
            },
                views: {
                	'content@': {
                	     templateUrl: 'views/select.html',
                         controller: 'SelectController',
                	}
                }
           
            });
              $stateProvider
            .state('dashboard', {

                url: '/dashboard/:id',
                resolve:{
                	   resolveDonut :function($route,Admin,$stateParams){
                       	return Admin.findIssues($stateParams.id);
                       	
                       },
                       
                       
                 resolvedCont:function($route,Admin,$stateParams){
                 	return Admin.findCont($stateParams.id);
                 	
                 },
          
          resolvedBuild:function($route,Admin,$stateParams){
          	return Admin.findBuild($stateParams.id);
          	
          },
          
          resolvecheckin:function($route,Admin,$stateParams){
            	return Admin.findCheckins($stateParams.id);
            	
            },
          resolvedRel:function($route,Admin,$stateParams){
          	return Admin.findRel($stateParams.id);
          	
          }
                
            },
                views: {
                	'content@': {
                		templateUrl: 'views/dashboard.html',
                        controller: 'AdminController',
                	}
                }
           
            });
            
//            $routeProvider
//                .when('/register', {
//                    templateUrl: 'views/register.html',
//                    controller: 'RegisterController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                .when('/activate', {
//                    templateUrl: 'views/activate.html',
//                    controller: 'ActivationController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                .when('/login', {
//                    templateUrl: 'views/login.html',
//                    controller: 'LoginController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                 .when('/', {
//                    templateUrl: 'views/login.html',
//                    controller: 'LoginController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                
//                .when('/error', {
//                    templateUrl: 'views/error.html',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                .when('/settings', {
//                    templateUrl: 'views/settings.html',
//                    controller: 'SettingsController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.user]
//                    }
//                })
//                .when('/password', {
//                    templateUrl: 'views/password.html',
//                    controller: 'PasswordController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.user]
//                    }
//                })
////                .when('/dashboard', {
////                    templateUrl: 'views/dashboard.html',
////                    controller: 'AdminController',
////                    access: {
////                        authorizedRoles: [USER_ROLES.user]
////                    }
////                })
////                
//                  .when('/select', {
//                    templateUrl: 'views/select.html',
//                    controller: 'SelectController',
//                    resolve:{
//
//                      resolvedSelect:['SelectService', function (SelectService) {
//                          return SelectService.findAllProj();
//                      }]
//                      
//                      
//                  },
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
////                .when('/views/select.html', {
////                    templateUrl: 'views/select.html',
////                    controller: 'SelectController',
////                    access: {
////                        authorizedRoles: [USER_ROLES.user]
////                    }
////                })
//                  .when('/dashboard/:user_id', {
//                	  templateUrl: 'views/dashboard.html',
//                    controller: 'AdminController',
//                    resolve:{
////                        resolvedCont:['Admin', function (Admin) {
////                            return Admin.get();
////                        }],
//                        resolvedRel:['Admin1', function (Admin1) {
//                            return Admin1.get();
//                        }],
//                        
//                        resolveDonut :function($route,Admin){
//                        	return Admin.findIssues($route.current.params.user_id);
//                        	
//                        },
//                        
////                        resolvedCont :function($route,Admin){
////                  	return Admin.findCont($route.current.params.user_id);
////                  	
////                  },
////                  resolvedBuild:function($route,Admin){
////                  	return Admin.findBuild($route.current.params.user_id);
////                  	
////                  },
////                  
////                  resolvecheckin:function($route,Admin){
////                    	return Admin.findCheckins($route.current.params.user_id);
////                    	
////                    }
//                        
//                    },
//                    
//                    access: {
//                        authorizedRoles: [USER_ROLES.user]
//                    }
//                })
//                .when('/sessions', {
//                    templateUrl: 'views/sessions.html',
//                    controller: 'SessionsController',
//                    resolve:{
//                        resolvedSessions:['Sessions', function (Sessions) {
//                            return Sessions.get();
//                        }]
//                    },
//                    access: {
//                        authorizedRoles: [USER_ROLES.user]
//                    }
//                })
//                .when('/metrics', {
//                    templateUrl: 'views/metrics.html',
//                    controller: 'MetricsController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//                .when('/health', {
//                    templateUrl: 'views/health.html',
//                    controller: 'HealthController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//                .when('/configuration', {
//                    templateUrl: 'views/configuration.html',
//                    controller: 'ConfigurationController',
//                    resolve:{
//                        resolvedConfiguration:['ConfigurationService', function (ConfigurationService) {
//                            return ConfigurationService.get();
//                        }]
//                    },
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//                .when('/logs', {
//                    templateUrl: 'views/logs.html',
//                    controller: 'LogsController',
//                    resolve:{
//                        resolvedLogs:['LogsService', function (LogsService) {
//                            return LogsService.findAll();
//                        }]
//                    },
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//                .when('/audits', {
//                    templateUrl: 'views/audits.html',
//                    controller: 'AuditsController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//                .when('/logout', {
//                    templateUrl: 'views/main.html',
//                    controller: 'LogoutController',
//                    access: {
//                        authorizedRoles: [USER_ROLES.all]
//                    }
//                })
//                .when('/docs', {
//                    templateUrl: 'views/docs.html',
//                    access: {
//                        authorizedRoles: [USER_ROLES.admin]
//                    }
//                })
//               ;

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

        })
//        .run(function($rootScope, $location, $http, AuthenticationSharedService, Session, USER_ROLES) {
//                $rootScope.authenticated = false;
//                $rootScope.$on('$routeChangeStart', function (event, next) {
//                    $rootScope.isAuthorized = AuthenticationSharedService.isAuthorized;
//                    $rootScope.userRoles = USER_ROLES;
//                    AuthenticationSharedService.valid(next.access.authorizedRoles);
//                });
//
//                // Call when the the client is confirmed
//                $rootScope.$on('event:auth-loginConfirmed', function(data) {
//                    $rootScope.authenticated = true;
//                    if ($location.path() === "/login") {
//                        var search = $location.search();
//                        if (search.redirect !== undefined) {
//                            $location.path(search.redirect).search('redirect', null).replace();
//                        } else {
//                            $location.path('/views/select.html').replace();
//                        }
//                    }
//                    if ($location.path() === "/") {
//                      
//                            $location.path('/select').replace();
//                        
//                    }
//                });
//
//                // Call when the 401 response is returned by the server
//                $rootScope.$on('event:auth-loginRequired', function(rejection) {
//                    Session.invalidate();
//                    $rootScope.authenticated = false;
//                    if ($location.path() !== "/" && $location.path() !== "" && $location.path() !== "/register" &&
//                            $location.path() !== "/activate" && $location.path() !== "/login") {
//                        var redirect = $location.path();
//                        $location.path('/login').search('redirect', redirect).replace();
//                    }
//                });
//
//                // Call when the 403 response is returned by the server
//                $rootScope.$on('event:auth-notAuthorized', function(rejection) {
//                    $rootScope.errorMessage = 'errors.403';
//                    $location.path('/error').replace();
//                });
//
//                // Call when the user logs out
//                $rootScope.$on('event:auth-loginCancelled', function() {
//                    $location.path('');
//                });
//        });
