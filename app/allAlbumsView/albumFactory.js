"use strict";

app.factory("albumFactory",["$location", function ($location) {
  
  var currentAlbumKey = "";

  return {
	    getCurrentAlbum() {
	    	return currentAlbumKey;
	    },
	    setCurrentAlbum(key) {
	    	currentAlbumKey = key;
	    },
	    getAllAlbums() {
	    	$http.get // write function to get all albums // 

	    }

  	}; // end return object
}]); // end factory





