require("dotenv").config();

var request = require("request");

request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    
  }
});


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);