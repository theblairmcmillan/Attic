"use strict";
app.controller("albumGalleryController", ["$scope", "$location", "authFactory", function($scope, $location, authFactory) {
	console.log("albums GALLERY controller");

	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

	


}]);