"use strict";

app.controller("allAlbumsController", ["$scope", "$location", function($scope, $location) {

console.log("all albums controller");

	let ref = new Firebase("https://atticapp.firebaseio.com/");

	$scope.logout = () => {
		ref.unauth();
		$location.path("/login");
	    console.log("logout succesful");
	};

}]);