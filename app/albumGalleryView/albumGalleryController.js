"use strict";
app.controller("albumGalleryController", ["$scope", "$location", "$routeParams", "authFactory", "albumFactory", "Upload", "$firebaseArray", 
	function($scope, $location, $routeParams, authFactory, albumFactory, Upload, $firebaseArray) {

	var imagesRef = new Firebase("https://atticapp.firebaseio.com/images");
	var userData = {};
	var authData = imagesRef.getAuth();
	if (authData) {
		console.log("Authenticated user with uid:", authData.uid);
		userData.email = authData.password.email;
		userData.uid = authData.uid;
	} else {
		console.log("No authentication data exists.");
	}
	
	var currentAlbumKey = $routeParams.id;
	var membersRef = new Firebase("https://atticapp.firebaseio.com/albums/" + currentAlbumKey +"/members");
	var currentAlbumRef = new Firebase("https://atticapp.firebaseio.com/albums/" + currentAlbumKey);
	$scope.currentAlbum = currentAlbumKey;

	currentAlbumRef.once("value", function(data){
		console.log("dataaaaa", data.val());
		$scope.currentAlbumName = data.val().album;
	})


	// LOADING IMAGES TO DOM ON PAGE LOAD WITH ANGULARFIRE // 
	var afRef = $firebaseArray(imagesRef);
	afRef.$loaded()
	.then(function(data) {
	    console.log(data);
	    $scope.images = data;
	})
	.catch(function(error) {
	    console.error("Error:", error);
	});


	// UPLOADING IMAGE TO FIREBASE //
	 $scope.upload = function(files) {
	    Upload.base64DataUrl(files).then(function(base64Urls){
	    	// console.log("Image upload function triggered");
	    	imagesRef.push({
	    		image: base64Urls[0],
	    		album: currentAlbumKey,
	    		uploaded_by: userData.uid
	    	})
	    });
	  };

	// DROPING IMAGE TO FIREBASE //
	$scope.uploadFiles = function(files) {
		Upload.base64DataUrl(files).then(function(base64Urls){
			console.log("dropzone registering");
			imagesRef.push({
				image: base64Urls[0],
				album: currentAlbumKey,
				uploaded_by: userData.uid
			})
		});
	};

	
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


	// INVITING USER TO CURRENT ALBUM // 

	$scope.inviteUser = () => {
		console.log("clicked to invite user");
		membersRef.push($scope.invitedUser);
		$('div.fade').remove();
	};


}]);