"use strict";function directiveFunction(a){return{require:"ngModel",scope:{ngModel:"=",details:"=?"},link:function(b,c,d,e){var f={types:[],componentRestrictions:{}};b.gPlace=new google.maps.places.Autocomplete(c[0],f),google.maps.event.addListener(b.gPlace,"place_changed",function(){b.$apply(function(){b.details=b.gPlace.getPlace(),e.$setViewValue(c.val()),a.$broadcast("place_changed",b.details)})})}}}angular.module("angularappApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngGPlaces","ui.bootstrap","LocalStorageModule"]).config(["ngGPlacesAPIProvider","localStorageServiceProvider",function(a,b){a.setDefaults({types:["restaurant"],radius:5e4,nearbySearchKeys:["name","reference","vicinity","opening_hours","place_id","rating","price_level","icon"],placeDetailsKeys:["formatted_address","formatted_phone_number","reference","website","opening_hours","geometry","rating","reviews","name","icon"]}),b.setPrefix("angularappApp").setStorageType("sessionStorage").setNotify(!0,!0)}]),angular.module("angularappApp").config(["$routeProvider",function(a){a.when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/display-plan",{templateUrl:"views/details.html",controller:"detailsCtrl",controllerAs:"details"}).otherwise({redirectTo:"/main"})}]),angular.module("angularappApp").controller("MainCtrl",["$scope","ngGPlacesAPI","$timeout","localStorageService",function(a,b,c,d){a.place=null,a.showLoader=!1,a.weekdetails=!1,a.weeksEmpty={Monday:{},Tuesday:{},Wednesday:{},Thursday:{},Friday:{},Saturday:{},Sunday:{}},function(){var b=d.get("weeks","localStorage"),c=!1;a.showbutton=!1,b&&angular.forEach(b,function(b,d){0!==Object.getOwnPropertyNames(b).length&&(c=!0,a.showbutton=!0)}),b||c||d.set("weeks",a.weeksEmpty,"localStorage")}(),a.onSetWeek=function(b,c){var e=d.get("weeks","localStorage"),f={};angular.forEach(e,function(d,e){a.showbutton=!0,b===e?f[e]=c:f[e]=d}),d.set("weeks",f,"localStorage"),a.week_data=d.get("weeks","localStorage")},a.$on("place_changed",function(e,f){function g(){var d=a.place[i];d||(a.places=angular.copy(a.place),i=0,a.showLoader=!1),d&&b.placeDetails({reference:d.reference}).then(function(b){if(b.opening_hours){for(var d=b.opening_hours.weekday_text,e={},f=0;d.length>f;f++){var h=d[f].split(": ");e[h[0]]=h[1]}b.opening_hours.weekday_text=e}a.place[i]=b,i++,c(function(){g()},500)})}d.set("weeks",a.weeksEmpty,"localStorage"),a.showbutton=!1,a.showLoader=!0,a.weekdetails=!1,a.weeksec=!0;var h={latitude:f.geometry.location.lat(),longitude:f.geometry.location.lng()};a.places=[];var i=0;a.data=b.nearbySearch(h).then(function(b){a.place=b,g()})}),a.showweekdata=function(){a.weekdetails=!0,a.weeksec=!1,a.week_data=d.get("weeks","localStorage")}}]),angular.module("angularappApp").controller("detailsCtrl",["localStorageService","$scope",function(a,b){!function(){b.week_data=a.get("weeks","localStorage")}()}]),angular.module("angularappApp").directive("googlePlace",directiveFunction),directiveFunction.$inject=["$rootScope"],angular.module("angularappApp").run(["$templateCache",function(a){a.put("views/details.html",'<div class="col-md-12"> <div> <div ng-repeat="(key, value) in week_data" style="border:solid 1px #efefef; margin-bottom: 10px"> <h1 style="margin: 0px; padding: 0px; background: #efefef; padding: 10px"> {{ key }} </h1> <div style="padding: 10px"> <h3 ng-if="value.name" style="margin: 0px; padding: 0px"> {{value.name}}</h3> <span ng-if="value.rating">Rating: {{value.rating}}</span> <span ng-if="value.formatted_address">{{value.formatted_address}}</span> <span ng-if="!value.name">No Restaurant selected for this day</span> </div> </div> </div> <!--<pre>{{details | json}}</pre>--> <br> <a href="#main"> Back to Search </a> </div>'),a.put("views/main.html",'<div class="load-overlay" ng-if="showLoader"> <img src="images/icon-load.4878e17c.gif" width="100"> </div> <div class="container"> <div class="row"> <div class="col-md-12"> <h1>Search Location</h1> <form class="form"> <input class="form-control" type="text" google-place ng-model="venue.address_line_1" aria-label="search"> </form> <br> <div class="row" ng-if="showbutton ==  true"> <div class="col-xs-12 col-md-6"> <button class="btn btn-success" ng-click="showweekdata()">Display Plan</button> </div> </div> <div ng-if="weekdetails" class="slideDown"> <div ng-repeat="(key, value) in week_data" class="day-box" style="border:solid 1px #efefef; margin-bottom: 10px"> <h1 style="font-size: 17px; margin: 0px; padding: 0px; background: #efefef; padding: 10px"> {{ key }} </h1> <div style="padding: 10px"> <h3 ng-if="value.name" style="font-size: 13px;margin: 0px; padding: 0px"> {{value.name}}</h3> <span ng-if="value.rating" style="margin-top: 8px;display: block;font-size: 12px">Rating: {{value.rating}}</span> <span ng-if="value.formatted_address" style="margin-top: -15px;display: block;font-size: 12px">{{value.formatted_address}}</span> <span ng-if="!value.name" style="display: block;font-size: 12px">No Restaurant selected for this day</span> </div> </div> </div> <br> {{selected_weeks}} <div id="products" class="row list-group"> <div class="item col-xs-6 col-lg-3" data-ng-repeat="item in places"> <div class="thumbnail" style="height: 372px"> <img class="group list-group-image" ng-src="{{item.icon}}" alt=""> <div class="caption"> <h4 class="group inner list-group-item-heading"> {{item.name}}</h4> <h5> Rating: {{item.rating}} </h5> <p ng-if="item.opening_hours"> <span ng-if="item.opening_hours.open_now" style="color: green"> Opened </span> <span ng-if="!item.opening_hours.open_now" style="color: red"> Closed </span> </p> <div ng-if="item.opening_hours"> <div ng-repeat="(key, value) in item.opening_hours.weekday_text"> <input type="checkbox" value="{{key}}" ng-model="selected_weeks" ng-click="onSetWeek(key, item);"> <span style="font-size: 10px">{{key}} - {{ value }} </span> </div> </div> </div> </div> </div> </div> </div> </div> </div>')}]);