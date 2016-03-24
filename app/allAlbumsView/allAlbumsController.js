"use strict";

app.controller("allAlbumsController", ["$scope", "$location", "authFactory", function ($scope, $location, authFactory) {
console.log("all albums controller");


	$scope.logout = () => {
		authFactory.userLogout()
	    console.log("logout succesful");
	};

}]);