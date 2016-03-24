"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", function ($scope, $location, authFactory) {
console.log("all albums controller");

var albumsRef = new Firebase("https://atticapp.firebaseio.com/albums");
var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/albums");

	// LOGOUT BUTTON //
	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	// CREATE NEW ALBUM // 
	$scope.addAlbum = () => {
	    albumsRef.push({
	        album    : $scope.account.album,
	        createdBy : "",
	        },
	    usersAlbumsRef.push({
	        album    : $scope.account.album
	    }));
	    };
	// };
}]);




