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
            resolve(authData);
          }
        });
      });
    },
    userLogout () {
      ref.unauth();
      $location.path("/login");
      console.log("logout succesful");
      }
    };

    // setUserData = function(){
      
    // }

   // setUserData: function(id, title, content) {
   //            user.email = email;
   //        },
   //        getUserData: function() {
   //            return note;
   //        }
   //    };
  }]);





