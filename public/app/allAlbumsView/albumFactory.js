"use strict";

app.factory("albumFactory",["$location","authFactory", function ($location, authFactory) {
	var userData = authFactory.getUserData();
	var usersAlbumsRef = new Firebase("https://atticapp.firebaseio.com/users/" + userData.uid + "/albums");
  
  	var allAlbums;	

  	return {
	    getAllAlbums() {
	    	usersAlbumsRef.once("value", function (snapshot) {
		    	allAlbums = snapshot.val();
		    	console.log(">>!!!>>>!!!>>>!!!>>>!!!", snapshot.val());
		    	return allAlbums;
	    	});
	    }

  	}; // end return object
}]); // end factory





