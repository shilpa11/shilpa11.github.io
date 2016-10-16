'use strict';

/**
 * @ngdoc function
 * @name angularappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularappApp
 */
angular.module('angularappApp')
    .controller('MainCtrl', ['$scope', 'ngGPlacesAPI', '$timeout', 'localStorageService', function($scope, ngGPlacesAPI, $timeout, localStorageService) {
        $scope.place = null;
        $scope.showLoader = false;
        $scope.weekdetails = false;
        $scope.weeksEmpty = {
            "Monday": {},
            "Tuesday": {},
            "Wednesday": {},
            "Thursday": {},
            "Friday": {},
            "Saturday": {},
            "Sunday": {}
        };

        (function() {
            var existingData = localStorageService.get('weeks', "localStorage");
            var isLocalStorage = false;
            $scope.showbutton = false;
            if (existingData) {
                angular.forEach(existingData, function(value, key) {
                    if (Object.getOwnPropertyNames(value).length !== 0) {
                        isLocalStorage = true;
                        $scope.showbutton = true;
                    }
                });
            }

            if (!existingData && !isLocalStorage) {
                localStorageService.set('weeks', $scope.weeksEmpty, "localStorage");
            }
        })();

        $scope.onSetWeek = function(week, res) {
            var existingData = localStorageService.get('weeks', "localStorage");
            var data = {};
            angular.forEach(existingData, function(value, key) {
                $scope.showbutton = true;
                if (week === key) {
                    data[key] = res;
                } else {
                    data[key] = value;
                }
            });
            localStorageService.set('weeks', data, "localStorage");
            $scope.week_data = localStorageService.get('weeks', "localStorage");
        };


        $scope.$on('place_changed', function(e, place) {
            // do something with place
            localStorageService.set('weeks', $scope.weeksEmpty, "localStorage");
            $scope.showbutton = false;
            $scope.showLoader = true;
            $scope.weekdetails = false;
            $scope.weeksec = true;
            var geoLoc = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };

            $scope.places = [];

            var details = 0;

            function getDetails() {
                var place = $scope.place[details];

                if (!place) {
                    $scope.places = angular.copy($scope.place);
                    details = 0;
                    $scope.showLoader = false;
                }

                if (place) {
                    ngGPlacesAPI.placeDetails({ reference: place.reference })
                        .then(function(data) {
                            if (data.opening_hours) {
                                var arr = data.opening_hours.weekday_text;
                                var obj = {};
                                for (var i = 0; arr.length > i; i++) {
                                    var b = arr[i].split(": ");
                                    obj[b[0]] = b[1];
                                }
                                data.opening_hours.weekday_text = obj;
                            }

                            $scope.place[details] = data;
                            details++;
                            $timeout(function() {
                                getDetails();
                            }, 500);
                        });

                }
            }
            $scope.data = ngGPlacesAPI.nearbySearch(geoLoc).then(function(data) {
                $scope.place = data;
                getDetails();
            });
        });

        $scope.showweekdata = function() {
            $scope.weekdetails = true;
            $scope.weeksec = false;
            $scope.week_data = localStorageService.get('weeks', "localStorage");
        };



    }]);
