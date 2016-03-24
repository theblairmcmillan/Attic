"use strict";
app.controller("loginController", ["$scope", "$location","$http", "authFactory", function ($scope, $location, $http, authFactory) {
	    // Local variables
    let ref = new Firebase("https://atticapp.firebaseio.com/");
    var usersRef = new Firebase("https://atticapp.firebaseio.com/users/");

    // VARIABLES ON SCOPE FOR USE IN DOM //
    $scope.account = { email: "", password: "" };

    // REGISTER NEW ACCOUNT AND LOG USER IN //
    $scope.userSignUp = () => {
      ref.createUser({
        email    : $scope.account.email,
        password : $scope.account.password
      }, (error, userData) => {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with uid: ${userData.uid}`);
          usersRef.push({
          	 email    : $scope.account.email
          });
          // get the unique stored key for that user
          // set the authFactory setUserData() with email and unique key

          $scope.userLogin();
        }
      });
    };

    // AUTH USER WITH SUPPLIED EMAIL AND PASSWORD //
    $scope.userLogin = () =>
      authFactory
        .authenticate($scope.account)
        .then(() => {
        	$('div.fade').remove();
        	$location.path("/all-albums");
        	$scope.$apply();  // Needed for $location.path() to succeed
    });


}]);

