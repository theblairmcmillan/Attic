"use strict";
app.controller("loginController", ["$scope", "$location", function($scope, $location) {

	// // click function on submit button
	// $scope.getUserName = function(text) {
	// 	console.log("userName", text);
	// 	$location.url('/all-albums');
	// };

	var ref = new Firebase("https://atticapp.firebaseio.com/");
	ref = $firebaseAuth(ref);


// SIGN UP NEW USER //
	$scope.userSignUp = function() {
		console.log("user clicked Sign up Button");
		var userObj = {
				email: $scope.userEmail,
				password: $scope.userPassword
				
		};
		console.log("New User Object",userObj);
	}












}]);