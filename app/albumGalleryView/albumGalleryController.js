"use strict";
app.controller("albumGalleryController", ["$scope", "$location", "authFactory", "albumFactory", "Upload", function($scope, $location, authFactory, albumFactory, Upload) {
	console.log("albums gallery controller");

	var userData = authFactory.getUserData();
	console.log("userDataFromAlbumGalleryControl", userData);

	var imagesRef = new Firebase("https://atticapp.firebaseio.com/images");

	var currentAlbumKey = albumFactory.getCurrentAlbum();
	

	// UPLOADING IMAGE TO FIREBASE //
	 $scope.upload = function(file) {
	    Upload.base64DataUrl(file).then(function(base64Urls){
	    	console.log("Image upload function triggered");
	    	imagesRef.push({
	    		image: base64Urls,
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

	// CHECKING FOR IMAGES TO DISPLAY TO THE ALBUM PAGE // 
	imagesRef.once("value", function(snapshot) {
  		$scope.images = snapshot.val();
		console.log("IMAGES",$scope.images);
		console.log("CHECKING FOR IMAGES");
	});



}]);