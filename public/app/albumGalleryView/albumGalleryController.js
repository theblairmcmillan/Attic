"use strict";
app.controller("albumGalleryController", ["$scope", "$location", "$routeParams", "authFactory", "albumFactory", "Upload", "$firebaseArray", 
	function($scope, $location, $routeParams, authFactory, albumFactory, Upload, $firebaseArray) {

	var imagesRef = new Firebase("https://atticapp.firebaseio.com/images");
	var userData = {};
	var currentImageKey = '';
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

	var usernameRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/username");
	usernameRef.once('value', function(data) {
		userData.username = data.val();
	})




	// FancyBox //
	$(document).ready(function() {
		// $(".fancybox").fancybox();
		$(".fancybox")
	    .attr('rel', 'gallery')
	    .fancybox({
	        beforeShow: function () {
	        	this.title += '<img src="icons/trashIcon.jpg" id="trashImage" height="36px" width="36px">'
    	        $('body').click(function(event) {
    	        	if (event.target.id === 'trashImage') {
	            	    // DELETE PHOTOS IN THE MODAL AND FIREBASE //
						var deleteRef = new Firebase("https://atticapp.firebaseio.com/images/" + currentImageKey);
						deleteRef.remove();
						$.fancybox.close();
    	        	}
		        });
	        },
	        afterLoad: function() {
	        	this.title += '<a id="downloadLink" href="' + this.href + '" download="this.href.jpg"><img src="icons/floppy.jpg" heigh="60px" width="60px"></a>';
	        },
	        helpers : {
	            title : {
	                type: 'inside'
	            }
	        }
	    });
	});

	// getting current image key when clicked for deletion
	$scope.getCurrentImage = (key) => {
		console.log(key);
		currentImageKey = key;
	}



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
	    	var now = new Date();
			// Create an array with the current month, day and time
			var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
			// Create an array with the current hour, minute and second
			var time = [ now.getHours(), now.getMinutes() ];
			// Determine AM or PM suffix based on the hour
			var suffix = ( time[0] < 12 ) ? "AM" : "PM";
			// Convert hour from military time
			time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
			// If hour is 0, set it to 12
			time[0] = time[0] || 12;
			// If seconds and minutes are less than 10, add a zero
			for ( var i = 1; i < 3; i++ ) {
			    if ( time[i] < 10 ) {
			        time[i] = "0" + time[i];
			    }
			}
			// Return the formatted string
			var formattedDate = date.join("/") + " " + time.join(":") + " " + suffix;
	    	imagesRef.push({
	    		image: base64Urls[0],
	    		album: currentAlbumKey,
	    		uploaded_by: userData.uid,
	    		timestamp: formattedDate
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

	// // SETTING IMAGE LOCATION TO FIREBASE //
	// $scope.addImage = () => {
	// 	console.log("clicked to add image");
	// 	// SET IMAGE LOCATION IN FIREBASE //
	//     imagesRef.push({
	//     	image: $scope.image,
	//     	album: currentAlbumKey
	//     });
 //        $('div.fade').remove();
	// };


	// INVITING USER TO CURRENT ALBUM // 
	$scope.inviteUser = () => {
		console.log("clicked to invite user");
		membersRef.push($scope.invitedUser);
		$('div.fade').remove();
	};

	// TOGGLE DROPZONE //
	$scope.IsHidden = true;
    $scope.ShowHide = () => {
        $scope.IsHidden = $scope.IsHidden ? false : true;
    };


    // LEAVING A COMMENT //
    $scope.leaveComment = (comment) => {
    	console.log(comment);
    	console.log(event.target.id);
    	var commentsRef = new Firebase("https://atticapp.firebaseio.com/images/" + event.target.id + "/comments");
    	commentsRef.push({
    		comment: comment,
    		posted_by: userData.username
    	});
    };



}]);