"use strict";

app.factory("albumFactory",["$location", function ($location) {
  
  var currentAlbumKey = "";

  return {
	    getCurrentAlbum() {
	    	return currentAlbumKey;
	    },
	    setCurrentAlbum(key) {
	    	currentAlbumKey = key;
	    }
  	}; // end return object
}]); // end factory





