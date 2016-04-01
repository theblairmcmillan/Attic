"use strict";

app.factory("authFactory",["$location", function ($location) {

  let ref = new Firebase("https://atticapp.firebaseio.com/");

  var userData = {};

  return {

    // DETERMINE IF CLIENT IS AUTHORIZED //
    isAuthenticated () {
      let authData = ref.getAuth();

      if (authData) {
        return true;
      } else {
        return false;
      }
    },
    // AUTH VIA FIREBASE //
    authenticate (credentials) {
      return new Promise((resolve, reject) => {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password,
        }, (error, authData) => {
          if (error) {
            reject(error);
          } else {
            console.log("Successfully completed authorization.");
            // set the authFactory setUserData() with email and unique key
            userData.email = authData.password.email;
            userData.uid = authData.uid;
            resolve(authData);
          }
        });
      });
    },
    userLogout () {
      ref.unauth();
      $location.path("/login");
      console.log("logout succesful");
    },
    setUserData(uid, email) {
      userData.email = email;
      userData.uid = uid;
    },
    getUserData() {
        return userData;
    }
  }; // end return object
}]); // end factory





