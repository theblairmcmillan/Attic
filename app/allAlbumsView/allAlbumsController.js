"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", function ($scope, $location, authFactory) {

	var userData = authFactory.getUserData();
	console.log("userDataFromAlbumControl", userData);

	var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/albums");


	// LOGOUT BUTTON //
	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	// CREATE NEW ALBUM // 
	$scope.addAlbum = () => {
	    albumsRef.push({
	    	album: $scope.album,
	    	author: userData.uid
	    });
	    usersAlbumsRef.push({
	        album    : $scope.album
	    });
        $('div.fade').remove();
    	$location.path("/album-gallery");
	};
}]);




