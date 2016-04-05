"use strict";
app.controller("loginController", ["$scope", "$location","$http", "authFactory", function ($scope, $location, $http, authFactory) {
	    // Local variables
    let ref = new Firebase("https://atticapp.firebaseio.com/");

    // VARIABLES ON SCOPE FOR USE IN DOM //
    $scope.account = { email: "", password: "", username: "" };

    // REGISTER NEW ACCOUNT AND LOG USER IN //
    $scope.userSignUp = () => {
      console.log($scope.account.username);
      ref.createUser({
        email    : $scope.account.email,
        password : $scope.account.password
      }, (error, userData) => {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with uid: ${userData.uid}`);

          var usersRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid);

          usersRef.set({
          	 email    : $scope.account.email,
             username : $scope.account.username
          });

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
      }
    );


}]);

