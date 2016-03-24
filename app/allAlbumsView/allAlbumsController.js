"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", function ($scope, $location, authFactory) {

	var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/albums");

	// var userData = authFactory.getUserData();

	// LOGOUT BUTTON //
	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	// CREATE NEW ALBUM // 
	$scope.addAlbum = () => {
	    albumsRef.push({
	    	album: $scope.album,
	    }),
	    usersAlbumsRef.push({
	        album    : $scope.album
	       }),
	        $('div.fade').remove();
        	$location.path("/album-gallery");
	    };
}]);




