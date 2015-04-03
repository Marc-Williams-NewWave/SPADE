'use strict';

angular.module('spadeApp', ['ui.bootstrap','ngMaterial','LocalStorageModule', 'tmh.dynamicLocale','ngResource', 
                            'ui.router', 'ngCookies', 'pascalprecht.translate', 'ngCacheBuster','n3-pie-chart',
                            'smart-table','ngMdIcons','ui.select2','ngTable', 'nvd3','nvd3ChartDirectives'])
    
    .factory('templateService', function(){
    	var items = [];
        var myTemplatesService = {};
        
        myTemplatesService.addItem = function(item) {
        	console.log("Entering Factory");
        	console.log(item)
            items.push(item);
        	console.log("Leaving Factory");
        };

        myTemplatesService.items = function() {
            return items;
        };
        
        myTemplatesService.clear = function() {
        	items = [];
        	console.log(items);
        };
        
        return myTemplatesService;
        
    })
    
 
    
     .factory('appService', function($http){
    	var items = [];
        var myAppsService = {};
        
//        myAppsService.addItem = function(item) {
//        	console.log("Entering Factory");
//        	console.log(item)
//            items.push(item);
//        	console.log("Leaving Factory");
//        };

        myAppsService.getItems = function() {
        	var promise = $http.get("http://192.168.4.8:8080/spade/api/images")
        	.then(function(response) {
        		console.log(response.data.items);
        		var x;
        		for(x in response.data.items){
        			console.log("pushing x ===> " + x);
        			items.push(x);	
        		}
        		
        		return response.data;
        	});
        	
            return promise;
        
            myAppsService.items = function() {
                return items;
            };
//        	return items;
        };
        
        
        
        return myAppsService;
        
    })
.factory("MenuService", ["$rootScope", function($rootScope) {
    "use strict";

    return { 
        menu: function() {
            $rootScope.globalMenu;
        },    
        setMenu: function(menu) {
            $rootScope.globalMenu = menu;
        }
    };

}])
    .run(function ($rootScope, $location, $window, $http, $state, $translate, Auth, Principal, Language, ENV, VERSION,loginModal) {
        $rootScope.ENV = ENV;
        $rootScope.VERSION = VERSION;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        	$rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            
//        	var requireLogin = toState.data.requireLogin;
//            
//            if(requireLogin && typeof $rootScope.currentUser == 'undefined'){
//            	event.preventDefault();
//            	//start login modal
//            	loginModal()
//            		.then(function (){
//            			return $state.go(toState.name, toStateParams);
//            		})
//            		.catch(function (){
//            			return $state.go('home');
//            		});
//            }
        	
        	

            if (Principal.isIdentityResolved()) {
                Auth.authorize();
            }

            // Update the language
            Language.getCurrent().then(function (language) {
                $translate.use(language);
            });
        });

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            var titleKey = 'global.title';

            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            // Set the page title key to the one configured in state or use default one
            if (toState.data.pageTitle) {
                titleKey = toState.data.pageTitle;
            }
            $translate(titleKey).then(function (title) {
                // Change window title with translated one
                $window.document.title = title;
            });
        });

        $rootScope.back = function() {
            // If previous state is 'activate' or do not exist go to 'home'
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })
    
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $translateProvider, tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider) {

        //enable CSRF
        $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

        //Cache everything except rest api requests
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

        $urlRouterProvider.otherwise('/');

        
        $stateProvider
        .state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            },
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    $translatePartialLoader.addPart('language');
                    return $translate.refresh();
                }]
            }
        });
        
        

        // Initialize angular-translate
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useCookieStorage();

        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
    });
