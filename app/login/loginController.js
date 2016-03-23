"use strict";
app.controller("loginController", ["$scope", "$location", function($scope, $location) {

	// click function on submit button
	$scope.getUserName = function(text) {
		console.log("userName", text);
		$location.url('/all-albums');
	};






}]);