angular.module('angularappApp').config(function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/display-plan', {
            templateUrl: 'views/details.html',
            controller: 'detailsCtrl',
            controllerAs: 'details'
        })
        .otherwise({
            redirectTo: '/main'
        });
});