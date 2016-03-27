"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory","albumFactory", function ($scope, $location, authFactory, albumFactory) {

	var userData = authFactory.getUserData();
	console.log("userDataFromAlbumControl", userData);

	var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/albums");
	var currentAlbumKey = null;

	albumsRef.on('child_added', function(snapshot) {
	   	console.log("snapshot:", snapshot);
	    currentAlbumKey = snapshot.key();
	    console.log("currentAlbumKey", currentAlbumKey);
	    albumFactory.setCurrentAlbum(currentAlbumKey);
	});

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
	    // albumFactory.setCurrentAlbum($scope.album);
        $('div.fade').remove();
    	$location.path("/album-gallery");

	};
	 
}]);




