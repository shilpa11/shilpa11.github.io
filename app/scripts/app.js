'use strict';

/**
 * @ngdoc overview
 * @name angularappApp
 * @description
 * # angularappApp
 *
 * Main module of the application.
 */
angular
    .module('angularappApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngGPlaces',
        'ui.bootstrap',
        'LocalStorageModule'
    ]).config(function(ngGPlacesAPIProvider, localStorageServiceProvider) {
        ngGPlacesAPIProvider.setDefaults({
            types: ['restaurant'],
            radius: 50000,
            nearbySearchKeys: ['name', 'reference', 'vicinity', 'opening_hours', 'place_id', 'rating', 'price_level', 'icon'],
            placeDetailsKeys: ['formatted_address', 'formatted_phone_number',
                'reference', 'website', 'opening_hours', 'geometry', 'rating', 'reviews', 'name', 'icon'
            ]
        });
        localStorageServiceProvider.setPrefix('angularappApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true)
    });