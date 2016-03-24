"use strict";
app.controller("loginController", ["$scope", "$location","$http", "authFactory", function ($scope, $location, $http, authFactory) {
	    // Local variables
    let ref = new Firebase("https://atticapp.firebaseio.com/");
    var usersRef = new Firebase("https://atticapp.firebaseio.com/users/");

    // Variables on $scope for use in DOM
    $scope.account = { email: "", password: "" };

    /*
      Attempt to register a new user account.
      If successful, immediately log user in.
     */
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


          $scope.userLogin();
        }
      });
    };

    /*
      Attempt to authenticate the user with the
      supplied credentials.
     */
    $scope.userLogin = () =>
      authFactory
        .authenticate($scope.account)
        .then(() => {
        	$('div.fade').remove();
        	$location.path("/all-albums");
        	$scope.$apply();  // Needed for $location.path() to succeed
    });


}]);

