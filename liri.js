require("dotenv").config();

const argArr = process.argv;
const operation = argArr[2];
let searchTitle = "";
for (let i = 3; i < argArr.length; i++) {
  searchTitle += argArr[i];
}

// access keys in keys.js.
var keysFile = require("./keys.js");

// access Twitter API.
var twitter = require("twitter");

// access Spotify API.
var spotify = require("spotify");

// access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

//Object of possible operations entered through command line
const operations = {
  "my-tweets"() {},
  "spotify-this-song"() {},
  "movie-this"() {
    var movieTitle = 'Mr. Nobody';
    if (searchTitle != '') {
      movieTitle = searchTitle;
    }
    request(
      "http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy",
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const movieInfo = JSON.parse(body);
          console.log("The movie's title is: " + movieInfo.Title);
          console.log("The movie's release year is: " + movieInfo.Year);
          console.log("The movie's IMDB rating is: " + movieInfo.imdbRating);
          console.log(
            "The movie's Rotten Tomatoe's rating is: " +
              movieInfo.RottenTomatoes
          );
          console.log("The movie was produced in: " + movieInfo.Country);
          console.log("The movie's language is: " + movieInfo.Language);
          console.log("The movie's plot summary is: " + movieInfo.Plot);
          console.log("The movie's actors are: " + movieInfo.Actors);
        }
      }
    );
  },
  "do-what-it-says"() {}
};


operations[operation]();