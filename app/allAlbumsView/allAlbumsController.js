"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", "albumFactory", "$firebaseArray", 
	function ($scope, $location, authFactory, albumFactory, $firebaseArray) {

	var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
	// checking for existing user data (is user authenticated on firebase)
	var userData = {};
	var authData = albumsRef.getAuth();
	if (authData) {
		console.log("Authenticated user with uid:", authData.uid);
		userData.email = authData.password.email;
		userData.uid = authData.uid;
	} else {
		console.log("No authentication data exists.");
	}
	
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/albums");
	console.log("userDataFromAlbumControl", userData);
	var usernameRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/username");
	usernameRef.once('value', function(data) {
		userData.username = data.val();
	})
	
	var currentAlbumKey = null;
	$scope.currentUser = userData;
	$scope.albums = '';
	$scope.memberOf = [];

	// LOADING ALBUMS TO DOM ON PAGE LOAD WITH ANGULARFIRE // 
	var afRef = $firebaseArray(albumsRef);
	afRef.$loaded()
	.then(function(data) {
	    $scope.albums = data;
	    // loop through all albums
	    for (var i = 0; i < data.length; i++) {
	    	// if there are any added members
	    	if (data[i].members) {
	    		var albumMembers = data[i].members;
	    		// loop through those members to see if current user is a member
	    		for (var member in albumMembers) {
	    			// if current user is a member
	    			if (albumMembers[member] === $scope.currentUser.email) {
	    				// add email to scope for filter
		    			$scope.memberOf.push(data[i]);
	    			}
	    		}
	    	}
	    }
	})
	.catch(function(error) {
	    console.error("Error:", error);
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
	    albumsRef.limitToLast(1).once("child_added", function (snapshot) {
	    	var key = snapshot.key();
	    	console.log(key);
	        $('div.fade').remove();
	    	$location.path(`/album-gallery/${key}`);
	    });
	};


	// GO INSIDE SELECTED ALBUM //
	$scope.goToAlbum = (key) => {
		$location.path(`/album-gallery/${key}`);
	};
	 
}]);




