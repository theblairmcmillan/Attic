"use strict";
app.controller("albumGalleryController", ["$scope", "$location", "authFactory", "albumFactory", function($scope, $location, authFactory, albumFactory) {
	console.log("albums gallery controller");

	var userData = authFactory.getUserData();
	console.log("userDataFromAlbumGalleryControl", userData);

	var imagesRef = new Firebase("https://atticapp.firebaseio.com/images");

	var currentAlbumKey = albumFactory.getCurrentAlbum();
	
	//LOGOUT FUNCTION //
	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	// ATTIC LOGO TO RETURN USER TO ALBUMS VIEW //
	$scope.albumView = () => {
	    console.log("hit logo to return to album view");
	    $location.path("/all-albums");
	    authFactory.getUserData();
	};

	// SETTING IMAGE LOCATION TO FIREBASE //
	$scope.addImage = () => {
		console.log("clicked to add image");
		// SET IMAGE LOCATION IN FIREBASE //
	    imagesRef.push({
	    	image: $scope.image,
	    	album: currentAlbumKey
	    });
        $('div.fade').remove();
	};
}]);