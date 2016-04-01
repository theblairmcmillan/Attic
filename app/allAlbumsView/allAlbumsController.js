"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", "albumFactory", "$firebaseArray", function ($scope, $location, authFactory, albumFactory, $firebaseArray) {

	var userData = authFactory.getUserData();
	console.log("userDataFromAlbumControl", userData);

	var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/albums");
	var currentAlbumKey = null;

	$scope.albums = '';

	var afRef = $firebaseArray(albumsRef);
	afRef.$loaded()
	.then(function(data) {
	    console.log(data);
	    $scope.albums = data;
	})
	.catch(function(error) {
	    console.error("Error:", error);
	});




	albumsRef.on('child_added', function(snapshot) {
	   	// console.log("snapshot:", snapshot);
	    currentAlbumKey = snapshot.key();
	    // console.log("currentAlbumKey", currentAlbumKey);
	    albumFactory.setCurrentAlbum(currentAlbumKey);
	});

	// LOGOUT BUTTON //
	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	// CREATE NEW ALBUM // 
	$scope.addAlbum = () => {
		var key = "";
	    albumsRef.push({
	    	album: $scope.album,
	    	author: userData.uid
	    });
	    usersAlbumsRef.push({
	        album    : $scope.album
	    });
	    usersAlbumsRef.limitToLast(1).once("child_added", function (snapshot) {
	    	key = snapshot.key();
	    });
	    // albumFactory.setCurrentAlbum($scope.album);
        $('div.fade').remove();
    	$location.path(`/album-gallery/${key}`);
	};


	// GO INSIDE SELECTED ALBUM //
	$scope.goToAlbum = (key) => {
		$location.path(`/album-gallery/${key}`);
	};
	 
}]);




