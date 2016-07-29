(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
			.state('geekhome', {
                url: '/',
                templateUrl: 'geekhome/index.html',
                controller: 'Geekhome.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'geekhome' }
            })
			.state('about', {
                url: '/',
                templateUrl: 'about/index.html',
                controller: 'About.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'about' }
            })
			.state('services', {
                url: '/',
                templateUrl: 'services/index.html',
                controller: 'Services.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'services' }
            }) 
			.state('subscriptions', {
                url: '/',
                templateUrl: 'subscriptions/index.html',
                controller: 'Subscriptions.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'subscriptions' }
            })
			.state('testimonials', {
                url: '/',
                templateUrl: 'testimonials/index.html',
                controller: 'Testimonials.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'testimonials' }
            })
			.state('contact', {
                url: '/',
                templateUrl: 'contact/index.html',
                controller: 'Contact.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'contact' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();