'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularappApp
 */
angular.module('angularappApp')
    .controller('detailsCtrl', ['localStorageService', '$scope', function(localStorageService, $scope) {
        (function() {
            $scope.week_data = localStorageService.get('weeks', "localStorage");
        })();

    }]);