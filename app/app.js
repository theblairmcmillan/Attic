"use strict";

let app = angular.module("atticApp", ["ngRoute"]);

app.config(function($routeProvider) {


    $routeProvider
        .when('/login', {
          templateUrl: "app/login/login.html",
          controller: "loginController"
        })
        .when('/all-albums',{
        	templateUrl: "app/allAlbumsView/allAlbumsView.html",
        	controller: "allAlbumsController"
        })
        .when('/album-gallery',{
        	templateUrl: "app/albumGalleryView/albumGalleryView.html",
        	controller: "albumGalleryController"
        })
    .otherwise({ redirectTo: '/login' });
});
